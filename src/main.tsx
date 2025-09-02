import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 这里用非空断言 `!` 告诉 TS：#root 一定存在
ReactDOM.createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
