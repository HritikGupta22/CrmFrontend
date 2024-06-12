import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'


const root = document.getElementById('root');

// Use createRoot to render the app
const rootElement = createRoot(root);
rootElement.render(<App />);
