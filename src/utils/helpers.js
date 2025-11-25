// Helper functions for the Task Manager application

/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
};

/**
 * Format a date to YYYY-MM-DD for input fields
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
};

/**
 * Check if a task is overdue
 * @param {string} dueDate - The due date of the task
 * @param {string} status - The status of the task
 * @returns {boolean} True if task is overdue
 */
export const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
};

/**
 * Get days until due date
 * @param {string} dueDate - The due date of the task
 * @returns {number} Number of days until due (negative if overdue)
 */
export const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

/**
 * Search tasks by query string (case-insensitive, partial match)
 * @param {Array} tasks - Array of task objects
 * @param {string} query - Search query
 * @returns {Array} Filtered tasks
 */
export const searchTasks = (tasks, query) => {
    if (!query || query.trim() === '') return tasks;

    const lowerQuery = query.toLowerCase().trim();

    return tasks.filter((task) => {
        const titleMatch = task.title.toLowerCase().includes(lowerQuery);
        const descriptionMatch = task.description.toLowerCase().includes(lowerQuery);
        return titleMatch || descriptionMatch;
    });
};

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of task objects
 * @param {string} filter - Filter option ('all', 'completed', 'pending')
 * @returns {Array} Filtered tasks
 */
export const filterTasksByStatus = (tasks, filter) => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
};

/**
 * Filter tasks by priority
 * @param {Array} tasks - Array of task objects
 * @param {string} priority - Priority level ('all', 'high', 'medium', 'low')
 * @returns {Array} Filtered tasks
 */
export const filterTasksByPriority = (tasks, priority) => {
    if (priority === 'all') return tasks;
    return tasks.filter((task) => task.priority === priority);
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Calculate task statistics
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Statistics object
 */
export const calculateStats = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.status)).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
        total,
        completed,
        pending,
        overdue,
        completionRate,
    };
};

/**
 * Get tasks that are due soon (within 24 hours)
 * @param {Array} tasks - Array of task objects
 * @returns {Array} Tasks due within 24 hours
 */
export const getTasksDueSoon = (tasks) => {
    return tasks.filter((task) => {
        if (task.status === 'completed') return false;
        const daysUntil = getDaysUntilDue(task.dueDate);
        return daysUntil >= 0 && daysUntil <= 1;
    });
};

/**
 * Generate mock email notification content
 * @param {Array} tasks - Array of tasks to notify about
 * @returns {Object} Email notification object
 */
export const generateEmailNotification = (tasks) => {
    return {
        id: generateId(),
        timestamp: new Date().toISOString(),
        subject: `Task Reminder: ${tasks.length} task(s) due soon`,
        message: `You have ${tasks.length} pending task(s) due within the next 24 hours.`,
        tasks: tasks.map((task) => ({
            id: task.id,
            title: task.title,
            dueDate: task.dueDate,
            priority: task.priority,
        })),
    };
};

/**
 * Validate task form data
 * @param {Object} taskData - Task data object
 * @returns {Object} Validation result with errors
 */
export const validateTask = (taskData) => {
    const errors = {};

    if (!taskData.title || taskData.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (!taskData.description || taskData.description.trim() === '') {
        errors.description = 'Description is required';
    }

    if (!taskData.priority) {
        errors.priority = 'Priority is required';
    }

    if (!taskData.dueDate) {
        errors.dueDate = 'Due date is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
