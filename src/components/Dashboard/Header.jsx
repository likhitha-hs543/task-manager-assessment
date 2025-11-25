import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon, User, Bell, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { STORAGE_KEYS } from '../../utils/constants';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

/**
 * Header Component
 * Displays user info, theme toggle, notifications, and logout button
 * 
 * @param {Array} notifications - Array of email notifications
 * @param {function} onClearNotification - Handler to clear a notification
 */
const Header = ({ notifications = [], onClearNotification }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [theme, setTheme] = useState('light');
    const [showNotifications, setShowNotifications] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    /**
     * Apply theme to document
     */
    const applyTheme = (newTheme) => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    /**
     * Toggle theme
     */
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
        applyTheme(newTheme);
    };

    /**
     * Handle logout
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="glass sticky top-0 z-40 shadow-sm mb-8">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Task Manager
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Professional Workspace
                        </p>
                    </div>

                    {/* Right Side: User Info, Theme, Notifications, Logout */}
                    <div className="flex items-center gap-4">
                        {/* User Info */}
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800">
                            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {user?.email || 'User'}
                            </span>
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                title="Notifications"
                            >
                                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto glass rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 animate-slide-down">
                                    <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            Email Notifications
                                        </h3>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                            No notifications
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-200 dark:divide-slate-700">
                                            {notifications.map((notif) => (
                                                <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                                                            {notif.subject}
                                                        </p>
                                                        <button
                                                            onClick={() => onClearNotification(notif.id)}
                                                            className="p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                                        {new Date(notif.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <Moon className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Sun className="w-6 h-6 text-yellow-400" />
                            )}
                        </button>

                        {/* Logout Button */}
                        <Button
                            onClick={handleLogout}
                            variant="danger"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
