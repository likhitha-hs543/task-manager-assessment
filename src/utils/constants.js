// Application constants

export const PRIORITY_LEVELS = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
};

export const TASK_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
};

export const FILTER_OPTIONS = {
    ALL: 'all',
    COMPLETED: 'completed',
    PENDING: 'pending',
};

export const PRIORITY_COLORS = {
    [PRIORITY_LEVELS.HIGH]: {
        badge: 'badge-high',
        bg: 'bg-red-50 dark:bg-red-900/10',
        border: 'border-red-200 dark:border-red-800',
        text: 'text-red-700 dark:text-red-300',
    },
    [PRIORITY_LEVELS.MEDIUM]: {
        badge: 'badge-medium',
        bg: 'bg-orange-50 dark:bg-orange-900/10',
        border: 'border-orange-200 dark:border-orange-800',
        text: 'text-orange-700 dark:text-orange-300',
    },
    [PRIORITY_LEVELS.LOW]: {
        badge: 'badge-low',
        bg: 'bg-green-50 dark:bg-green-900/10',
        border: 'border-green-200 dark:border-green-800',
        text: 'text-green-700 dark:text-green-300',
    },
};

// Email automation interval (in milliseconds)
// 20 minutes = 20 * 60 * 1000 = 1,200,000ms
// For demo purposes, you can reduce this to 30 seconds (30000ms)
export const EMAIL_CHECK_INTERVAL = 30000; // 30 seconds for demo
export const EMAIL_CHECK_INTERVAL_PRODUCTION = 1200000; // 20 minutes for production

// Storage keys
export const STORAGE_KEYS = {
    USER: 'taskManager_user',
    TASKS: 'taskManager_tasks',
    THEME: 'taskManager_theme',
};

// Demo user credentials (for simple login)
export const DEMO_CREDENTIALS = {
    email: 'demo@taskmanager.com',
    password: 'demo123',
};
