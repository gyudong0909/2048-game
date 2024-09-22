// src/hooks/useGame.ts

import { useEffect, useState } from 'react';

import type { BoardType } from '../utils/gameLogic';
import {
  addRandomCell,
  checkGameOver,
  checkWin,
  createInitialBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from '../utils/gameLogic';

type GameWonStatus = 'notWon' | 'won' | 'continue';

export const useGame = () => {
  const [board, setBoard] = useState<BoardType>(() => {
    const savedBoard = localStorage.getItem('board');
    return savedBoard ? JSON.parse(savedBoard) : createInitialBoard();
  });
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore ? Number(savedScore) : 0;
  });
  const [bestScore, setBestScore] = useState<number>(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    return savedBestScore ? Number(savedBestScore) : 0;
  });
  const [isGameWon, setIsGameWon] = useState<GameWonStatus>(() => {
    const savedGameWon = localStorage.getItem('isGameWon');
    return savedGameWon
      ? (JSON.parse(savedGameWon) as GameWonStatus)
      : 'notWon';
  });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // 상태 히스토리 관리
  const [history, setHistory] = useState<{ board: BoardType; score: number }[]>(
    [],
  );
  const [future, setFuture] = useState<{ board: BoardType; score: number }[]>(
    [],
  );

  // 초기 보드 설정
  useEffect(() => {
    if (board.every((row) => row.every((cell) => cell === 0))) {
      let newBoard = addRandomCell(board);
      newBoard = addRandomCell(newBoard);
      setBoard(newBoard);
    }
  }, []);

  // 게임 상태 저장
  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('score', score.toString());
    localStorage.setItem('isGameWon', JSON.stringify(isGameWon));
  }, [board, score, isGameWon]);

  // 점수 업데이트 시 최고 점수 갱신
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score.toString());
    }
  }, [score, bestScore]);

  const handleMove = (
    moveFunc: (board: BoardType) => {
      board: BoardType;
      moved: boolean;
      score: number;
    },
  ) => {
    const { board: newBoard, moved, score: gainedScore } = moveFunc(board);

    if (moved) {
      // 현재 상태를 히스토리에 저장
      setHistory((prevHistory) => [...prevHistory, { board, score }]);
      setFuture([]); // 새로운 이동이 발생하면 미래 히스토리를 초기화

      // **승리 여부를 newBoard로 검사합니다.**
      if (isGameWon === 'notWon') {
        if (checkWin(newBoard, 128)) {
          setIsGameWon('won');
        }
      }

      // **게임 오버 여부는 addedBoard로 검사합니다.**
      const addedBoard = addRandomCell(newBoard);
      setBoard(addedBoard);
      setScore((prevScore) => prevScore + gainedScore);

      if (checkGameOver(addedBoard)) {
        setIsGameOver(true);
      }
    }
  };

  const keepGoing = () => {
    setIsGameWon('continue');
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1]!;
      setFuture((prevFuture) => [{ board, score }, ...prevFuture]);
      setBoard(lastState.board);
      setScore(lastState.score);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setIsGameOver(false);
    }
  };

  const redo = () => {
    if (future.length > 0) {
      const nextState = future[0]!;
      setHistory((prevHistory) => [...prevHistory, { board, score }]);
      setBoard(nextState.board);
      setScore(nextState.score);
      setFuture((prevFuture) => prevFuture.slice(1));
    }
  };

  const moveUpAction = () => {
    handleMove(moveUp);
  };
  const moveDownAction = () => {
    handleMove(moveDown);
  };
  const moveLeftAction = () => {
    handleMove(moveLeft);
  };
  const moveRightAction = () => {
    handleMove(moveRight);
  };

  const resetGame = () => {
    const initialBoard = createInitialBoard();
    let newBoard = addRandomCell(initialBoard);
    newBoard = addRandomCell(newBoard);
    setBoard(newBoard);
    setScore(0);
    setIsGameOver(false);
    setIsGameWon('notWon'); //승리상태 초기화
    setHistory([]);
    setFuture([]);

    localStorage.removeItem('board');
    localStorage.removeItem('score');
    localStorage.removeItem('isGameWon');
  };

  return {
    board,
    score,
    bestScore,
    isGameWon,
    isGameOver,
    moveUp: moveUpAction,
    moveDown: moveDownAction,
    moveLeft: moveLeftAction,
    moveRight: moveRightAction,
    resetGame,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    keepGoing,
  };
};
