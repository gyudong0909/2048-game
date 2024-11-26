import './App.css';

import React from 'react';

import Board from './Board';
import Title from './Title';

const App: React.FC = () => {
  return (
    <div className="app">
      <Title />
      <Board />
    </div>
  );
};

export default App;
