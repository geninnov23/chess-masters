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
    }
  }, [game]);

  const getNextMasterMove = () => {
    return masterMoves[currentMoveIndex];
  };

  const makeComputerMove = () => {
    const nextMove = getNextMasterMove();
    if (!nextMove) return;

    // Make the computer's move (opponent's move)
    setTimeout(() => {
      try {
        chessGameRef.current.move({
          from: nextMove.from,
          to: nextMove.to,
          promotion: nextMove.promotion
        });
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

    return (
      nextMove.from === from &&
      nextMove.to === to &&
      (promotion ? nextMove.promotion === promotion : true)
    );
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
      const isCorrectMove = checkIfCorrectMove(moveFrom, square, foundMove.promotion || 'q');

      if (isCorrectMove) {
        // Correct move!
        try {
          chessGameRef.current.move({
            from: moveFrom,
            to: square,
            promotion: foundMove.promotion || 'q'
          });
          setPosition(chessGameRef.current.fen());
          setCurrentMoveIndex(prev => prev + 1);
          setFeedback(`✓ Correct! ${foundMove.san}`);
          setIsCorrect(true);

          // Clear highlights
          setMoveFrom('');
          setOptionSquares({});

          // Make opponent's move
          setTimeout(() => {
            setIsCorrect(null);
            makeComputerMove();
          }, 1000);
        } catch (error) {
          console.error('Move error:', error);
        }
      } else {
        // Wrong move
        setFeedback('✗ Not the master move. Try again!');
        setIsCorrect(false);
        setMoveFrom('');
        setOptionSquares({});

        setTimeout(() => {
          setIsCorrect(null);
          setFeedback('');
        }, 2000);
      }
    }
  };

  const onPieceDrag = ({ square }) => {
    if (gameComplete) return;
    console.log('Drag started:', square);
    // Set dragging state and show legal moves
    setIsDragging(true);
    setHoveredSquare(null);
    setMoveFrom(square);
    getMoveOptions(square);
  };

  const onPieceDrop = ({ sourceSquare, targetSquare }) => {
    console.log('=== DROP ATTEMPT ===');
    console.log('Source:', sourceSquare, 'Target:', targetSquare);
    console.log('Game complete:', gameComplete);

    // Clear dragging state
    setIsDragging(false);

    if (gameComplete || !targetSquare) {
      console.log('Rejected: game complete or no target');
      setOptionSquares({});
      setMoveFrom('');
      return false;
    }

    // Get all legal moves for this piece
    const moves = chessGameRef.current.moves({
      square: sourceSquare,
      verbose: true
    });

    console.log('Legal moves for', sourceSquare, ':', moves.map(m => m.to));
    const foundMove = moves.find(m => m.from === sourceSquare && m.to === targetSquare);
    console.log('Found move:', foundMove);

    if (!foundMove) {
      console.log('Rejected: not a legal chess move');
      setOptionSquares({});
      setMoveFrom('');
      return false;
    }

    // TEMPORARY: Allow any legal move to test drag & drop
    console.log('Attempting to make move:', foundMove.san);

    try {
      chessGameRef.current.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: foundMove.promotion || 'q'
      });

      console.log('Move successful!');
      setPosition(chessGameRef.current.fen());
      setFeedback(`Moved: ${foundMove.san}`);
      setIsCorrect(null);

      setMoveFrom('');
      setOptionSquares({});

      return true;
    } catch (error) {
      console.error('ERROR making move:', error);
      setOptionSquares({});
      setMoveFrom('');
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

    return {
      position: position,
      onSquareClick: onSquareClick,
      onPieceDrag: onPieceDrag,
      onPieceDrop: onPieceDrop,
      // Disabled mouse hover to prevent white squares while dragging
      // onMouseOverSquare: onMouseOverSquare,
      // onMouseOutSquare: onMouseOutSquare,
      onSquareRightClick: onSquareRightClick,
      squareStyles: styles,
      boardWidth: 560,
      animationDurationInMs: 300,
      allowDragging: !gameComplete,
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
  }, [position, optionSquares, rightClickedSquares, hoveredSquare, moveFrom, gameComplete, isDragging]);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Chess Board */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Instructions */}
            {!gameComplete && currentMoveIndex === 0 && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">How to Play</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Drag & Drop</strong> pieces or <strong>click</strong> a piece then click the destination square</li>
                  <li>• <strong>Right-click</strong> squares to mark them with red highlights</li>
                  <li>• Try to replicate the moves from the master game</li>
                  <li>• Use the <strong>Show Hint</strong> button if you get stuck</li>
                </ul>
              </div>
            )}

            <Chessboard options={chessboardOptions} />

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

            {/* Controls */}
            <div className="mt-4 space-y-3">
              {/* Navigation Controls */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={goToPreviousMove}
                  disabled={currentMoveIndex === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Previous Move"
                >
                  <span>←</span>
                  <span>Previous</span>
                </button>
                <button
                  onClick={goToNextMove}
                  disabled={currentMoveIndex >= masterMoves.length}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Next Move"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>

              {/* Action Controls */}
              <div className="flex gap-3">
                <button
                  onClick={resetGame}
                  className="btn flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reset Game
                </button>
                <button
                  onClick={showHint}
                  disabled={gameComplete}
                  className="btn flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Show Hint
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              Move {Math.floor(currentMoveIndex / 2) + 1} of {Math.ceil(masterMoves.length / 2)}
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="lg:col-span-1">
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
