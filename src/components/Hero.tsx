import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, GamepadIcon } from 'lucide-react';
import profileImage from '../assets/images/profile.jpg';

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.5 
            }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <img
              src={profileImage}
              alt="Srivalli"
              className="w-32 h-32 rounded-full object-cover shadow-xl ring-4 ring-purple-400"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute -inset-2 rounded-full border-2 border-purple-300 border-dashed"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 100 
            }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
          >
            Srivalli
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            Full Stack Developer & Game Enthusiast
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <motion.a 
              whileHover={{ scale: 1.2, rotate: 15 }}
              href="#" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, rotate: -15 }}
              href="#" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, rotate: 15 }}
              href="#" 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <GameButton href="#tictactoe" color="purple" text="Tic Tac Toe" />
            <GameButton href="#snake" color="pink" text="Snake" />
            <GameButton href="#memory" color="indigo" text="Memory Match" />
            <GameButton href="#pong" color="blue" text="Pong" />
            <GameButton href="#connect-four" color="violet" text="Connect Four" />
            <GameButton href="#word-guess" color="fuchsia" text="Word Guess" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function GameButton({ href, color, text }: { href: string; color: string; text: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      className={`flex items-center justify-center px-6 py-3 bg-${color}-600 text-white rounded-full shadow-lg hover:bg-${color}-700 transition-colors`}
    >
      <GamepadIcon className="mr-2" size={20} />
      {text}
    </motion.a>
  );
}