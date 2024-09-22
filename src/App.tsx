import './styles/App.css';

import React from 'react';

import Board from './components/Board';
import Title from './components/Title';

const App: React.FC = () => {
  return (
    <div className="app">
      <Title />
      <Board />
    </div>
  );
};

export default App;
