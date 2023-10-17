import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import myTheme from './options/myTheme';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={myTheme}>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </ThemeProvider>
);