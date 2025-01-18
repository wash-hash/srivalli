import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export default function Snake() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood();
    setIsPaused(false);
  };

  const checkCollision = (head: Position): boolean => {
    // Wall collision
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    // Self collision
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      const head = { ...snake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head)) {
        setGameOver(true);
        return;
      }

      const newSnake = [head];
      const ateFood = head.x === food.x && head.y === food.y;

      if (ateFood) {
        setScore(prev => prev + 10);
        generateFood();
      }

      for (let i = 0; i < snake.length - (ateFood ? 0 : 1); i++) {
        newSnake.push({ ...snake[i] });
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED - Math.min(score, 100));
    return () => clearInterval(gameInterval);
  }, [snake, direction, food, gameOver, isPaused, score, generateFood]);

  return (
    <div id="snake" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-pink-600"
        >
          Snake Game
        </motion.h2>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4"
        >
          <div className="text-xl font-semibold text-gray-700 mb-2">Score: {score}</div>
          {gameOver && (
            <div className="text-red-600 font-bold mb-2">Game Over!</div>
          )}
          {isPaused && !gameOver && (
            <div className="text-purple-600 font-bold mb-2">Paused</div>
          )}
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-white rounded-lg shadow-xl p-4 mb-4"
          style={{
            width: GRID_SIZE * CELL_SIZE + 40,
            height: GRID_SIZE * CELL_SIZE + 40,
          }}
        >
          <div 
            className="relative"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {snake.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bg-pink-600 rounded-sm"
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                }}
              />
            ))}
            <motion.div
              className="absolute bg-purple-600 rounded-full"
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        <div className="space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-6 py-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-colors"
          >
            New Game
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPaused(prev => !prev)}
            className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-600"
        >
          Use arrow keys to move • Space to pause
        </motion.div>
      </div>
    </div>
  );
}