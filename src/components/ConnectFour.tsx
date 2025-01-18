import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Player = 1 | 2;
type Cell = Player | null;
type Board = Cell[][];

const ROWS = 6;
const COLS = 7;

export default function ConnectFour() {
  const [board, setBoard] = useState<Board>(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = (board: Board, row: number, col: number, player: Player): boolean => {
    // Check horizontal
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[row][c] === player &&
        board[row][c + 1] === player &&
        board[row][c + 2] === player &&
        board[row][c + 3] === player
      ) {
        return true;
      }
    }

    // Check vertical
    for (let r = 0; r <= ROWS - 4; r++) {
      if (
        board[r][col] === player &&
        board[r + 1][col] === player &&
        board[r + 2][col] === player &&
        board[r + 3][col] === player
      ) {
        return true;
      }
    }

    // Check diagonal (positive slope)
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        if (
          board[r][c] === player &&
          board[r - 1][c + 1] === player &&
          board[r - 2][c + 2] === player &&
          board[r - 3][c + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check diagonal (negative slope)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        if (
          board[r][c] === player &&
          board[r + 1][c + 1] === player &&
          board[r + 2][c + 2] === player &&
          board[r + 3][c + 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const handleColumnClick = (col: number) => {
    if (winner || isDraw) return;

    const newBoard = [...board.map(row => [...row])];
    let row = ROWS - 1;

    // Find the lowest empty cell in the column
    while (row >= 0 && newBoard[row][col] !== null) {
      row--;
    }

    if (row < 0) return; // Column is full

    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (newBoard.every(row => row.every(cell => cell !== null))) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setCurrentPlayer(1);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div id="connect-four" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 to-purple-100">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-violet-600"
        >
          Connect Four
        </motion.h2>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xl font-semibold text-gray-700"
        >
          {winner ? `Player ${winner} wins!` : 
           isDraw ? "It's a draw!" : 
           `Player ${currentPlayer}'s turn`}
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-blue-900 p-4 rounded-lg shadow-xl inline-block"
        >
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <motion.button
                  key={colIndex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleColumnClick(colIndex)}
                  className="w-12 h-12 m-1 rounded-full relative overflow-hidden"
                  style={{
                    background: cell === null ? '#fff' :
                              cell === 1 ? '#ef4444' : '#eab308'
                  }}
                >
                  {cell && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-full shadow-lg hover:bg-violet-700 transition-colors"
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
}