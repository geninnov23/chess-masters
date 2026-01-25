import { useState, useEffect, useRef, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Breadcrumbs from './Breadcrumbs';

export default function PlayableBoard({ game }) {
  const chessGameRef = useRef(new Chess());
  const masterGameRef = useRef(new Chess());
  const [position, setPosition] = useState(chessGameRef.current.fen());
  const [moveFrom, setMoveFrom] = useState('');
  const [optionSquares, setOptionSquares] = useState({});
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [masterMoves, setMasterMoves] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [showThreats, setShowThreats] = useState(false);
  const [thinkAheadMode, setThinkAheadMode] = useState(false);
  const [customArrows, setCustomArrows] = useState([]);
  const [boardKey, setBoardKey] = useState(0);

  // Gamification state
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [movesCompleted, setMovesCompleted] = useState(0);
  const [patternDetected, setPatternDetected] = useState(null);
  const [autoHintThreshold, setAutoHintThreshold] = useState(3); // Show hint after 3 wrong attempts
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Parse the PGN to extract all moves
    if (game?.pgn) {
      masterGameRef.current.loadPgn(game.pgn);
      const history = masterGameRef.current.history({ verbose: true });
      setMasterMoves(history);

      // Reset the game
      chessGameRef.current.reset();
      masterGameRef.current.reset();
      setPosition(chessGameRef.current.fen());
      setCurrentMoveIndex(0);
      setGameComplete(false);
      setFeedback('');
      setIsCorrect(null);
      setCustomArrows([]);
      setBoardKey(prev => prev + 1);
    }
  }, [game]);

  // Force board remount when arrow modes change to fix rendering issues
  useEffect(() => {
    setBoardKey(prev => prev + 1);
  }, [showThreats, thinkAheadMode]);

  // Clear threat arrows when position changes (but keep custom arrows in think ahead mode)
  useEffect(() => {
    if (!thinkAheadMode) {
      setCustomArrows([]);
    }
  }, [position, thinkAheadMode]);

  const getNextMasterMove = () => {
    return masterMoves[currentMoveIndex];
  };

  const detectTacticalPattern = (move, afterMoveGame) => {
    if (!move) return null;

    // Use the provided game state after the move was made
    const gameAfterMove = afterMoveGame || chessGameRef.current;

    // Check for various patterns
    const patterns = [];

    // 1. Check (most obvious)
    if (gameAfterMove.inCheck()) {
      patterns.push({ type: 'check', points: 50, description: 'Check!' });
    }

    // 2. Checkmate
    if (gameAfterMove.isCheckmate()) {
      patterns.push({ type: 'checkmate', points: 500, description: 'Checkmate!' });
    }

    // 3. Capture
    if (move.captured) {
      const pieceValues = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 0 };
      const points = pieceValues[move.captured] || 10;
      patterns.push({ type: 'capture', points, description: `Captured ${move.captured.toUpperCase()}` });
    }

    // 4. Fork detection (piece attacks multiple valuable pieces)
    const attackedSquares = [];
    const moves = gameAfterMove.moves({ verbose: true });
    const attackingPieceMoves = moves.filter(m => m.from === move.to);

    const valuableTargets = attackingPieceMoves.filter(m => {
      const piece = gameAfterMove.get(m.to);
      return piece && ['q', 'r', 'n', 'b'].includes(piece.type);
    });

    if (valuableTargets.length >= 2) {
      patterns.push({ type: 'fork', points: 100, description: `Fork! Attacking ${valuableTargets.length} pieces` });
    }

    // 5. Discovered attack (moving reveals an attack from another piece)
    // This is complex, but we can detect if moving created new attacks

    // 6. Castling
    if (move.flags && move.flags.includes('k')) {
      patterns.push({ type: 'castle_kingside', points: 20, description: 'Castled Kingside' });
    } else if (move.flags && move.flags.includes('q')) {
      patterns.push({ type: 'castle_queenside', points: 20, description: 'Castled Queenside' });
    }

    // 7. Promotion
    if (move.promotion) {
      patterns.push({ type: 'promotion', points: 80, description: `Promoted to ${move.promotion.toUpperCase()}` });
    }

    return patterns.length > 0 ? patterns : null;
  };

  const calculateScore = (patterns, isFirstAttempt) => {
    let points = 0;

    // Base points for correct move
    points += isFirstAttempt ? 100 : 50;

    // Bonus for streak
    points += streak * 10;

    // Pattern bonuses
    if (patterns) {
      patterns.forEach(pattern => {
        points += pattern.points;
      });
    }

    return points;
  };

  const calculateThreats = () => {
    if (!showThreats) return [];

    const threats = [];
    const moves = chessGameRef.current.moves({ verbose: true });

    console.log('Calculating threats, total moves:', moves.length);

    moves.forEach(move => {
      // Check if move gives check
      const tempGame = new Chess(chessGameRef.current.fen());
      tempGame.move({ from: move.from, to: move.to, promotion: move.promotion });

      if (tempGame.inCheck()) {
        // Check arrows in red
        console.log('Found check:', move.san, move.from, '->', move.to);
        threats.push({
          startSquare: move.from,
          endSquare: move.to,
          color: 'rgba(255, 0, 0, 0.8)' // Red for checks
        });
      } else if (move.captured) {
        // Capture arrows in orange
        console.log('Found capture:', move.san, move.from, '->', move.to);
        threats.push({
          startSquare: move.from,
          endSquare: move.to,
          color: 'rgba(255, 140, 0, 0.8)' // Orange for captures
        });
      }
    });

    console.log('Total threats found:', threats.length, threats);
    return threats;
  };

  const makeComputerMove = () => {
    const nextMove = getNextMasterMove();
    if (!nextMove) {
      console.log('No more moves');
      return;
    }

    // Make the computer's move (opponent's move)
    setTimeout(() => {
      try {
        const moveOptions = {
          from: nextMove.from,
          to: nextMove.to
        };
        if (nextMove.promotion) {
          moveOptions.promotion = nextMove.promotion;
        }

        console.log('Computer making move:', moveOptions);
        chessGameRef.current.move(moveOptions);
        setPosition(chessGameRef.current.fen());
        setCurrentMoveIndex(prev => prev + 1);
        setFeedback(`${nextMove.color === 'w' ? 'White' : 'Black'} played: ${nextMove.san}`);

        // Check if game is complete
        if (currentMoveIndex + 1 >= masterMoves.length) {
          setGameComplete(true);
          setFeedback('Congratulations! You completed the game!');
        }
      } catch (error) {
        console.error('Computer move error:', error);
        console.log('Current FEN:', chessGameRef.current.fen());
        console.log('Attempted move:', nextMove);
      }
    }, 500);
  };

  const getMoveOptions = (square) => {
    const moves = chessGameRef.current.moves({
      square,
      verbose: true
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.forEach(move => {
      newSquares[move.to] = {
        background:
          chessGameRef.current.get(move.to) &&
          chessGameRef.current.get(move.to).color !== chessGameRef.current.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
    });

    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };

    setOptionSquares(newSquares);
    return true;
  };

  const checkIfCorrectMove = (from, to, promotion) => {
    const nextMove = getNextMasterMove();
    if (!nextMove) return false;

    // Check from and to squares match
    const squaresMatch = nextMove.from === from && nextMove.to === to;

    // Only check promotion if either move involves promotion
    const promotionMatch = !nextMove.promotion && !promotion
      ? true  // Neither move has promotion
      : nextMove.promotion === promotion;  // Both must match

    return squaresMatch && promotionMatch;
  };

  const onSquareClick = ({ square }) => {
    if (gameComplete) return;

    const piece = chessGameRef.current.get(square);

    // First click - selecting a piece
    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) {
        setMoveFrom(square);
      }
      return;
    }

    // Second click - trying to move
    if (moveFrom) {
      const moves = chessGameRef.current.moves({
        square: moveFrom,
        verbose: true
      });
      const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

      if (!foundMove) {
        // Check if clicking a new piece
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : '');
        return;
      }

      // Check if this is the correct move
      const isCorrectMove = checkIfCorrectMove(moveFrom, square, foundMove.promotion);

      if (isCorrectMove) {
        // Correct move!
        try {
          const moveOptions = {
            from: moveFrom,
            to: square
          };
          if (foundMove.promotion) {
            moveOptions.promotion = foundMove.promotion;
          }

          // Make the move FIRST
          chessGameRef.current.move(moveOptions);

          // THEN detect tactical patterns
          const patterns = detectTacticalPattern(foundMove, chessGameRef.current);
          const isFirstAttempt = wrongAttempts === 0;
          const earnedPoints = calculateScore(patterns, isFirstAttempt);

          // Update gamification stats
          setScore(prev => prev + earnedPoints);
          setStreak(prev => prev + 1);
          setMovesCompleted(prev => prev + 1);
          setWrongAttempts(0);

          // Show pattern feedback
          let feedbackMsg = `✓ Correct! ${foundMove.san} (+${earnedPoints} points)`;
          if (patterns && patterns.length > 0) {
            const patternNames = patterns.map(p => p.description).join(', ');
            feedbackMsg += ` - ${patternNames}`;
            setPatternDetected(patterns);
          }

          setPosition(chessGameRef.current.fen());
          setCurrentMoveIndex(prev => prev + 1);
          setFeedback(feedbackMsg);
          setIsCorrect(true);

          // Clear highlights
          setMoveFrom('');
          setOptionSquares({});

          // Make opponent's move
          setTimeout(() => {
            setIsCorrect(null);
            setPatternDetected(null);
            makeComputerMove();
          }, 2000);
        } catch (error) {
          console.error('Move error:', error);
        }
      } else {
        // Wrong move
        const newWrongAttempts = wrongAttempts + 1;
        setWrongAttempts(newWrongAttempts);
        setStreak(0);

        // Auto-show hint after threshold
        if (newWrongAttempts >= autoHintThreshold) {
          const nextMove = getNextMasterMove();
          setFeedback(`✗ Try ${nextMove.san} (${nextMove.from} to ${nextMove.to})`);
          setOptionSquares({
            [nextMove.from]: { background: 'rgba(255, 215, 0, 0.7)' },
            [nextMove.to]: { background: 'rgba(76, 175, 80, 0.7)' }
          });
        } else {
          setFeedback(`✗ Wrong move! Try again. (${newWrongAttempts}/${autoHintThreshold})`);
        }

        setIsCorrect(false);
        setMoveFrom('');

        setTimeout(() => {
          if (newWrongAttempts < autoHintThreshold) {
            setIsCorrect(null);
            setFeedback('');
            setOptionSquares({});
          }
        }, 2000);
      }
    }
  };

  const onPieceDrag = ({ square }) => {
    if (gameComplete) return;
    // Set dragging state and show legal moves
    setIsDragging(true);
    setHoveredSquare(null);
    setMoveFrom(square);
    getMoveOptions(square);
  };

  const onPieceDrop = ({ sourceSquare, targetSquare }) => {
    console.log('=== DROP ATTEMPT ===');
    console.log('Source:', sourceSquare, 'Target:', targetSquare);

    // Clear dragging state
    setIsDragging(false);

    if (gameComplete || !targetSquare) {
      console.log('REJECTED: Game complete or no target');
      setOptionSquares({});
      setMoveFrom('');
      return false;
    }

    // Get all legal moves for this piece
    const moves = chessGameRef.current.moves({
      square: sourceSquare,
      verbose: true
    });

    console.log('Legal moves:', moves.map(m => `${m.from}->${m.to} (${m.san})`));
    const foundMove = moves.find(m => m.from === sourceSquare && m.to === targetSquare);
    console.log('Found move:', foundMove);

    if (!foundMove) {
      console.log('REJECTED: Not a legal chess move');
      setOptionSquares({});
      setMoveFrom('');
      return false;
    }

    // Check if this matches the master move
    const nextMasterMove = getNextMasterMove();
    console.log('Next master move:', nextMasterMove);
    console.log('Current move index:', currentMoveIndex);

    const isCorrectMove = checkIfCorrectMove(sourceSquare, targetSquare, foundMove.promotion);
    console.log('Is correct move?', isCorrectMove);

    if (isCorrectMove) {
      console.log('✓ CORRECT MOVE! Making move...');
      try {
        const moveOptions = {
          from: sourceSquare,
          to: targetSquare
        };
        if (foundMove.promotion) {
          moveOptions.promotion = foundMove.promotion;
        }

        // Make the move FIRST
        chessGameRef.current.move(moveOptions);

        // THEN detect tactical patterns using the updated game state
        const patterns = detectTacticalPattern(foundMove, chessGameRef.current);
        const isFirstAttempt = wrongAttempts === 0;
        const earnedPoints = calculateScore(patterns, isFirstAttempt);

        // Update gamification stats
        setScore(prev => prev + earnedPoints);
        setStreak(prev => prev + 1);
        setMovesCompleted(prev => prev + 1);
        setWrongAttempts(0); // Reset wrong attempts

        // Show pattern feedback
        let feedbackMsg = `✓ Correct! ${foundMove.san} (+${earnedPoints} points)`;
        if (patterns && patterns.length > 0) {
          const patternNames = patterns.map(p => p.description).join(', ');
          feedbackMsg += ` - ${patternNames}`;
          setPatternDetected(patterns);
        }

        setPosition(chessGameRef.current.fen());
        setCurrentMoveIndex(prev => prev + 1);
        setFeedback(feedbackMsg);
        setIsCorrect(true);

        setMoveFrom('');
        setOptionSquares({});

        console.log('Move successful! New position:', chessGameRef.current.fen());

        setTimeout(() => {
          setIsCorrect(null);
          setPatternDetected(null);
          makeComputerMove();
        }, 2000);

        return true;
      } catch (error) {
        console.error('ERROR making move:', error);
        setOptionSquares({});
        setMoveFrom('');
        return false;
      }
    } else {
      console.log('✗ WRONG MOVE!');

      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      setStreak(0); // Break streak on wrong move

      // Auto-show hint after threshold
      if (newWrongAttempts >= autoHintThreshold) {
        const nextMove = getNextMasterMove();
        setFeedback(`✗ Try ${nextMove.san} (${nextMove.from} to ${nextMove.to})`);
        setOptionSquares({
          [nextMove.from]: { background: 'rgba(255, 215, 0, 0.7)' },
          [nextMove.to]: { background: 'rgba(76, 175, 80, 0.7)' }
        });
      } else {
        setFeedback(`✗ Wrong move! Try again. (${newWrongAttempts}/${autoHintThreshold})`);
      }

      setIsCorrect(false);
      setMoveFrom('');

      setTimeout(() => {
        if (newWrongAttempts < autoHintThreshold) {
          setIsCorrect(null);
          setFeedback('');
          setOptionSquares({});
        }
      }, 2000);

      return false;
    }
  };

  const resetGame = () => {
    chessGameRef.current.reset();
    masterGameRef.current.reset();
    setPosition(chessGameRef.current.fen());
    setCurrentMoveIndex(0);
    setMoveFrom('');
    setOptionSquares({});
    setFeedback('');
    setIsCorrect(null);
    setGameComplete(false);
    setCustomArrows([]);
    setRightClickedSquares({});

    // Reset gamification stats
    setScore(0);
    setStreak(0);
    setWrongAttempts(0);
    setMovesCompleted(0);
    setPatternDetected(null);
  };

  const goToNextMove = () => {
    if (currentMoveIndex < masterMoves.length) {
      const nextMove = masterMoves[currentMoveIndex];
      try {
        chessGameRef.current.move({
          from: nextMove.from,
          to: nextMove.to,
          promotion: nextMove.promotion
        });
        setPosition(chessGameRef.current.fen());
        setCurrentMoveIndex(prev => prev + 1);
        setFeedback(`${nextMove.color === 'w' ? 'White' : 'Black'} played: ${nextMove.san}`);
        setIsCorrect(null);
      } catch (error) {
        console.error('Next move error:', error);
      }
    }
  };

  const goToPreviousMove = () => {
    if (currentMoveIndex > 0) {
      // Rebuild the game from the start up to currentMoveIndex - 1
      chessGameRef.current.reset();
      for (let i = 0; i < currentMoveIndex - 1; i++) {
        const move = masterMoves[i];
        chessGameRef.current.move({
          from: move.from,
          to: move.to,
          promotion: move.promotion
        });
      }
      setPosition(chessGameRef.current.fen());
      setCurrentMoveIndex(prev => prev - 1);
      setFeedback('');
      setIsCorrect(null);
    }
  };

  const showHint = () => {
    const nextMove = getNextMasterMove();
    if (nextMove) {
      setFeedback(`Hint: The master played ${nextMove.san} (from ${nextMove.from} to ${nextMove.to})`);

      // Highlight the hint squares with pulsing effect
      setOptionSquares({
        [nextMove.from]: {
          background: 'rgba(255, 215, 0, 0.7)',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)'
        },
        [nextMove.to]: {
          background: 'rgba(76, 175, 80, 0.7)',
          boxShadow: '0 0 20px rgba(76, 175, 80, 0.8), inset 0 0 20px rgba(76, 175, 80, 0.3)'
        }
      });

      setTimeout(() => {
        setOptionSquares({});
        setFeedback('');
      }, 3000);
    }
  };

  const onMouseOverSquare = ({ square }) => {
    // Disable hover completely while dragging or selecting
    if (!moveFrom && !isDragging) {
      setHoveredSquare(square);
    }
  };

  const onMouseOutSquare = ({ square }) => {
    if (!isDragging) {
      setHoveredSquare(null);
    }
  };

  const onSquareRightClick = ({ square }) => {
    const newRightClickedSquares = { ...rightClickedSquares };
    if (square in newRightClickedSquares) {
      delete newRightClickedSquares[square];
    } else {
      newRightClickedSquares[square] = {
        background: 'rgba(255, 0, 0, 0.4)'
      };
    }
    setRightClickedSquares(newRightClickedSquares);
  };

  const chessboardOptions = useMemo(() => {
    // Build square styles - only show legal moves and right-clicked squares
    const styles = {
      ...rightClickedSquares,
      ...optionSquares,
    };

    // Only add hover effect if not dragging, not selecting, and no legal moves showing
    if (hoveredSquare && !moveFrom && !isDragging && Object.keys(optionSquares).length === 0) {
      styles[hoveredSquare] = {
        background: 'rgba(255, 255, 255, 0.1)'
      };
    }

    // Combine all arrows: threats + custom arrows
    const threatArrows = calculateThreats();

    // Validate arrows - ensure all required fields are present
    const validatedArrows = [
      ...threatArrows,
      ...customArrows
    ].filter(arrow => {
      const isValid = arrow &&
        typeof arrow.startSquare === 'string' &&
        typeof arrow.endSquare === 'string' &&
        arrow.startSquare.length === 2 &&
        arrow.endSquare.length === 2 &&
        typeof arrow.color === 'string';

      if (!isValid) {
        console.warn('Invalid arrow:', arrow);
      }
      return isValid;
    });

    const allArrows = validatedArrows;

    if (allArrows.length > 0) {
      console.log('All arrows:', allArrows.length, '(Threats:', threatArrows.length, 'Custom:', customArrows.length, ')');
      console.log('Arrow samples:', allArrows.slice(0, 2));
    }

    return {
      id: 'main-chessboard',
      position: position,
      onSquareClick: onSquareClick,
      onPieceDrag: onPieceDrag,
      onPieceDrop: onPieceDrop,
      // Disabled mouse hover to prevent white squares while dragging
      // onMouseOverSquare: onMouseOverSquare,
      // onMouseOutSquare: onMouseOutSquare,
      onSquareRightClick: onSquareRightClick,
      squareStyles: styles,
      animationDurationInMs: 300,
      allowDragging: !gameComplete,
      allowDrawingArrows: thinkAheadMode, // Enable arrow drawing in think ahead mode
      arrows: allArrows.length > 0 ? allArrows : undefined, // Only pass arrows if we have any
      onArrowsChange: thinkAheadMode ? ({ arrows }) => {
        console.log('Arrows changed by user:', arrows);
        setCustomArrows(arrows);
      } : undefined,
      clearArrowsOnClick: false, // Don't clear arrows on click
      clearArrowsOnPositionChange: false, // Never auto-clear, we manage manually
      arrowOptions: {
        color: '#4169E1', // Royal blue for thinking ahead
        secondaryColor: '#32CD32', // Lime green for shift+drag
        tertiaryColor: '#FFD700', // Gold for ctrl+drag
        opacity: 0.8,
        activeOpacity: 0.9,
      },
      draggingPieceStyle: {
        transform: 'scale(1.3)',
        filter: 'drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.4))',
        cursor: 'grabbing',
        zIndex: 100
      },
      draggingPieceGhostStyle: {
        opacity: 0.4,
        filter: 'grayscale(0.5)'
      },
      // Disabled to prevent white squares while dragging
      // dropSquareStyle: {
      //   background: 'rgba(255, 215, 0, 0.3)'
      // },
      darkSquareStyle: {
        backgroundColor: '#B58863'
      },
      lightSquareStyle: {
        backgroundColor: '#F0D9B5'
      },
      showNotation: true,
      boardOrientation: 'white',
      showAnimations: true,
      dragActivationDistance: 3
    };
  }, [position, optionSquares, rightClickedSquares, hoveredSquare, moveFrom, gameComplete, isDragging, showThreats, thinkAheadMode, customArrows]);

  if (!game) {
    return <div className="text-center py-12">Loading game...</div>;
  }

  return (
    <div className="playable-board-container">
      <Breadcrumbs
        items={[
          { label: 'Games', path: '/' },
          { label: `${game.white} vs ${game.black}`, path: `/game/${game.id}`, book: true }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Chess Board */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Compact Header with Help */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-600">
                Move {Math.floor(currentMoveIndex / 2) + 1} of {Math.ceil(masterMoves.length / 2)}
              </div>

              {/* Help Button */}
              <div className="relative">
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  onMouseEnter={() => setShowHelp(true)}
                  onMouseLeave={() => setShowHelp(false)}
                  className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                  title="How to Play"
                >
                  ?
                </button>

                {/* Help Tooltip */}
                {showHelp && (
                  <div className="absolute right-0 top-10 w-72 bg-white border-2 border-blue-200 rounded-lg shadow-xl p-4 z-50">
                    <h3 className="font-bold text-blue-900 mb-2">How to Play</h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• <strong>Drag & Drop</strong> or <strong>click-to-move</strong> pieces</li>
                      <li>• Replicate the master's moves to earn points</li>
                      <li>• Build streaks for bonus points 🔥</li>
                      <li>• After 3 wrong moves, auto-hint appears</li>
                      <li>• <strong>Think Ahead</strong>: Draw arrows (right-click drag)</li>
                      <li>• <strong>Show Threats</strong>: See checks/captures</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Chessboard
              key={`board-${boardKey}`}
              id="main-chessboard"
              options={chessboardOptions}
            />

            {/* Feedback */}
            {feedback && (
              <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                isCorrect === true
                  ? 'bg-green-100 text-green-800'
                  : isCorrect === false
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {feedback}
              </div>
            )}
          </div>
        </div>

        {/* Game Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Gamification Panel */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                🎮 Progress
              </h3>
              <div className="text-right">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-xs opacity-75">points</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/20 rounded p-2 text-center backdrop-blur">
                <div className="text-lg font-bold">🔥{streak}</div>
                <div className="text-xs opacity-90">Streak</div>
              </div>
              <div className="bg-white/20 rounded p-2 text-center backdrop-blur">
                <div className="text-lg font-bold">{movesCompleted}</div>
                <div className="text-xs opacity-90">Moves</div>
              </div>
              <div className="bg-white/20 rounded p-2 text-center backdrop-blur">
                <div className="text-lg font-bold">
                  {movesCompleted > 0 ? Math.round((movesCompleted / (movesCompleted + (streak === 0 && wrongAttempts > 0 ? 1 : 0))) * 100) : 100}%
                </div>
                <div className="text-xs opacity-90">Accuracy</div>
              </div>
            </div>

            {/* Pattern Achievement */}
            {patternDetected && patternDetected.length > 0 && (
              <div className="bg-yellow-400 text-yellow-900 rounded-lg p-2 animate-pulse mb-2">
                <div className="font-bold text-xs mb-1">🎯 Tactical!</div>
                {patternDetected.map((pattern, idx) => (
                  <div key={idx} className="text-xs">
                    +{pattern.points} {pattern.description}
                  </div>
                ))}
              </div>
            )}

            {/* Auto-hint indicator */}
            {wrongAttempts > 0 && wrongAttempts < autoHintThreshold && (
              <div className="bg-orange-400 text-orange-900 rounded p-1.5 text-xs">
                {autoHintThreshold - wrongAttempts} more {autoHintThreshold - wrongAttempts === 1 ? 'try' : 'tries'} → auto-hint
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
            <h3 className="font-bold text-gray-800 mb-3">Controls</h3>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={goToPreviousMove}
                disabled={currentMoveIndex === 0}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                title="Previous Move"
              >
                ← Prev
              </button>
              <button
                onClick={goToNextMove}
                disabled={currentMoveIndex >= masterMoves.length}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                title="Next Move"
              >
                Next →
              </button>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={resetGame}
                className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                title="Reset Game"
              >
                🔄 Reset
              </button>
              <button
                onClick={showHint}
                disabled={gameComplete}
                className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 text-sm font-medium"
                title="Show Hint"
              >
                💡 Hint
              </button>
            </div>

            {/* Analysis Tools */}
            <div className="space-y-2">
              <button
                onClick={() => setThinkAheadMode(!thinkAheadMode)}
                className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                  thinkAheadMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="Right-click drag to draw arrows"
              >
                {thinkAheadMode ? '✓' : ''} 🎯 Think Ahead Mode
              </button>
              <button
                onClick={() => setShowThreats(!showThreats)}
                className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                  showThreats
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="Show checks (red) and captures (orange)"
              >
                {showThreats ? '✓' : ''} ⚠️ Show Threats
              </button>
              {thinkAheadMode && customArrows.length > 0 && (
                <button
                  onClick={() => setCustomArrows([])}
                  className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                  title="Clear all drawn arrows"
                >
                  Clear Arrows ({customArrows.length})
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{game.white} vs {game.black}</h2>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Event:</span>
                <p className="text-gray-600">{game.event}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Date:</span>
                <p className="text-gray-600">{game.date}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Opening:</span>
                <p className="text-gray-600">{game.opening} ({game.eco})</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Result:</span>
                <p className="text-gray-600">{game.result}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Difficulty:</span>
                <span className={`inline-block ml-2 px-2 py-1 rounded text-xs ${
                  game.difficulty === 'beginner'
                    ? 'bg-green-100 text-green-800'
                    : game.difficulty === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {game.difficulty}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2">About This Game</h3>
              <p className="text-sm text-gray-600">{game.description}</p>
            </div>

            {game.tags && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
