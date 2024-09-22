// src/components/Board.tsx

import '../styles/Board.css';

import React, { useEffect } from 'react';

import { useGame } from '../hooks/useGame';
import Cell from './Cell';
import GameOver from './GameOver';
import GameWon from './GameWon';
import ScoreBoard from './ScoreBoard';

const Board: React.FC = () => {
  const {
    board,
    score,
    bestScore,
    isGameWon,
    isGameOver,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    resetGame,
    undo,
    redo,
    canUndo,
    canRedo,
    keepGoing,
  } = useGame();

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if (isGameWon === 'won') {
        return;
      }

      if (event.key === 'ArrowUp') {
        moveUp();
      } else if (event.key === 'ArrowDown') {
        moveDown();
      } else if (event.key === 'ArrowLeft') {
        moveLeft();
      } else if (event.key === 'ArrowRight') {
        moveRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveUp, moveDown, moveLeft, moveRight, isGameWon]);

  return (
    <div className="game-container">
      <ScoreBoard score={score} bestScore={bestScore} />
      <div className="button-container">
        <button className="new-game-button" onClick={resetGame}>
          New Game
        </button>
        <button className="undo-button" onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button className="redo-button" onClick={redo} disabled={!canRedo}>
          Redo
        </button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} value={value} />
          )),
        )}
      </div>
      {isGameWon === 'won' && (
        <GameWon onRestart={resetGame} onKeepGoing={keepGoing} />
      )}
      {isGameOver && <GameOver onRestart={resetGame} />}
    </div>
  );
};

export default Board;
