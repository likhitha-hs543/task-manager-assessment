import { useState, useEffect } from 'react';
import { getTasksDueSoon, generateEmailNotification } from '../utils/helpers';
import { EMAIL_CHECK_INTERVAL } from '../utils/constants';

/**
 * Custom hook for simulated email automation
 * Checks for tasks due soon every specified interval
 * Generates mock email notifications
 * 
 * @param {Array} tasks - Array of all tasks
 * @returns {Object} { notifications, clearNotification }
 */
const useEmailAutomation = (tasks) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Function to check for tasks due soon and generate notifications
        const checkAndNotify = () => {
            const tasksDueSoon = getTasksDueSoon(tasks);

            if (tasksDueSoon.length > 0) {
                const notification = generateEmailNotification(tasksDueSoon);

                // Log to console for demo purposes
                console.log('📧 MOCK EMAIL NOTIFICATION SENT:', {
                    timestamp: notification.timestamp,
                    subject: notification.subject,
                    message: notification.message,
                    tasksCount: tasksDueSoon.length,
                    tasks: tasksDueSoon.map(t => ({
                        title: t.title,
                        dueDate: t.dueDate,
                        priority: t.priority,
                    })),
                });

                // Add notification to state for UI display
                setNotifications((prev) => [notification, ...prev].slice(0, 10)); // Keep last 10 notifications
            }
        };

        // Run check immediately on mount
        checkAndNotify();

        // Set up interval to check every EMAIL_CHECK_INTERVAL milliseconds
        // For demo: 30 seconds, For production: 20 minutes (1,200,000ms)
        const interval = setInterval(() => {
            checkAndNotify();
        }, EMAIL_CHECK_INTERVAL);

        console.log(`📧 Email automation started. Checking every ${EMAIL_CHECK_INTERVAL / 1000} seconds for tasks due soon.`);

        // Cleanup interval on unmount
        return () => {
            clearInterval(interval);
            console.log('📧 Email automation stopped.');
        };
    }, [tasks]);

    // Function to clear a specific notification
    const clearNotification = (notificationId) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    };

    // Function to clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return {
        notifications,
        clearNotification,
        clearAllNotifications,
    };
};

export default useEmailAutomation;
