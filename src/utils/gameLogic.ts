// src/utils/gameLogic.ts

export type BoardType = number[][];

// 초기 보드 생성 함수
export const createInitialBoard = (): BoardType => {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
};

// 랜덤한 빈 셀에 2 또는 4를 추가하는 함수
export const addRandomCell = (board: BoardType): BoardType => {
  const newBoard = board.map((row) => [...row]); // 보드 복사
  const emptyCells: { x: number; y: number }[] = [];

  newBoard.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        emptyCells.push({ x, y });
      }
    });
  });

  if (emptyCells.length === 0) {
    return newBoard;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const emptyCell = emptyCells[randomIndex];

  if (emptyCell) {
    const { x, y } = emptyCell;
    newBoard[y]![x] = Math.random() < 0.9 ? 2 : 4;
  }

  return newBoard;
};

// 행을 왼쪽으로 슬라이드하고 합치는 함수
const slideAndMergeRow = (
  row: number[],
): { newRow: number[]; score: number } => {
  const nonZeroTiles = row.filter((value): value is number => value !== 0); // 타입 가드 사용
  const newRow: number[] = [];
  let score = 0;
  let i = 0;

  while (i < nonZeroTiles.length) {
    if (
      i + 1 < nonZeroTiles.length &&
      nonZeroTiles[i] === nonZeroTiles[i + 1]
    ) {
      // 다음 타일이 존재하고, 현재 타일과 같으면 합침
      const mergedValue = nonZeroTiles[i]! * 2;
      newRow.push(mergedValue);
      score += mergedValue;
      i += 2; // 다음 타일을 건너뜀
    } else {
      newRow.push(nonZeroTiles[i]!);
      i += 1;
    }
  }

  while (newRow.length < 4) {
    newRow.push(0);
  }

  return { newRow, score };
};

// 보드를 왼쪽으로 이동하는 함수
export const moveLeft = (
  board: BoardType,
): { board: BoardType; moved: boolean; score: number } => {
  let moved = false;
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const { newRow, score } = slideAndMergeRow(row);
    if (newRow.toString() !== row.toString()) {
      moved = true;
    }
    totalScore += score;
    return newRow;
  });
  return { board: newBoard, moved, score: totalScore };
};

// 보드를 오른쪽으로 이동하는 함수
export const moveRight = (
  board: BoardType,
): { board: BoardType; moved: boolean; score: number } => {
  const reversedBoard = board.map((row) => row.slice().reverse());
  const { board: movedBoard, moved, score } = moveLeft(reversedBoard);
  const newBoard = movedBoard.map((row) => row.slice().reverse());
  return { board: newBoard, moved, score };
};

// 보드를 위로 이동하는 함수
export const moveUp = (
  board: BoardType,
): { board: BoardType; moved: boolean; score: number } => {
  const rotatedBoard = rotateBoard(rotateBoard(rotateBoard(board)));
  const { board: movedBoard, moved, score } = moveLeft(rotatedBoard);
  const newBoard = rotateBoard(movedBoard);
  return { board: newBoard, moved, score };
};

// 보드를 아래로 이동하는 함수
export const moveDown = (
  board: BoardType,
): { board: BoardType; moved: boolean; score: number } => {
  const rotatedBoard = rotateBoard(board);
  const { board: movedBoard, moved, score } = moveLeft(rotatedBoard);
  const newBoard = rotateBoard(rotateBoard(rotateBoard(movedBoard)));
  return { board: newBoard, moved, score };
};

// 보드를 시계 방향으로 90도 회전하는 함수
const rotateBoard = (board: BoardType): BoardType => {
  const rotatedBoard: BoardType = [];
  for (let x = 0; x < 4; x++) {
    const newRow: number[] = [];
    for (let y = 3; y >= 0; y--) {
      const value = board[y]![x]!;
      newRow.push(value);
    }
    rotatedBoard.push(newRow);
  }
  return rotatedBoard;
};

// 승리 여부를 확인하는 함수
export const checkWin = (board: BoardType, target: number = 128): boolean => {
  for (const row of board) {
    if (row.includes(target)) {
      return true;
    }
  }
  return false;
};

// 게임 오버 여부를 확인하는 함수
export const checkGameOver = (board: BoardType): boolean => {
  // 빈 셀이 있는 경우 게임 오버가 아님
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y]![x] === 0) {
        return false;
      }
    }
  }

  // 수평으로 합칠 수 있는지 확인
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y]![x] === board[y]![x + 1]) {
        return false;
      }
    }
  }

  // 수직으로 합칠 수 있는지 확인
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[y]![x] === board[y + 1]![x]) {
        return false;
      }
    }
  }

  // 이동 가능한 경우가 없으면 게임 오버
  return true;
};
