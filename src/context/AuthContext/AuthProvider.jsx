import { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user in localStorage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login
        if (email === 'Admin' && password === '1234') {
            const userData = { email, role: 'admin', name: 'Admin User' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } else if (email && password) {
            const userData = { email, role: 'user', name: 'Normal User' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const register = async (userData) => {
        // Mock register
        const newUser = { ...userData, role: 'user' };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
