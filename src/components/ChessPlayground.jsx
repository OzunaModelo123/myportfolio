import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Chess } from 'chess.js';
import { RotateCcw, Brain, User, Trophy, Undo2 } from 'lucide-react';

// ── AI ENGINE (MINIMAX + ALPHA-BETA) ────────────────────────────────────────
const pieceValues = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };

// Piece-square tables for positional evaluation (simplified)
const pawnTable = [
  0, 0, 0, 0, 0, 0, 0, 0,
  5, 5, 5, 5, 5, 5, 5, 5,
  1, 1, 2, 3, 3, 2, 1, 1,
  0, 0, 0, 2, 2, 0, 0, 0,
  0, 0, 0, 2, 2, 0, 0, 0,
  1, 0, -1, 0, 0, -1, 0, 1,
  1, 1, 1, -2, -2, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const knightTable = [
  -5, -4, -3, -3, -3, -3, -4, -5,
  -4, -2, 0, 0, 0, 0, -2, -4,
  -3, 0, 1, 1.5, 1.5, 1, 0, -3,
  -3, 0.5, 1.5, 2, 2, 1.5, 0.5, -3,
  -3, 0, 1.5, 2, 2, 1.5, 0, -3,
  -3, 0.5, 1, 1.5, 1.5, 1, 0.5, -3,
  -4, -2, 0, 0.5, 0.5, 0, -2, -4,
  -5, -4, -3, -3, -3, -3, -4, -5,
];

const pst = { p: pawnTable, n: knightTable };

const evaluateBoard = (game) => {
  let score = 0;
  const board = game.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece) {
        const val = pieceValues[piece.type] || 0;
        const table = pst[piece.type];
        const posBonus = table ? table[piece.color === 'w' ? r * 8 + c : (7 - r) * 8 + c] : 0;
        score += (piece.color === 'w' ? 1 : -1) * (val + posBonus);
      }
    }
  }
  return score;
};

const minimax = (game, depth, alpha, beta, isMax) => {
  if (depth === 0 || game.isGameOver()) return -evaluateBoard(game);
  const moves = game.moves();
  if (isMax) {
    let best = -9999;
    for (const move of moves) {
      game.move(move);
      best = Math.max(best, minimax(game, depth - 1, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = 9999;
    for (const move of moves) {
      game.move(move);
      best = Math.min(best, minimax(game, depth - 1, alpha, beta, true));
      game.undo();
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
};

const getBestMove = (game, depth = 2) => {
  const moves = game.moves();
  if (!moves.length) return null;
  let bestMove = null, bestValue = -9999;
  // Shuffle for variety
  moves.sort(() => Math.random() - 0.5);
  for (const move of moves) {
    game.move(move);
    const val = minimax(game, depth - 1, -10000, 10000, false);
    game.undo();
    if (val > bestValue) { bestValue = val; bestMove = move; }
  }
  return bestMove;
};

// ── PIECE ICONS (Unicode) ───────────────────────────────────────────────────
const pieceIcons = {
  w: { p: '♙\uFE0E', n: '♘\uFE0E', b: '♗\uFE0E', r: '♖\uFE0E', q: '♕\uFE0E', k: '♔\uFE0E' },
  b: { p: '♟\uFE0E', n: '♞\uFE0E', b: '♝\uFE0E', r: '♜\uFE0E', q: '♛\uFE0E', k: '♚\uFE0E' },
};

// ── SQUARE COMPONENT (memoized to avoid 64 re-renders) ──────────────────────
const Square = React.memo(({ square, piece, isDark, isSelected, isLastMove, isPotentialMove, isCapture, isKingInCheck, onSquareClick }) => (
  <button
    type="button"
    onClick={() => onSquareClick(square)}
    aria-label={`${square}${piece ? ` ${piece.color === 'w' ? 'white' : 'black'} ${piece.type}` : ''}`}
    className={[
      'relative flex items-center justify-center select-none aspect-square transition-colors duration-150',
      'outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-inset',
      'active:scale-95 touch-manipulation',
      isDark ? 'bg-[#1a1a2e]' : 'bg-[#262640]',
      isSelected ? 'ring-[3px] ring-inset ring-[#C75B39] z-10 bg-[#C75B39]/25' : '',
      isLastMove && !isSelected ? (isDark ? 'bg-[#C75B39]/15' : 'bg-[#C75B39]/12') : '',
      isKingInCheck ? 'bg-red-500/30 ring-2 ring-inset ring-red-500/60' : '',
    ].filter(Boolean).join(' ')}
  >
    {/* Move dot indicator */}
    {isPotentialMove && !piece && (
      <div className="w-[22%] h-[22%] rounded-full bg-white/20" />
    )}
    {/* Capture ring indicator */}
    {isCapture && piece && (
      <div className="absolute inset-[6%] rounded-full border-[3px] border-white/25 pointer-events-none" />
    )}
    {/* Piece */}
    {piece && (
      <span
        className={[
          'leading-none transition-transform duration-100',
          piece.color === 'w'
            ? 'text-[#f0ead6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
            : 'text-[#C75B39] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
          isSelected ? 'scale-110' : '',
        ].join(' ')}
        style={{ fontSize: 'clamp(1.4rem, 5.5vw, 2.8rem)' }}
      >
        {pieceIcons[piece.color][piece.type]}
      </span>
    )}
    {/* Rank/file labels on edges */}
    {square[0] === 'a' && (
      <span className="absolute top-[2px] left-[3px] text-[7px] font-mono opacity-20 leading-none select-none">{square[1]}</span>
    )}
    {square[1] === '1' && (
      <span className="absolute bottom-[1px] right-[3px] text-[7px] font-mono opacity-20 leading-none select-none">{square[0]}</span>
    )}
  </button>
));

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ChessPlayground() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [status, setStatus] = useState('');
  const [moveHistory, setMoveHistory] = useState([]);
  const [difficulty, setDifficulty] = useState(2);
  const [capturedPieces, setCapturedPieces] = useState({ w: [], b: [] });
  const [lastAIMove, setLastAIMove] = useState(null);
  const moveLogRef = useRef(null);

  // Scroll move log to bottom on new moves
  useEffect(() => {
    if (moveLogRef.current) {
      moveLogRef.current.scrollTop = moveLogRef.current.scrollHeight;
    }
  }, [moveHistory]);

  const makeAMove = useCallback((move) => {
    try {
      const copy = new Chess(game.fen());
      const result = copy.move(move);
      if (result) {
        // Track captured pieces
        if (result.captured) {
          const capturedColor = result.color === 'w' ? 'b' : 'w';
          setCapturedPieces(prev => ({
            ...prev,
            [capturedColor]: [...prev[capturedColor], result.captured],
          }));
        }
        setGame(copy);
        setMoveHistory(prev => [...prev, result.san]);
        return result;
      }
    } catch { /* invalid move */ }
    return null;
  }, [game]);

  const onSquareClick = useCallback((square) => {
    if (game.turn() === 'b' || game.isGameOver()) return;

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    if (selectedSquare) {
      const result = makeAMove({ from: selectedSquare, to: square, promotion: 'q' });
      if (result) {
        setSelectedSquare(null);
        setLastAIMove(null);
      } else {
        const piece = game.get(square);
        setSelectedSquare(piece && piece.color === 'w' ? square : null);
      }
    } else {
      const piece = game.get(square);
      if (piece && piece.color === 'w') setSelectedSquare(square);
    }
  }, [game, selectedSquare, makeAMove]);

  // AI move
  useEffect(() => {
    if (game.turn() === 'b' && !game.isGameOver()) {
      setIsThinking(true);
      const timer = setTimeout(() => {
        const ai = new Chess(game.fen());
        const best = getBestMove(ai, difficulty);
        if (best) {
          const result = makeAMove(best);
          if (result) setLastAIMove({ from: result.from, to: result.to });
        }
        setIsThinking(false);
      }, 400 + Math.random() * 300);
      return () => clearTimeout(timer);
    }
  }, [game, difficulty, makeAMove]);

  // Status updates
  useEffect(() => {
    if (game.isCheckmate()) setStatus(game.turn() === 'w' ? 'Checkmate. The bot got you.' : 'Checkmate. Okay, that was clean.');
    else if (game.isStalemate()) setStatus('Stalemate. Nobody wins, nobody loses.');
    else if (game.isDraw()) setStatus('Draw. We take those.');
    else if (game.isCheck()) setStatus('Check. Heads up.');
    else setStatus('');
  }, [game]);

  const resetGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
    setSelectedSquare(null);
    setStatus('');
    setCapturedPieces({ w: [], b: [] });
    setLastAIMove(null);
  };

  const undoMove = () => {
    if (moveHistory.length < 2) return;
    const copy = new Chess(game.fen());
    copy.undo(); // undo AI
    copy.undo(); // undo player
    setGame(copy);
    setMoveHistory(prev => prev.slice(0, -2));
    setSelectedSquare(null);
    setLastAIMove(null);
  };

  // Pre-compute legal moves for selected square
  const legalMoves = useMemo(() => {
    if (!selectedSquare) return { targets: new Set(), captures: new Set() };
    const moves = game.moves({ square: selectedSquare, verbose: true });
    return {
      targets: new Set(moves.map(m => m.to)),
      captures: new Set(moves.filter(m => m.captured).map(m => m.to)),
    };
  }, [selectedSquare, game]);

  // Find king in check
  const kingInCheck = useMemo(() => {
    if (!game.isCheck()) return null;
    const board = game.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type === 'k' && p.color === game.turn()) {
          return String.fromCharCode(97 + c) + (8 - r);
        }
      }
    }
    return null;
  }, [game]);

  const lastMoveVerbose = useMemo(() => game.history({ verbose: true }).pop(), [game]);

  const boardState = game.board();
  const isGameOver = game.isGameOver();
  const turn = game.turn();
  const moveCount = Math.ceil(moveHistory.length / 2);

  // Material advantage calculation
  const materialDiff = useMemo(() => {
    const vals = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    let w = 0, b = 0;
    const board = game.board();
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type !== 'k') {
          if (p.color === 'w') w += vals[p.type] || 0;
          else b += vals[p.type] || 0;
        }
      }
    return w - b;
  }, [game]);

  const CapturedRow = ({ color, pieces }) => {
    if (!pieces.length) return null;
    const order = ['q', 'r', 'b', 'n', 'p'];
    const sorted = [...pieces].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    return (
      <div className="flex items-center gap-0.5 flex-wrap">
        {sorted.map((p, i) => (
          <span key={i} className="text-sm opacity-50" style={{ color: color === 'w' ? '#f0ead6' : '#C75B39' }}>
            {pieceIcons[color][p]}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
      {/* ── BOARD COLUMN ── */}
      <div className="relative">
        <div className="glass rounded-2xl md:rounded-3xl border border-white/10 p-3 md:p-6 relative z-10">
          {/* Top bar — AI info + captured pieces */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors ${turn === 'b' && !isGameOver ? 'bg-[#C75B39] animate-pulse' : 'bg-white/15'}`} />
              <span className="font-mono text-[0.6rem] text-white/40 tracking-widest uppercase">
                {isThinking ? 'AI thinking…' : 'AI · Black'}
              </span>
            </div>
            <CapturedRow color="w" pieces={capturedPieces.w} />
          </div>

          {/* Board */}
          <div
            className="w-full max-w-[520px] mx-auto rounded-lg overflow-hidden shadow-2xl shadow-black/50"
            style={{ aspectRatio: '1 / 1' }}
          >
            <div className="grid grid-cols-8 w-full h-full">
              {Array.from({ length: 64 }, (_, idx) => {
                const r = Math.floor(idx / 8), c = idx % 8;
                const square = String.fromCharCode(97 + c) + (8 - r);
                const piece = boardState[r][c];
                const isDark = (r + c) % 2 === 1;
                const isSelected = selectedSquare === square;
                const isLastMove = (lastMoveVerbose && (lastMoveVerbose.from === square || lastMoveVerbose.to === square))
                  || (lastAIMove && (lastAIMove.from === square || lastAIMove.to === square));

                return (
                  <Square
                    key={square}
                    square={square}
                    piece={piece}
                    isDark={isDark}
                    isSelected={isSelected}
                    isLastMove={isLastMove}
                    isPotentialMove={legalMoves.targets.has(square)}
                    isCapture={legalMoves.captures.has(square)}
                    isKingInCheck={kingInCheck === square}
                    onSquareClick={onSquareClick}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom bar — player info + captured + controls */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-colors ${turn === 'w' && !isGameOver ? 'bg-emerald-400 animate-pulse' : 'bg-white/15'}`} />
              <span className="font-mono text-[0.6rem] text-white/40 tracking-widest uppercase">You · White</span>
            </div>
            <CapturedRow color="b" pieces={capturedPieces.b} />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <button
                onClick={undoMove}
                disabled={moveHistory.length < 2 || isThinking}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.6rem] font-mono tracking-widest uppercase transition-all disabled:opacity-20 disabled:cursor-not-allowed text-white/50 hover:text-white hover:bg-white/5"
              >
                <Undo2 className="w-3 h-3" /> Undo
              </button>
              <button
                onClick={resetGame}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.6rem] font-mono tracking-widest uppercase text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <RotateCcw className="w-3 h-3" /> New Game
              </button>
            </div>
            <span className="font-mono text-[0.55rem] text-white/20 tracking-widest uppercase hidden sm:block">
              Tap piece → tap destination
            </span>
          </div>
        </div>
      </div>

      {/* ── SIDEBAR ── */}
      <div className="flex flex-col gap-4">
        {/* Status Banner */}
        {status && (
          <div className={`rounded-xl p-4 border text-center transition-all ${
            status.includes('got you') ? 'border-red-500/40 bg-red-500/10' :
            status.includes('that was clean') ? 'border-emerald-500/40 bg-emerald-500/10' :
            status.includes('Heads up') ? 'border-amber-500/40 bg-amber-500/10' :
            'border-white/10 bg-white/5'
          }`}>
            <p className="font-inter text-sm text-white/90 font-medium">{status}</p>
          </div>
        )}

        {/* Material Advantage */}
        <div className="glass rounded-xl p-4 border border-white/10">
          <div className="font-mono text-[0.55rem] text-white/25 uppercase tracking-[0.2em] mb-2">Material</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(5, 50 + materialDiff * 3))}%`,
                  background: materialDiff >= 0
                    ? 'linear-gradient(90deg, #5B8C6F, #4ade80)'
                    : 'linear-gradient(90deg, #C75B39, #ef4444)',
                }}
              />
            </div>
            <span className={`font-mono text-xs font-bold ${materialDiff > 0 ? 'text-emerald-400' : materialDiff < 0 ? 'text-red-400' : 'text-white/30'}`}>
              {materialDiff > 0 ? `+${materialDiff}` : materialDiff}
            </span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="glass rounded-xl p-4 border border-white/10">
          <div className="font-mono text-[0.55rem] text-white/25 uppercase tracking-[0.2em] mb-3">Difficulty</div>
          <div className="flex gap-1.5">
              {[
              { d: 1, label: 'Chill', sub: 'for coffee' },
              { d: 2, label: 'Serious', sub: 'default' },
              { d: 3, label: 'Rude', sub: 'good luck' },
            ].map(({ d, label, sub }) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2 rounded-lg text-[0.6rem] font-mono tracking-wider uppercase border transition-all ${
                  difficulty === d
                    ? 'border-[#C75B39]/60 bg-[#C75B39]/15 text-[#C75B39]'
                    : 'border-white/5 text-white/30 hover:border-white/15 hover:text-white/50'
                }`}
              >
                <span className="block normal-case tracking-normal text-[0.72rem] text-white/80">{label}</span>
                <span className="block text-[0.5rem] text-white/35 normal-case mt-0.5">{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Move Log */}
        <div className="glass rounded-xl p-4 border border-white/10 flex-grow">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-[0.55rem] text-white/25 uppercase tracking-[0.2em]">Moves</div>
            <div className="font-mono text-[0.55rem] text-white/20">{moveCount} move{moveCount !== 1 ? 's' : ''}</div>
          </div>
          <div ref={moveLogRef} className="max-h-[200px] overflow-y-auto pr-1 chess-scroll">
            {moveHistory.length === 0 ? (
              <div className="text-white/15 font-inter text-xs italic text-center py-4">White to move. No pressure.</div>
            ) : (
              <div className="space-y-0.5">
                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                  <div key={i} className="flex items-center text-[0.65rem] font-mono rounded-md px-1.5 py-0.5 hover:bg-white/3">
                    <span className="text-white/15 w-5 text-right mr-2 flex-shrink-0">{i + 1}.</span>
                    <span className="text-white/70 flex-1">{moveHistory[i * 2]}</span>
                    {moveHistory[i * 2 + 1] && (
                      <span className="text-[#C75B39]/80 flex-1">{moveHistory[i * 2 + 1]}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .chess-scroll::-webkit-scrollbar { width: 3px; }
        .chess-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .chess-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
}
