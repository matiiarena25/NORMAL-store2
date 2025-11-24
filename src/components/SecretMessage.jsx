import { useState, useEffect } from 'react';
import useTheme from '../context/ThemeContext/useTheme';

const SecretMessage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const hasSeenMessage = sessionStorage.getItem('secretMessageShown');
        if (!hasSeenMessage) {
            setIsVisible(true);
            sessionStorage.setItem('secretMessageShown', 'true');
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                zIndex: 9999,
                backgroundColor: isDarkMode ? '#2b3035' : '#ffffff',
                color: isDarkMode ? '#f8f9fa' : '#212529',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                maxWidth: '300px',
                border: `1px solid ${isDarkMode ? '#495057' : '#dee2e6'}`,
                animation: 'fadeIn 0.5s ease-out'
            }}
        >
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: isDarkMode ? '#adb5bd' : '#6c757d',
                    padding: '0'
                }}
                aria-label="Close"
            >
                ×
            </button>
            <p style={{ margin: '10px 0 0 0', fontSize: '1rem', lineHeight: '1.5' }}>
                Solo si sos <strong>Belén</strong> probá agregar <code style={{ backgroundColor: isDarkMode ? '#495057' : '#e9ecef', padding: '2px 4px', borderRadius: '4px' }}>/admin</code> en la URL. Pero solo si sos Belén.
            </p>
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-50%) translateX(-20px); }
            to { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
        `}
            </style>
        </div>
    );
};

export default SecretMessage;
