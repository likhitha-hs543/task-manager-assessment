import React from 'react';
import { Inbox } from 'lucide-react';
import TaskItem from './TaskItem';

/**
 * Task List Component
 * Displays a list of tasks or empty state
 * 
 * @param {Array} tasks - Array of task objects to display
 * @param {function} onEdit - Handler for editing a task
 * @param {function} onDelete - Handler for deleting a task
 * @param {function} onToggleStatus - Handler for toggling task status
 */
const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
    // Empty state when no tasks
    if (!tasks || tasks.length === 0) {
        return (
            <div className="card p-12 text-center">
                <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No tasks found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or add a new task to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                />
            ))}
        </div>
    );
};

export default TaskList;
