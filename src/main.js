import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
        <ThemeProvider>
            <App />
            <Toaster position="top-center" toastOptions={{
        duration: 3000,
        style: {
            background: '#fff',
            color: '#1f2937',
            fontSize: '14px',
            fontWeight: '600',
        },
        success: {
            iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
            },
        },
    }}/>
        </ThemeProvider>
    </React.StrictMode>);
