import '../styles/Title.css'; // 스타일 파일 경로 확인

import React from 'react';

const Title: React.FC = () => {
  return (
    <div className="heading">
      <h1 className="title">2048 Game</h1>
    </div>
  );
};

export default Title;
