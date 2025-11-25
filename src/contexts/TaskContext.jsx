import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, TASK_STATUS } from '../utils/constants';
import {
    searchTasks,
    filterTasksByStatus,
    filterTasksByPriority,
    generateId,
    validateTask
} from '../utils/helpers';

// Create Task Context
const TaskContext = createContext();

/**
 * Custom hook to use Task Context
 * @returns {Object} Task context value
 */
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

/**
 * Task Provider Component
 * Manages all task-related state and operations
 */
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const loadTasks = () => {
            try {
                const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
                if (storedTasks) {
                    const parsed = JSON.parse(storedTasks);
                    setTasks(Array.isArray(parsed) ? parsed : []);
                    console.log('✅ Loaded tasks from localStorage:', parsed.length);
                }
            } catch (error) {
                console.error('Error loading tasks:', error);
                localStorage.removeItem(STORAGE_KEYS.TASKS);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        if (!loading) {
            try {
                localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
            } catch (error) {
                console.error('Error saving tasks:', error);
            }
        }
    }, [tasks, loading]);

    /**
     * Add a new task
     * @param {Object} taskData - Task data object
     * @returns {Object} { success: boolean, error?: string, task?: Object }
     */
    const addTask = (taskData) => {
        // Validate task data
        const validation = validateTask(taskData);
        if (!validation.isValid) {
            return { success: false, errors: validation.errors };
        }

        // Create new task with unique ID and default status
        const newTask = {
            id: generateId(),
            ...taskData,
            status: TASK_STATUS.PENDING,
            createdAt: new Date().toISOString(),
        };

        // Add to tasks array (optimistic update)
        setTasks((prev) => [newTask, ...prev]);
        console.log('✅ Task added:', newTask);

        return { success: true, task: newTask };
    };

    /**
     * Update an existing task
     * @param {string} taskId - ID of task to update
     * @param {Object} updates - Updated task data
     * @returns {Object} { success: boolean, error?: string }
     */
    const updateTask = (taskId, updates) => {
        // Validate updates if provided
        if (updates.title || updates.description || updates.priority || updates.dueDate) {
            const taskData = { ...updates };
            const validation = validateTask(taskData);
            if (!validation.isValid) {
                return { success: false, errors: validation.errors };
            }
        }

        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                    : task
            )
        );

        console.log('✅ Task updated:', taskId);
        return { success: true };
    };

    /**
     * Delete a task
     * @param {string} taskId - ID of task to delete
     */
    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        console.log('✅ Task deleted:', taskId);
    };

    /**
     * Toggle task completion status
     * @param {string} taskId - ID of task to toggle
     */
    const toggleTaskStatus = (taskId) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status:
                            task.status === TASK_STATUS.COMPLETED
                                ? TASK_STATUS.PENDING
                                : TASK_STATUS.COMPLETED,
                        completedAt:
                            task.status === TASK_STATUS.PENDING
                                ? new Date().toISOString()
                                : null,
                    }
                    : task
            )
        );

        console.log('✅ Task status toggled:', taskId);
    };

    /**
     * Get filtered tasks based on current search and filters
     * Implements elastic search flow: Input → Debounce → Filter → Render
     * @param {string} debouncedQuery - Debounced search query
     * @returns {Array} Filtered tasks
     */
    const getFilteredTasks = (debouncedQuery) => {
        let filtered = [...tasks];

        // Apply search filter (case-insensitive, partial substring match)
        filtered = searchTasks(filtered, debouncedQuery);

        // Apply status filter
        filtered = filterTasksByStatus(filtered, statusFilter);

        // Apply priority filter
        filtered = filterTasksByPriority(filtered, priorityFilter);

        return filtered;
    };

    /**
     * Clear all filters and search
     */
    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setPriorityFilter('all');
    };

    const value = {
        // State
        tasks,
        searchQuery,
        statusFilter,
        priorityFilter,
        loading,

        // Actions
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,

        // Filters
        setSearchQuery,
        setStatusFilter,
        setPriorityFilter,
        getFilteredTasks,
        clearFilters,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
