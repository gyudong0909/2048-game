import { useEffect, useState } from 'react';

import type { BoardType } from './gameLogic';
import {
  addRandomCell,
  checkGameOver,
  checkWin,
  createInitialBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from './gameLogic';

type GameWonStatus = 'notWon' | 'won' | 'continue';

export const useGame = () => {
  const [board, setBoard] = useState<BoardType>(() => {
    const savedBoard = localStorage.getItem('board');
    if (savedBoard !== null) {
      try {
        return JSON.parse(savedBoard) as BoardType;
      } catch (error) {
        console.error('Failed to parse saved board:', error);
        return createInitialBoard();
      }
    }
    return createInitialBoard();
  });

  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore !== null ? Number(savedScore) : 0;
  });

  const [bestScore, setBestScore] = useState<number>(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    return savedBestScore !== null ? Number(savedBestScore) : 0;
  });

  const [isGameWon, setIsGameWon] = useState<GameWonStatus>(() => {
    const savedGameWon = localStorage.getItem('isGameWon');
    if (savedGameWon !== null) {
      try {
        return JSON.parse(savedGameWon) as GameWonStatus;
      } catch (error) {
        console.error('Failed to parse saved game won status:', error);
        return 'notWon';
      }
    }
    return 'notWon';
  });

  const [isGameOver, setIsGameOver] = useState<boolean>(false);

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
  }, [board]);

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
      if (isGameWon === 'notWon' && checkWin(newBoard, 128)) {
        setIsGameWon('won');
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
    if (history.length === 0) {
      console.warn('Undo할 상태가 없습니다.');
      return;
    }

    const lastState = history[history.length - 1];

    if (lastState === undefined) {
      console.error('History에서 마지막 상태를 가져오는 데 실패했습니다.');
      return;
    }

    setFuture((prevFuture) => [{ board, score }, ...prevFuture]);
    setBoard(lastState.board);
    setScore(lastState.score);
    setHistory((prevHistory) => prevHistory.slice(0, -1));
    setIsGameOver(false);
    setIsGameWon('notWon'); // 필요 시 승리 상태 초기화
  };

  const redo = () => {
    if (future.length === 0) {
      console.warn('Redo할 상태가 없습니다.');
      return;
    }

    const nextState = future[0];

    if (nextState === undefined) {
      console.error('Future에서 다음 상태를 가져오는 데 실패했습니다.');
      return;
    }

    setHistory((prevHistory) => [...prevHistory, { board, score }]);
    setBoard(nextState.board);
    setScore(nextState.score);
    setFuture((prevFuture) => prevFuture.slice(1));
    // 필요 시 승리 상태 업데이트
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
    setIsGameWon('notWon'); // 승리 상태 초기화
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
