import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const words = [
  'SRIVALLI', 'NAVYA', 'CHARAN', 'JHANSI',
  'GOWTHAMI', 'RISHITHA', 'RAKESH', 'VARSHIK',
  'LOKESH', 'TEJ'
];

const MAX_TRIES = 6;

export default function WordGuess() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [remainingTries, setRemainingTries] = useState(MAX_TRIES);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setRemainingTries(MAX_TRIES);
    setGameStatus('playing');
  };

  const guessLetter = (letter: string) => {
    if (gameStatus !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newTries = remainingTries - 1;
      setRemainingTries(newTries);
      
      if (newTries === 0) {
        setGameStatus('lost');
      }
    } else {
      const isWon = [...word].every(char => newGuessedLetters.has(char));
      if (isWon) {
        setGameStatus('won');
      }
    }
  };

  const renderWord = () => {
    return word.split('').map((letter, index) => (
      <motion.span
        key={index}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="mx-1 text-4xl font-bold"
      >
        {guessedLetters.has(letter) ? letter : '_'}
      </motion.span>
    ));
  };

  const renderKeyboard = () => {
    const keyboard = [
      'QWERTYUIOP'.split(''),
      'ASDFGHJKL'.split(''),
      'ZXCVBNM'.split('')
    ];

    return keyboard.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center gap-1 my-1">
        {row.map(letter => (
          <motion.button
            key={letter}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => guessLetter(letter)}
            disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
            className={`w-10 h-10 rounded-lg font-bold ${
              guessedLetters.has(letter)
                ? word.includes(letter)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-500 text-white'
                : 'bg-white hover:bg-fuchsia-100'
            } disabled:cursor-not-allowed transition-colors`}
          >
            {letter}
          </motion.button>
        ))}
      </div>
    ));
  };

  return (
    <div id="word-guess" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 to-pink-100">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-fuchsia-600"
        >
          Word Guess
        </motion.h2>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-xl mb-4">Tries remaining: {remainingTries}</div>
          <div className="mb-8">{renderWord()}</div>
          
          {gameStatus !== 'playing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold mb-4 ${
                gameStatus === 'won' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {gameStatus === 'won' ? 'Congratulations! You won!' : `Game Over! The word was ${word}`}
            </motion.div>
          )}
          
          {renderKeyboard()}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startNewGame}
          className="px-6 py-2 bg-fuchsia-600 text-white rounded-full shadow-lg hover:bg-fuchsia-700 transition-colors"
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
}
