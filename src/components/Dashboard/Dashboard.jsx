import React, { useState } from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import useDebounce from '../../hooks/useDebounce';
import useEmailAutomation from '../../hooks/useEmailAutomation';
import Header from './Header';
import Statistics from './Statistics';
import TaskForm from '../Tasks/TaskForm';
import TaskList from '../Tasks/TaskList';
import SearchBar from '../Filters/SearchBar';
import FilterBar from '../Filters/FilterBar';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

/**
 * Main Dashboard Component
 * Central hub for task management with all features:
 * - Task CRUD operations
 * - Filtering and search (with debouncing)
 * - Statistics display
 * - Email automation notifications
 */
const Dashboard = () => {
    const {
        tasks,
        searchQuery,
        statusFilter,
        priorityFilter,
        setSearchQuery,
        setStatusFilter,
        setPriorityFilter,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        getFilteredTasks,
        clearFilters,
    } = useTasks();

    // Email automation hook
    const { notifications, clearNotification, clearAllNotifications } = useEmailAutomation(tasks);

    // Debounce search query for performance
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Get filtered tasks using debounced search query
    const filteredTasks = getFilteredTasks(debouncedSearchQuery);

    // Modal state for add task
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    /**
     * Handle adding a new task
     */
    const handleAddTask = (formData) => {
        const result = addTask(formData);
        if (result.success) {
            setShowAddTaskModal(false);
            console.log('✅ Task added successfully');
        }
    };

    /**
     * Handle updating a task
     */
    const handleUpdateTask = (taskId, formData) => {
        updateTask(taskId, formData);
        console.log('✅ Task updated successfully');
    };

    /**
     * Handle deleting a task
     */
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
        console.log('✅ Task deleted successfully');
    };

    /**
     * Handle toggling task status
     */
    const handleToggleStatus = (taskId) => {
        toggleTaskStatus(taskId);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Header */}
            <Header
                notifications={notifications}
                onClearNotification={clearNotification}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Statistics */}
                <Statistics tasks={tasks} />

                {/* Add Task Button and Search/Filter Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <FolderOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    My Tasks
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setShowAddTaskModal(true)}
                            variant="primary"
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add New Task</span>
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <SearchBar
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tasks by title or description..."
                        />
                    </div>

                    {/* Filter Bar */}
                    <FilterBar
                        statusFilter={statusFilter}
                        priorityFilter={priorityFilter}
                        onStatusChange={setStatusFilter}
                        onPriorityChange={setPriorityFilter}
                        onClearFilters={clearFilters}
                    />
                </div>

                {/* Task List */}
                <TaskList
                    tasks={filteredTasks}
                    onEdit={handleUpdateTask}
                    onDelete={handleDeleteTask}
                    onToggleStatus={handleToggleStatus}
                />
            </main>

            {/* Add Task Modal */}
            <Modal
                isOpen={showAddTaskModal}
                onClose={() => setShowAddTaskModal(false)}
                title="Add New Task"
                size="lg"
            >
                <TaskForm
                    onSubmit={handleAddTask}
                    onCancel={() => setShowAddTaskModal(false)}
                    isEditing={false}
                />
            </Modal>
        </div>
    );
};

export default Dashboard;
