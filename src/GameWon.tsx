import React from 'react';

import styles from './GameWon.module.css';

interface GameWonProps {
  onRestart: () => void;
  onKeepGoing: () => void;
}

const GameWon: React.FC<GameWonProps> = ({ onRestart, onKeepGoing }) => {
  return (
    <div className={styles.gameWon}>
      <div className={styles.message}>
        <p>You win!</p>
        <button onClick={onKeepGoing}>Keep Going</button>
        <button onClick={onRestart}>New Game</button>
      </div>
    </div>
  );
};

export default GameWon;
