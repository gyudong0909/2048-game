// src/components/GameOver.tsx

import '../styles/GameOver.css';

import React from 'react';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <div className="game-over">
      <div className="message">
        <p>Game Over!</p>
        <button onClick={onRestart}>Try Again</button>
      </div>
    </div>
  );
};

export default GameOver;
