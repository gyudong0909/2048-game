// src/components/ScoreBoard.tsx

import '../styles/ScoreBoard.css';

import React from 'react';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
  return (
    <div className="score-container">
      <div className="score-box">
        <div className="score-label">SCORE</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="best-box">
        <div className="score-label">BEST</div>
        <div className="score-value">{bestScore}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
