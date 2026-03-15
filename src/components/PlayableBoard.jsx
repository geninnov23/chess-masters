import { useState, useEffect, useRef, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Breadcrumbs from './Breadcrumbs';
import AuthGate from './AuthGate';

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
  const [showThreats, setShowThreats] = useState(true);
  const [thinkAheadMode, setThinkAheadMode] = useState(false);
  const [thinkAheadDepth, setThinkAheadDepth] = useState(3); // Number of moves to show ahead
  const [boardKey, setBoardKey] = useState(0);

  // Gamification state
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [movesCompleted, setMovesCompleted] = useState(0);
  const [patternDetected, setPatternDetected] = useState(null);
  const [autoHintThreshold, setAutoHintThreshold] = useState(3); // Show hint after 3 wrong attempts
  const [showHelp, setShowHelp] = useState(false);

  // Accuracy & per-game progress
  const [totalWrongAttempts, setTotalWrongAttempts] = useState(0);
  const [gameProgress, setGameProgress] = useState({ bestScore: 0, completions: 0, lastAccuracy: 0 });

  // Study mode
  const [autoPlayOpponent, setAutoPlayOpponent] = useState(true);
  const [playingAs, setPlayingAs] = useState('white'); // 'white' | 'black'

  // ── localStorage helpers ──────────────────────────────────────────
  const progressKey = `chess-masters-progress-${game?.id}`;

  const loadProgress = () => {
    try {
      const raw = localStorage.getItem(progressKey);
      return raw ? JSON.parse(raw) : { bestScore: 0, completions: 0, lastAccuracy: 0 };
    } catch { return { bestScore: 0, completions: 0, lastAccuracy: 0 }; }
  };

  const saveProgress = (finalScore, accuracy) => {
    try {
      const prev = loadProgress();
      const next = {
        bestScore: Math.max(prev.bestScore, finalScore),
        completions: (prev.completions || 0) + 1,
        lastAccuracy: accuracy,
        lastPlayed: new Date().toISOString(),
      };
      localStorage.setItem(progressKey, JSON.stringify(next));
      setGameProgress(next);
    } catch (_) {}
  };

  // Load progress when a game opens
  useEffect(() => {
    if (game?.id) setGameProgress(loadProgress());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.id]);

  // Save progress when game completes
  useEffect(() => {
    if (!gameComplete) return;
    const accuracy = movesCompleted > 0
      ? Math.round((movesCompleted / (movesCompleted + totalWrongAttempts)) * 100)
      : 100;
    saveProgress(score, accuracy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameComplete]);

  // ─────────────────────────────────────────────────────────────────

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
      setBoardKey(prev => prev + 1);
    }
  }, [game]);

  // When switching to "play as Black" (or enabling auto-play while already Black),
  // reset to the start and let White's first move play automatically.
  useEffect(() => {
    if (!autoPlayOpponent || playingAs !== 'black' || masterMoves.length === 0) return;

    chessGameRef.current.reset();
    setPosition(chessGameRef.current.fen());
    setCurrentMoveIndex(0);
    setFeedback('');
    setIsCorrect(null);
    setGameComplete(false);
    setMoveFrom('');
    setOptionSquares({});

    playMasterMoveAt(0, masterMoves);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingAs, autoPlayOpponent, masterMoves]);

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

  const calculateThinkAheadArrows = () => {
    if (!thinkAheadMode) return [];

    // react-chessboard v5 Arrow type: { startSquare: string, endSquare: string, color: string }
    const arrowColors = [
      '#4169E1',  // Royal blue  — move 1
      '#22C55E',  // Green       — move 2
      '#FFD700',  // Gold        — move 3
      '#FF69B4',  // Hot pink    — move 4
      '#8B2BE2',  // Purple      — move 5
    ];

    const arrows = [];
    for (let i = 0; i < thinkAheadDepth && currentMoveIndex + i < masterMoves.length; i++) {
      const move = masterMoves[currentMoveIndex + i];
      arrows.push({
        startSquare: move.from,
        endSquare: move.to,
        color: arrowColors[i % arrowColors.length],
      });
    }
    return arrows;
  };

  const calculateThreats = () => {
    if (!showThreats) return { arrows: [], squareStyles: {}, squareCounts: {} };

    const currentFen = chessGameRef.current.fen();
    const currentMoves = chessGameRef.current.moves({ verbose: true });
    const currentTurn = chessGameRef.current.turn(); // 'w' or 'b'
    const board = chessGameRef.current.board();

    // Opponent moves via FEN-swap (swap active colour + clear en-passant)
    let opponentMoves = [];
    try {
      const parts = currentFen.split(' ');
      parts[1] = parts[1] === 'w' ? 'b' : 'w';
      parts[3] = '-';
      opponentMoves = new Chess(parts.join(' ')).moves({ verbose: true });
    } catch (_) {}

    // Capture arrows: red = what current player can take, orange = what opponent threatens
    const arrows = [];
    currentMoves.filter(m => m.captured)
      .forEach(m => arrows.push({ startSquare: m.from, endSquare: m.to, color: '#FF3C3C' }));
    opponentMoves.filter(m => m.captured)
      .forEach(m => arrows.push({ startSquare: m.from, endSquare: m.to, color: '#FFA500' }));

    // Attacker counts — only captures, indexed by destination square
    const currentAttacksTo = {};
    currentMoves.filter(m => m.captured)
      .forEach(m => { currentAttacksTo[m.to] = (currentAttacksTo[m.to] || 0) + 1; });
    const opponentAttacksTo = {};
    opponentMoves.filter(m => m.captured)
      .forEach(m => { opponentAttacksTo[m.to] = (opponentAttacksTo[m.to] || 0) + 1; });

    // ── Defender counting ────────────────────────────────────────────
    // chess.js never generates moves TO a square occupied by a friendly piece,
    // so `currentAttacksTo[X]` is always 0 for own pieces.
    // Fix: for each occupied square, temporarily replace the piece with a dummy
    // opponent pawn in the FEN, then count how many of the piece's own colour
    // can capture onto that square → those are the true defenders.
    const countDefenders = (square, pieceColor, row, col) => {
      // Kings: skip (removing the king from the FEN produces an invalid position)
      if (board[row][col]?.type === 'k') return 0;
      try {
        const parts = currentFen.split(' ');
        const fenRows = parts[0].split('/');

        // Expand the FEN row into individual characters (using '.' for empty)
        let expanded = '';
        for (const ch of fenRows[row]) {
          expanded += /\d/.test(ch) ? '.'.repeat(parseInt(ch)) : ch;
        }
        // Replace the piece at `col` with a dummy opponent pawn
        const chars = expanded.split('');
        chars[col] = pieceColor === 'w' ? 'p' : 'P'; // opponent-coloured pawn

        // Compress back to FEN notation
        let compressed = '';
        let empties = 0;
        for (const ch of chars) {
          if (ch === '.') { empties++; }
          else { if (empties) { compressed += empties; empties = 0; } compressed += ch; }
        }
        if (empties) compressed += empties;

        fenRows[row] = compressed;
        parts[0] = fenRows.join('/');
        parts[1] = pieceColor; // set turn to the piece's own colour
        parts[3] = '-';        // clear en-passant

        const game = new Chess(parts.join(' '));
        // Count captures by pieceColor onto this square = number of defenders
        return game.moves({ verbose: true })
          .filter(m => m.to === square && m.captured)
          .length;
      } catch (_) {
        return 0;
      }
    };

    // Build per-square attacker/defender counts and colour styles
    const squareCounts = {};
    const squareStyles = {};

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece) continue;

        const file = String.fromCharCode('a'.charCodeAt(0) + col);
        const rank = 8 - row;
        const square = `${file}${rank}`;

        const attackers = piece.color === currentTurn
          ? (opponentAttacksTo[square] || 0)  // opponent attacks our piece
          : (currentAttacksTo[square] || 0);  // we attack opponent's piece

        if (attackers === 0) continue; // un-attacked — nothing to show

        const defenders = countDefenders(square, piece.color, row, col);

        squareCounts[square] = { attackers, defenders };

        const net = attackers - defenders;
        let bg;
        if (net >= 2)       bg = 'rgba(220, 38, 38, 0.55)';  // severely hanging
        else if (net === 1) bg = 'rgba(239, 68, 68, 0.38)';  // lightly hanging
        else if (net === 0) bg = 'rgba(245, 158, 11, 0.40)'; // contested
        else                bg = 'rgba(34, 197, 94, 0.28)';  // well defended

        squareStyles[square] = { background: bg };
      }
    }

    return { arrows, squareStyles, squareCounts };
  };

  // Auto-plays the master move at `index`. Accepts an explicit index to avoid
  // stale-closure bugs that plagued the old makeComputerMove().
  const playMasterMoveAt = (index, moves = masterMoves) => {
    const move = moves[index];
    if (!move) return;

    setTimeout(() => {
      try {
        const moveOptions = { from: move.from, to: move.to };
        if (move.promotion) moveOptions.promotion = move.promotion;

        chessGameRef.current.move(moveOptions);
        setPosition(chessGameRef.current.fen());
        setCurrentMoveIndex(index + 1);
        setFeedback(`${move.color === 'w' ? '♔ White' : '♚ Black'} played ${move.san}`);

        if (index + 1 >= moves.length) {
          setGameComplete(true);
          setFeedback('Game complete! Well done!');
        }
      } catch (error) {
        console.error('Auto-play error:', error, move);
      }
    }, 650);
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

    // Block input when it is the opponent's turn in auto-play mode
    if (autoPlayOpponent) {
      const turn = chessGameRef.current.turn(); // 'w' or 'b'
      if ((playingAs === 'white' && turn === 'b') || (playingAs === 'black' && turn === 'w')) return;
    }

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

          // Capture opponent index BEFORE the state update (avoids stale closure)
          const opponentMoveIndex = currentMoveIndex + 1;

          setPosition(chessGameRef.current.fen());
          setCurrentMoveIndex(opponentMoveIndex);
          setFeedback(feedbackMsg);
          setIsCorrect(true);

          // Clear highlights
          setMoveFrom('');
          setOptionSquares({});

          // Auto-play opponent's response if enabled
          setTimeout(() => {
            setIsCorrect(null);
            setPatternDetected(null);
            if (autoPlayOpponent) {
              playMasterMoveAt(opponentMoveIndex);
            }
          }, 1200);
        } catch (error) {
          console.error('Move error:', error);
        }
      } else {
        // Wrong move — deduct points and track
        const newWrongAttempts = wrongAttempts + 1;
        const WRONG_PENALTY = 25;
        setWrongAttempts(newWrongAttempts);
        setTotalWrongAttempts(prev => prev + 1);
        setStreak(0);
        setScore(prev => Math.max(0, prev - WRONG_PENALTY));

        // Auto-show hint after threshold
        if (newWrongAttempts >= autoHintThreshold) {
          const nextMove = getNextMasterMove();
          setFeedback(`✗ Wrong! -${WRONG_PENALTY} pts. Hint: ${nextMove.san} (${nextMove.from}→${nextMove.to})`);
          setOptionSquares({
            [nextMove.from]: { background: 'rgba(255, 215, 0, 0.7)' },
            [nextMove.to]: { background: 'rgba(76, 175, 80, 0.7)' }
          });
        } else {
          setFeedback(`✗ Wrong move! -${WRONG_PENALTY} pts. (${newWrongAttempts}/${autoHintThreshold} before hint)`);
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

    // Block input when it is the opponent's turn in auto-play mode
    if (autoPlayOpponent) {
      const turn = chessGameRef.current.turn();
      if ((playingAs === 'white' && turn === 'b') || (playingAs === 'black' && turn === 'w')) {
        setOptionSquares({});
        setMoveFrom('');
        return false;
      }
    }

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

        // Capture opponent index BEFORE the state update (avoids stale closure)
        const opponentMoveIndex = currentMoveIndex + 1;

        setPosition(chessGameRef.current.fen());
        setCurrentMoveIndex(opponentMoveIndex);
        setFeedback(feedbackMsg);
        setIsCorrect(true);

        setMoveFrom('');
        setOptionSquares({});

        // Auto-play opponent's response if enabled
        setTimeout(() => {
          setIsCorrect(null);
          setPatternDetected(null);
          if (autoPlayOpponent) {
            playMasterMoveAt(opponentMoveIndex);
          }
        }, 1200);

        return true;
      } catch (error) {
        console.error('ERROR making move:', error);
        setOptionSquares({});
        setMoveFrom('');
        return false;
      }
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      const WRONG_PENALTY = 25;
      setWrongAttempts(newWrongAttempts);
      setTotalWrongAttempts(prev => prev + 1);
      setStreak(0);
      setScore(prev => Math.max(0, prev - WRONG_PENALTY));

      if (newWrongAttempts >= autoHintThreshold) {
        const nextMove = getNextMasterMove();
        setFeedback(`✗ Wrong! -${WRONG_PENALTY} pts. Hint: ${nextMove.san} (${nextMove.from}→${nextMove.to})`);
        setOptionSquares({
          [nextMove.from]: { background: 'rgba(255, 215, 0, 0.7)' },
          [nextMove.to]: { background: 'rgba(76, 175, 80, 0.7)' }
        });
      } else {
        setFeedback(`✗ Wrong move! -${WRONG_PENALTY} pts. (${newWrongAttempts}/${autoHintThreshold} before hint)`);
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
    setRightClickedSquares({});

    // Reset gamification stats
    setScore(0);
    setStreak(0);
    setWrongAttempts(0);
    setTotalWrongAttempts(0);
    setMovesCompleted(0);
    setPatternDetected(null);

    // If studying as Black, auto-play White's first move again
    if (autoPlayOpponent && playingAs === 'black' && masterMoves.length > 0) {
      playMasterMoveAt(0, masterMoves);
    }
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
      const HINT_PENALTY = 50;
      setScore(prev => Math.max(0, prev - HINT_PENALTY));
      setFeedback(`💡 Hint: ${nextMove.san} (${nextMove.from}→${nextMove.to})  −${HINT_PENALTY} pts`);

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

  // Memoise threat data separately so we can use squareCounts in the JSX overlay
  const threatData = useMemo(
    () => calculateThreats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showThreats, position]
  );

  const chessboardOptions = useMemo(() => {
    // Build square styles - only show legal moves and right-clicked squares
    const styles = {
      ...rightClickedSquares,
      // Threat square highlights sit beneath legal-move highlights
      ...(Object.keys(optionSquares).length === 0 ? threatData.squareStyles : {}),
      ...optionSquares,
    };

    // Only add hover effect if not dragging, not selecting, and no legal moves showing
    if (hoveredSquare && !moveFrom && !isDragging && Object.keys(optionSquares).length === 0) {
      styles[hoveredSquare] = {
        background: 'rgba(255, 255, 255, 0.1)'
      };
    }

    // Combine all arrows: think ahead + threats
    const thinkAheadArrows = calculateThinkAheadArrows();
    const threatArrows = threatData.arrows;

    // Validate arrows — react-chessboard v5 Arrow: { startSquare, endSquare, color }
    const validatedArrows = [
      ...thinkAheadArrows,
      ...threatArrows,
    ].filter(arrow =>
      arrow &&
      typeof arrow.startSquare === 'string' && arrow.startSquare.length === 2 &&
      typeof arrow.endSquare === 'string' && arrow.endSquare.length === 2 &&
      typeof arrow.color === 'string'
    );

    const allArrows = validatedArrows;

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
      allowDrawingArrows: false, // Disable manual arrow drawing, we show calculated arrows
      arrows: allArrows.length > 0 ? allArrows : undefined, // Only pass arrows if we have any
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
        backgroundColor: '#8B6340'   // warm walnut — pairs with gold accent
      },
      lightSquareStyle: {
        backgroundColor: '#E8D9B5'   // warm parchment — pairs with cream text
      },
      showNotation: true,
      boardOrientation: playingAs,
      showAnimations: true,
      dragActivationDistance: 3
    };
  }, [position, optionSquares, rightClickedSquares, hoveredSquare, moveFrom, gameComplete, isDragging, threatData, thinkAheadMode, thinkAheadDepth, currentMoveIndex, playingAs, masterMoves]);

  // ── Game Guide helpers ────────────────────────────────────────────
  const TACTIC_THEMES = {
    'queen-sacrifice': { icon: '♛', title: 'Queen Sacrifice', desc: 'Surrendering the most powerful piece to gain a decisive attack or material advantage elsewhere.' },
    'fork':            { icon: '⚔️', title: 'Fork',           desc: 'One piece simultaneously attacks two or more enemy pieces, forcing a loss of material.' },
    'pin':             { icon: '📌', title: 'Pin',            desc: 'A piece is unable to move without exposing a more valuable piece behind it.' },
    'skewer':          { icon: '🏹', title: 'Skewer',         desc: 'The opposite of a pin — the more valuable piece must move, leaving the lesser piece to be captured.' },
    'double-attack':   { icon: '⚔️', title: 'Double Attack',  desc: 'Two threats are created at once; the opponent can only parry one.' },
    'tactics':         { icon: '⚡', title: 'Sharp Tactics',  desc: 'Concrete, calculated sequences that punish any imprecision from the opponent.' },
    'king-hunt':       { icon: '🏹', title: 'King Hunt',      desc: 'The opposing king is chased across the board and mated by a coordinated piece attack.' },
    'sacrifice':       { icon: '💎', title: 'Material Sacrifice', desc: 'Giving up material to gain a lasting initiative, attack, or positional compensation.' },
    'back-rank':       { icon: '🚨', title: 'Back-Rank Mate', desc: 'Exploiting a back-rank weakness: the king is trapped by its own pawns.' },
    'development':     { icon: '🚀', title: 'Rapid Development', desc: 'Swiftly mobilising all pieces — a key principle: time in the opening is material.' },
    'attacking':       { icon: '⚡', title: 'King Attack',    desc: 'Coordinated piece and pawn assault targeting the opponent\'s king.' },
    'king\'s-gambit':  { icon: '♟', title: 'King\'s Gambit',  desc: 'White offers a pawn on f4 for rapid development — the defining gambit of the romantic era.' },
    'sicilian':        { icon: '♟', title: 'Sicilian Defence', desc: 'Black\'s sharpest answer to 1.e4, leading to asymmetric, tactical middlegames.' },
    'ruy-lopez':       { icon: '♟', title: 'Ruy López',      desc: 'One of the oldest openings, targeting the e5 pawn with 3.Bb5 for long-term pressure.' },
    'modern-defense':  { icon: '♟', title: 'Modern Defence', desc: 'Black allows White a big centre and plans to undermine it with piece pressure.' },
    'world-championship': { icon: '🏆', title: 'World Championship', desc: 'Played under the ultimate competitive pressure — every move scrutinised by the chess world.' },
    'computer-chess':  { icon: '🤖', title: 'Computer Chess', desc: 'Machine precision — moves chosen by calculation, not intuition.' },
    'ai':              { icon: '🤖', title: 'AI Strategy',   desc: 'Demonstrates superhuman pattern recognition and tactical depth.' },
    'legendary':       { icon: '⭐', title: 'Legendary Game', desc: 'One of the most studied and celebrated games ever played.' },
    'prodigy':         { icon: '🌟', title: 'Child Prodigy',  desc: 'Played by a player far younger than expected for this level of mastery.' },
    '19th-century':    { icon: '🕰️', title: '19th-Century Chess', desc: 'The romantic era — sacrifices and direct attacks prized above all.' },
  };

  const ECO_NOTES = {
    A: 'A flank or irregular opening — White avoids 1.e4 or 1.d4, leading to rich strategic battles outside the main theoretical lines.',
    B: 'A semi-open game — Black meets 1.e4 with a move other than 1…e5, creating asymmetric, fighting positions.',
    C: 'An open game — both sides open the centre with 1.e4 e5, typically leading to sharp, tactical play.',
    D: 'A closed or semi-closed game — solid pawn structures with long-term strategic planning after 1.d4 d5.',
    E: 'An Indian defence — Black fights for control with knights before committing pawns, often hypermodern in character.',
  };

  const openingNote = ECO_NOTES[game?.eco?.[0]] || 'A complex opening requiring careful study of the plans and piece placement for both sides.';

  const relevantThemes = (game?.tags || [])
    .filter(t => TACTIC_THEMES[t])
    .map(t => TACTIC_THEMES[t])
    .slice(0, 4);

  const phasePct = masterMoves.length > 0 ? currentMoveIndex / masterMoves.length : 0;
  const gamePhase = phasePct < 0.25
    ? { label: 'Opening',    color: '#4ade80', desc: 'Piece development and king safety' }
    : phasePct < 0.65
    ? { label: 'Middlegame', color: '#f59e0b', desc: 'Tactical and strategic battle' }
    : { label: 'Endgame',    color: '#f87171', desc: 'Technical precision required' };
  // ─────────────────────────────────────────────────────────────────

  if (!game) {
    return <div className="text-center py-12">Loading game...</div>;
  }

  return (
    <div className="playable-board-container">
      <AuthGate difficulty={game.difficulty}>
      <Breadcrumbs
        items={[
          { label: 'Games', path: '/' },
          { label: `${game.white} vs ${game.black}`, path: `/game/${game.id}`, book: true }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        {/* Chess Board — 3/5 width so the board has room to breathe */}
        <div className="lg:col-span-3">
          <div className="chess-panel" style={{ padding: '1rem' }}>
            {/* Compact Header with Help */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div className="move-counter">
                Move&nbsp;
                <span className="move-counter-current">{Math.floor(currentMoveIndex / 2) + 1}</span>
                &nbsp;/&nbsp;
                <span className="move-counter-total">{Math.ceil(masterMoves.length / 2)}</span>
              </div>

              {/* Help Button */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  onMouseEnter={() => setShowHelp(true)}
                  onMouseLeave={() => setShowHelp(false)}
                  className="help-btn"
                  title="How to Play"
                >
                  ?
                </button>

                {/* Help Tooltip */}
                {showHelp && (
                  <div className="chess-tooltip" style={{ position: 'absolute', right: 0, top: '2.25rem', width: '17rem', zIndex: 50 }}>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, color: '#ece8df', fontSize: '0.875rem', marginBottom: '0.5rem' }}>How to Play</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#b2aec4', lineHeight: 1.85 }}>
                      <li>· <strong style={{ color: '#ece8df' }}>Drag & drop</strong> or <strong style={{ color: '#ece8df' }}>click-to-move</strong> pieces</li>
                      <li>· Match the master's moves to earn points</li>
                      <li>· Build streaks for bonus points 🔥</li>
                      <li>· After 3 wrong moves, an auto-hint appears</li>
                      <li>· <strong style={{ color: '#c9a84c' }}>Think Ahead</strong>: see upcoming master moves</li>
                      <li>· <strong style={{ color: '#c9a84c' }}>Threat Analysis</strong>: attacker / defender counts</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <Chessboard
                key={`board-${boardKey}`}
                id="main-chessboard"
                options={chessboardOptions}
              />

              {/* Attacker / defender count overlay — shown only when Show Threats is on */}
              {showThreats && Object.keys(threatData.squareCounts).length > 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    // Inset to align with the 8×8 squares (react-chessboard leaves ~12.5% for notation)
                    top: '0%', left: '0%', right: '0%', bottom: '0%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gridTemplateRows: 'repeat(8, 1fr)',
                    pointerEvents: 'none',
                  }}
                >
                  {(() => {
                    const files = playingAs === 'white'
                      ? ['a','b','c','d','e','f','g','h']
                      : ['h','g','f','e','d','c','b','a'];
                    const ranks = playingAs === 'white'
                      ? [8,7,6,5,4,3,2,1]
                      : [1,2,3,4,5,6,7,8];

                    return ranks.flatMap((rank, rowIdx) =>
                      files.map((file, colIdx) => {
                        const square = `${file}${rank}`;
                        const counts = threatData.squareCounts[square];
                        if (!counts) return <div key={square} />;

                        const net = counts.attackers - counts.defenders;
                        const labelColor = net > 0 ? '#fff' : net === 0 ? '#1a1200' : '#0a2e0a';

                        return (
                          <div
                            key={square}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                              padding: '1px 2px',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '9px',
                                fontWeight: '700',
                                lineHeight: 1.1,
                                color: labelColor,
                                textShadow: '0 0 3px rgba(0,0,0,0.6)',
                                userSelect: 'none',
                              }}
                            >
                              {counts.attackers}A {counts.defenders}D
                            </span>
                          </div>
                        );
                      })
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`toast-chess ${
                isCorrect === true
                  ? 'toast-chess-success'
                  : isCorrect === false
                  ? 'toast-chess-error'
                  : 'toast-chess-info'
              }`}>
                {feedback}
              </div>
            )}
          </div>
        </div>

        {/* Game Info — 2/5 width sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Progress Panel */}
          <div className="chess-panel">
            {/* Score row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <p className="chess-section-label" style={{ marginBottom: '0.2rem' }}>Your Progress</p>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 600, color: '#ece8df', margin: 0 }}>
                  Game Score
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>
                  {score}
                </div>
                <div className="chess-section-label" style={{ marginTop: '0.2rem' }}>points</div>
              </div>
            </div>

            {/* Live stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.875rem' }}>
              <div className="chess-stat-pill">
                <div className="chess-stat-pill-value">🔥 {streak}</div>
                <div className="chess-stat-pill-label">Streak</div>
              </div>
              <div className="chess-stat-pill">
                <div className="chess-stat-pill-value">{movesCompleted}</div>
                <div className="chess-stat-pill-label">Moves</div>
              </div>
              <div className="chess-stat-pill">
                <div className="chess-stat-pill-value" style={{ color: '#c9a84c' }}>
                  {movesCompleted > 0
                    ? Math.round((movesCompleted / (movesCompleted + totalWrongAttempts)) * 100)
                    : 100}%
                </div>
                <div className="chess-stat-pill-label">Accuracy</div>
              </div>
            </div>

            {/* Personal bests */}
            {(gameProgress.bestScore > 0 || gameProgress.completions > 0) && (
              <div className="personal-best-row">
                <div>
                  <span className="chess-section-label">Best&nbsp;</span>
                  <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '0.78rem' }}>{gameProgress.bestScore} pts</span>
                </div>
                <div>
                  <span className="chess-section-label">Played&nbsp;</span>
                  <span style={{ color: '#ece8df', fontWeight: 600, fontSize: '0.78rem' }}>{gameProgress.completions}×</span>
                </div>
                {gameProgress.lastAccuracy > 0 && (
                  <div>
                    <span className="chess-section-label">Acc&nbsp;</span>
                    <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '0.78rem' }}>{gameProgress.lastAccuracy}%</span>
                  </div>
                )}
              </div>
            )}

            {/* Tactical pattern badge */}
            {patternDetected && patternDetected.length > 0 && (
              <div className="tactical-badge">
                <div className="chess-section-label" style={{ color: '#c9a84c', marginBottom: '0.2rem' }}>🎯 Tactical Pattern</div>
                {patternDetected.map((pattern, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', color: '#ece8df' }}>
                    +{pattern.points} {pattern.description}
                  </div>
                ))}
              </div>
            )}

            {/* Wrong-move counter */}
            {wrongAttempts > 0 && wrongAttempts < autoHintThreshold && (
              <div className="attempts-badge">
                <span>⚠</span>
                <span>
                  {autoHintThreshold - wrongAttempts} {autoHintThreshold - wrongAttempts === 1 ? 'try' : 'tries'} left before auto-hint (−25 pts each wrong move)
                </span>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="chess-panel">
            <p className="chess-section-label" style={{ marginBottom: '0.875rem' }}>Controls</p>

            {/* Navigation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button
                onClick={goToPreviousMove}
                disabled={currentMoveIndex === 0}
                className="btn-chess-secondary"
                title="Previous Move"
              >
                ← Prev
              </button>
              <button
                onClick={goToNextMove}
                disabled={currentMoveIndex >= masterMoves.length}
                className="btn-chess-secondary"
                title="Next Move"
              >
                Next →
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                onClick={resetGame}
                className="btn-chess-utility"
                title="Reset Game"
              >
                ↺ Reset
              </button>
              <button
                onClick={showHint}
                disabled={gameComplete}
                className="btn-chess-secondary"
                title="Show Hint (−50 pts)"
              >
                💡 Hint
              </button>
            </div>

            <div className="chess-divider" />

            {/* Analysis Tools */}
            <p className="chess-section-label" style={{ marginBottom: '0.625rem' }}>Analysis</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>
                <button
                  onClick={() => setThinkAheadMode(!thinkAheadMode)}
                  className={thinkAheadMode ? 'btn-chess-toggle-active' : 'btn-chess-toggle'}
                  title="Show next N moves from the master game"
                >
                  🎯 Think Ahead {thinkAheadMode ? '✓' : ''}
                </button>
                {thinkAheadMode && (
                  <div style={{ marginTop: '0.625rem', padding: '0 0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                      <span className="chess-section-label" style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '0.75rem' }}>Moves ahead</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c9a84c' }}>{thinkAheadDepth}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={thinkAheadDepth}
                      onChange={(e) => setThinkAheadDepth(Number(e.target.value))}
                      className="chess-range"
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#8a8698', marginTop: '0.25rem' }}>
                      <span>1</span><span>5</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowThreats(!showThreats)}
                className={showThreats ? 'btn-chess-toggle-active' : 'btn-chess-toggle'}
                title="Show attacker / defender counts per piece"
              >
                ⚠️ Threat Analysis {showThreats ? '✓' : ''}
              </button>

              {/* Threat legend */}
              {showThreats && (
                <div className="threat-legend">
                  <p className="chess-section-label" style={{ marginBottom: '0.375rem' }}>
                    Square colour · "NA ND" = attackers / defenders
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem 0.5rem', fontSize: '0.7rem', color: '#b2aec4' }}>
                    {[
                      { bg: 'rgba(220,38,38,0.55)',  label: 'Hanging' },
                      { bg: 'rgba(239,68,68,0.38)',  label: 'Under-defended' },
                      { bg: 'rgba(245,158,11,0.40)', label: 'Contested' },
                      { bg: 'rgba(34,197,94,0.28)',  label: 'Well defended' },
                    ].map(({ bg, label }) => (
                      <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: bg, flexShrink: 0, display: 'inline-block' }} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="chess-divider" />

            {/* Study Mode */}
            <p className="chess-section-label" style={{ marginBottom: '0.625rem' }}>Study Mode</p>

            <button
              onClick={() => setAutoPlayOpponent(prev => !prev)}
              className={autoPlayOpponent ? 'btn-chess-toggle-active' : 'btn-chess-toggle'}
              style={{ marginBottom: autoPlayOpponent ? '0.625rem' : 0 }}
              title="Opponent moves are played automatically — focus on one side only"
            >
              ⚡ Auto-play Opponent {autoPlayOpponent ? '✓' : ''}
            </button>

            {autoPlayOpponent && (
              <div>
                <p className="chess-section-label" style={{ marginBottom: '0.375rem' }}>Playing as</p>
                <div className="playing-as-group">
                  <button
                    onClick={() => setPlayingAs('white')}
                    className={playingAs === 'white' ? 'playing-as-btn-active' : 'playing-as-btn'}
                  >
                    ♔ White
                  </button>
                  <button
                    onClick={() => setPlayingAs('black')}
                    className={playingAs === 'black' ? 'playing-as-btn-active' : 'playing-as-btn'}
                  >
                    ♚ Black
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Game Guide */}
          <div className="chess-panel">
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', fontWeight: 700, color: '#ece8df', margin: '0 0 0.2rem' }}>
              {game.white} vs {game.black}
            </h2>
            <p style={{ fontSize: '0.72rem', color: '#8a8698', margin: '0 0 1.25rem' }}>
              {game.event} · {game.date} ·{' '}
              <span style={{ color: '#c9a84c', fontWeight: 600 }}>{game.result}</span>
            </p>

            {/* Phase progress bar */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                <span className="chess-section-label">Game Phase</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: gamePhase.color }}>{gamePhase.label}</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${phasePct * 100}%`, background: gamePhase.color }} />
              </div>
              <p style={{ fontSize: '0.68rem', color: '#8a8698', margin: '0.3rem 0 0' }}>
                Move {currentMoveIndex} of {masterMoves.length} · {gamePhase.desc}
              </p>
            </div>

            {/* Opening */}
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #252535' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem' }}>♟</span>
                <span className="chess-section-label">Opening</span>
                {game.eco && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: '#8a8698', fontFamily: 'monospace', background: '#1c1c28', border: '1px solid #252535', padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>
                    {game.eco}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ece8df', margin: '0 0 0.375rem' }}>{game.opening}</p>
              <p style={{ fontSize: '0.78rem', color: '#b2aec4', margin: 0, lineHeight: 1.65 }}>{openingNote}</p>
            </div>

            {/* Tactical themes */}
            {relevantThemes.length > 0 && (
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #252535' }}>
                <p className="chess-section-label" style={{ marginBottom: '0.75rem' }}>Tactical Themes</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {relevantThemes.map((theme, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem', lineHeight: 1, marginTop: '0.1rem', flexShrink: 0 }}>{theme.icon}</span>
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ece8df', margin: '0 0 0.15rem' }}>{theme.title}</p>
                        <p style={{ fontSize: '0.75rem', color: '#b2aec4', margin: 0, lineHeight: 1.6 }}>{theme.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <div>
              <p className="chess-section-label" style={{ marginBottom: '0.375rem' }}>About This Game</p>
              <p style={{ fontSize: '0.78rem', color: '#b2aec4', margin: 0, lineHeight: 1.7 }}>{game.description}</p>
            </div>
          </div>
        </div>
      </div>
      </AuthGate>
    </div>
  );
}
