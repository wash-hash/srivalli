import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Position = { x: number; y: number };
type Velocity = { dx: number; dy: number };

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 10;
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;

export default function Pong() {
  const [ball, setBall] = useState<Position>({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
  const [ballVelocity, setBallVelocity] = useState<Velocity>({ dx: 5, dy: 5 });
  const [leftPaddle, setLeftPaddle] = useState<number>(GAME_HEIGHT / 2);
  const [rightPaddle, setRightPaddle] = useState<number>(GAME_HEIGHT / 2);
  const [scores, setScores] = useState({ left: 0, right: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const gameLoop = useRef<number>();
  const lastTime = useRef<number>(0);

  const resetBall = () => {
    setBall({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 });
    setBallVelocity({
      dx: (Math.random() > 0.5 ? 1 : -1) * 5,
      dy: (Math.random() * 2 - 1) * 5
    });
  };

  const startGame = () => {
    setIsPlaying(true);
    resetBall();
    setScores({ left: 0, right: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'w':
          setLeftPaddle(prev => Math.max(0, prev - 20));
          break;
        case 's':
          setLeftPaddle(prev => Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + 20));
          break;
        case 'ArrowUp':
          setRightPaddle(prev => Math.max(0, prev - 20));
          break;
        case 'ArrowDown':
          setRightPaddle(prev => Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + 20));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const update = (time: number) => {
      if (lastTime.current) {
        const delta = time - lastTime.current;
        
        // Update ball position
        const newBall = {
          x: ball.x + ballVelocity.dx,
          y: ball.y + ballVelocity.dy
        };

        // Ball collision with top and bottom
        if (newBall.y <= 0 || newBall.y >= GAME_HEIGHT - BALL_SIZE) {
          setBallVelocity(prev => ({ ...prev, dy: -prev.dy }));
        }

        // Ball collision with paddles
        if (
          (newBall.x <= PADDLE_WIDTH && newBall.y >= leftPaddle && newBall.y <= leftPaddle + PADDLE_HEIGHT) ||
          (newBall.x >= GAME_WIDTH - PADDLE_WIDTH - BALL_SIZE && newBall.y >= rightPaddle && newBall.y <= rightPaddle + PADDLE_HEIGHT)
        ) {
          setBallVelocity(prev => ({
            dx: -prev.dx * 1.1,
            dy: prev.dy * 1.1
          }));
        }

        // Scoring
        if (newBall.x <= 0) {
          setScores(prev => ({ ...prev, right: prev.right + 1 }));
          resetBall();
        } else if (newBall.x >= GAME_WIDTH - BALL_SIZE) {
          setScores(prev => ({ ...prev, left: prev.left + 1 }));
          resetBall();
        }

        setBall(newBall);
      }

      lastTime.current = time;
      gameLoop.current = requestAnimationFrame(update);
    };

    gameLoop.current = requestAnimationFrame(update);
    return () => {
      if (gameLoop.current) {
        cancelAnimationFrame(gameLoop.current);
      }
    };
  }, [ball, ballVelocity, leftPaddle, rightPaddle, isPlaying]);

  return (
    <div id="pong" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-blue-600"
        >
          Pong
        </motion.h2>

        {!isPlaying ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-gray-700 mb-4">
              Player 1: W/S keys<br />
              Player 2: Up/Down arrows
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              Start Game
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="text-2xl font-bold mb-4">
              {scores.left} - {scores.right}
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-blue-900 rounded-lg shadow-xl overflow-hidden"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            >
              {/* Left Paddle */}
              <motion.div
                className="absolute bg-white rounded"
                style={{
                  width: PADDLE_WIDTH,
                  height: PADDLE_HEIGHT,
                  left: 0,
                  top: leftPaddle,
                }}
              />
              
              {/* Right Paddle */}
              <motion.div
                className="absolute bg-white rounded"
                style={{
                  width: PADDLE_WIDTH,
                  height: PADDLE_HEIGHT,
                  right: 0,
                  top: rightPaddle,
                }}
              />
              
              {/* Ball */}
              <motion.div
                className="absolute bg-white rounded-full"
                style={{
                  width: BALL_SIZE,
                  height: BALL_SIZE,
                  left: ball.x,
                  top: ball.y,
                }}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}