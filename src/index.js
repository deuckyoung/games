import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
