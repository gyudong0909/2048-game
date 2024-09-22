// src/main.tsx

import './styles/reset.css'; // CSS 리셋 스타일을 임포트합니다.
import './styles/App.css'; // 전역 스타일을 임포트합니다.

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'; // App 컴포넌트를 임포트합니다.

// ReactDOM.createRoot를 사용하여 React 애플리케이션을 렌더링합니다.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // StrictMode는 애플리케이션에서 잠재적인 문제를 감지하기 위해 사용됩니다.
  <React.StrictMode>
    <App /> {/* App 컴포넌트를 렌더링합니다. */}
  </React.StrictMode>,
);
