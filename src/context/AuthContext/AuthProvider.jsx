import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem('session')
        if (saved) {
            return JSON.parse(saved);
        }
        else {
            return null;
        }
    });

    const login = async (name, password) => {
        if (name === 'Admin' && password === '1234') {
            const userData = { name, role: 'admin' };
            setUser(userData);
            sessionStorage.setItem('session', JSON.stringify(userData));
            alert("Iniciando sesion");
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('session');
        alert("Cerrando sesion");
    };
    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
