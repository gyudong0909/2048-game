// src/components/GameWon.tsx

import '../styles/GameWon.css';

import React from 'react';

interface GameWonProps {
  onRestart: () => void;
  onKeepGoing: () => void;
}

const GameWon: React.FC<GameWonProps> = ({ onRestart, onKeepGoing }) => {
  return (
    <div className="game-won">
      <div className="message">
        <p>You win!</p>
        <button onClick={onKeepGoing}>Keep Going</button>
        <button onClick={onRestart}>New Game</button>
      </div>
    </div>
  );
};

export default GameWon;
