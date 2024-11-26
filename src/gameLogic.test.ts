import { describe, expect, it } from 'vitest';

import { type BoardType, moveLeft } from './gameLogic.ts';

describe('moveLeft', () => {
  it('should move tiles to the left without merging', () => {
    const board: BoardType = [
      [0, 0, 0, 2],
      [0, 0, 2, 0],
      [0, 2, 0, 0],
      [2, 0, 0, 0],
    ];

    const expectedBoard: BoardType = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
    ];

    const { board: newBoard, moved, score } = moveLeft(board);

    expect(newBoard).toEqual(expectedBoard);
    expect(moved).toBe(true);
    expect(score).toBe(0);
  });

  it('should merge tiles when moving left', () => {
    const board: BoardType = [
      [2, 2, 2, 0],
      [0, 2, 2, 0],
      [4, 4, 2, 2],
      [2, 0, 0, 2],
    ];

    const expectedBoard: BoardType = [
      [4, 2, 0, 0],
      [4, 0, 0, 0],
      [8, 4, 0, 0],
      [4, 0, 0, 0],
    ];

    const { board: newBoard, moved, score } = moveLeft(board);

    expect(newBoard).toEqual(expectedBoard);
    expect(moved).toBe(true);
    expect(score).toBe(24);
  });

  it('should not change the board if no move is possible', () => {
    const board: BoardType = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4096],
      [8192, 16384, 32768, 65536],
    ];

    const { board: newBoard, moved, score } = moveLeft(board);

    expect(newBoard).toEqual(board);
    expect(moved).toBe(false);
    expect(score).toBe(0);
  });
});
