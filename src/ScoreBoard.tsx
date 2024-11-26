import React from 'react';

import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
  return (
    <div className={styles.scoreContainer}>
      <div className={styles.scoreBox}>
        <div className={styles.scoreLabel}>SCORE</div>
        <div className={styles.scoreValue}>{score}</div>
      </div>
      <div className={styles.bestBox}>
        <div className={styles.scoreLabel}>BEST</div>
        <div className={styles.scoreValue}>{bestScore}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
