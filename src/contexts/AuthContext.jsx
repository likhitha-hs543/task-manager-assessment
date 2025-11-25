import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

// Create Auth Context
const AuthContext = createContext();

/**
 * Custom hook to use Auth Context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/**
 * Auth Provider Component
 * Manages authentication state and session storage
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = () => {
            try {
                const storedUser = sessionStorage.getItem(STORAGE_KEYS.USER);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error loading session:', error);
                sessionStorage.removeItem(STORAGE_KEYS.USER);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    /**
     * Login function
     * Validates credentials and stores in session storage
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Object} { success: boolean, error?: string }
     */
    const login = (email, password) => {
        // Basic validation
        if (!email || !email.includes('@')) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        if (!password || password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        // Create user object
        const userData = {
            email,
            loginTime: new Date().toISOString(),
        };

        // Store in session storage
        try {
            sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
            setUser(userData);
            console.log('✅ User logged in successfully:', userData);
            return { success: true };
        } catch (error) {
            console.error('Error saving session:', error);
            return { success: false, error: 'Failed to save session' };
        }
    };

    /**
     * Logout function
     * Clears session storage and resets user state
     */
    const logout = () => {
        try {
            sessionStorage.removeItem(STORAGE_KEYS.USER);
            setUser(null);
            console.log('✅ User logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    const isAuthenticated = () => {
        return user !== null;
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: isAuthenticated(),
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
