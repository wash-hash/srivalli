import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Square = 'X' | 'O' | null;

export default function TicTacToe() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: Square[]): Square => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const status = winner 
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Game Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div id="tictactoe" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-purple-600"
        >
          Tic Tac Toe
        </motion.h2>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xl font-semibold text-gray-700"
        >
          {status}
        </motion.div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {squares.map((square, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleClick(i)}
              className="w-20 h-20 bg-white rounded-lg shadow-lg text-3xl font-bold flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {square}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          Reset Game
        </motion.button>
      </div>
    </div>
  );
}