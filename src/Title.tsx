import React from 'react';

import styles from './Title.module.css';

const Title: React.FC = () => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>2048 Game</h1>
    </div>
  );
};

export default Title;
