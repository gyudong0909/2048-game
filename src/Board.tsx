import React, { useEffect } from 'react';

import styles from './Board.module.css';
import Cell from './Cell';
import GameOver from './GameOver';
import GameWon from './GameWon';
import ScoreBoard from './ScoreBoard';
import { useGame } from './useGame';

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
    <div className={styles.boardContainer}>
      <ScoreBoard score={score} bestScore={bestScore} />
      <div className="button-container">
        <button className={styles.newGameButton} onClick={resetGame}>
          New Game
        </button>
        <button
          className={styles.undoButton}
          onClick={undo}
          disabled={!canUndo}
        >
          Undo
        </button>
        <button
          className={styles.redoButton}
          onClick={redo}
          disabled={!canRedo}
        >
          Redo
        </button>
      </div>
      <div className={styles.board}>
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
