import classNames from 'classnames';
import React from 'react';

import styles from './Cell.module.css';

declare module '*.module.css' {
  const classes: { [key: string]: string };
}

interface CellProps {
  value: number;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  const cellClass = value > 2048 ? styles.cellSuper : styles[`cell${value}`];

  return (
    <div className={classNames(styles.cell, cellClass)}>
      <div className={styles.cellInner}>{value !== 0 ? value : ''}</div>
    </div>
  );
};

export default Cell;
