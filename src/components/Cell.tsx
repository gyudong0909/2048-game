// src/components/Cell.tsx

import '../styles/Cell.css'; // Cell.css를 올바르게 임포트합니다.

import React from 'react';

interface CellProps {
  value: number; // 셀의 값 (0이면 빈 셀)
}

const Cell: React.FC<CellProps> = ({ value }) => {
  const cellClass = `cell cell-${value > 2048 ? 'super' : value}`;

  return (
    <div className={cellClass}>
      <div className="cell-inner">{value !== 0 ? value : ''}</div>
    </div>
  );
};

export default Cell;
