import React from 'react';

import styles from './GameOver.module.css';

interface GameOverProps {
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <div className={styles.gameOver}>
      <div className={styles.message}>
        <p>Game Over!</p>
        <button onClick={onRestart}>Try Again</button>
      </div>
    </div>
  );
};

export default GameOver;
