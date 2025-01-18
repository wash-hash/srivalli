import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭'];

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...emojis]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlippedCards;
      
      if (cards[first].value === cards[second].value) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          
          if (matchedCards.every(card => card.isMatched)) {
            setIsWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div id="memory" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-indigo-600"
        >
          Memory Match
        </motion.h2>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xl font-semibold text-gray-700"
        >
          Moves: {moves}
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {cards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              className={`w-20 h-20 rounded-lg shadow-lg flex items-center justify-center text-3xl
                ${card.isFlipped || card.isMatched ? 'bg-indigo-600 text-white' : 'bg-white'}`}
            >
              {(card.isFlipped || card.isMatched) && card.value}
            </motion.button>
          ))}
        </motion.div>

        {isWon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-indigo-600 mb-4"
          >
            Congratulations! You won in {moves} moves!
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={initializeGame}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
}