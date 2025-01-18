import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import TicTacToe from './components/TicTacToe';
import Snake from './components/Snake';
import MemoryMatch from './components/MemoryMatch';
import Pong from './components/Pong';
import ConnectFour from './components/ConnectFour';
import WordGuess from './components/WordGuess';
import Background3D from './components/Background3D'; // Corrected path

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative">
      <Background3D />

      <motion.div style={{ opacity }}>
        <Hero />
      </motion.div>

      <TicTacToe />
      <Snake />
      <MemoryMatch />
      <Pong />
      <ConnectFour />
      <WordGuess />

      <footer className="py-8 text-center text-gray-600 bg-white">
        <p>© 2024 Srivalli. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
