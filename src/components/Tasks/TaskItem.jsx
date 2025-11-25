import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, Calendar, AlertCircle } from 'lucide-react';
import { PRIORITY_COLORS } from '../../utils/constants';
import { formatDate, isOverdue, getDaysUntilDue } from '../../utils/helpers';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import TaskForm from './TaskForm';

/**
 * Task Item Component
 * Displays individual task with all details and actions
 * Includes Edit, Delete, and Toggle Complete functionality
 * 
 * @param {Object} task - Task object
 * @param {function} onEdit - Handler for editing task
 * @param {function} onDelete - Handler for deleting task
 * @param {function} onToggleStatus - Handler for toggling task status
 */
const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const priorityStyle = PRIORITY_COLORS[task.priority];
    const isTaskOverdue = isOverdue(task.dueDate, task.status);
    const daysUntilDue = getDaysUntilDue(task.dueDate);

    /**
     * Handle edit submission
     */
    const handleEditSubmit = (formData) => {
        onEdit(task.id, formData);
        setShowEditModal(false);
    };

    /**
     * Handle delete confirmation
     */
    const handleDeleteConfirm = () => {
        onDelete(task.id);
        setShowDeleteConfirm(false);
    };

    /**
     * Get due date display text and color
     */
    const getDueDateInfo = () => {
        if (task.status === 'completed') {
            return {
                text: `Due: ${formatDate(task.dueDate)}`,
                color: 'text-gray-500',
            };
        }

        if (isTaskOverdue) {
            return {
                text: `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''}`,
                color: 'text-red-600 dark:text-red-400 font-semibold',
            };
        }

        if (daysUntilDue === 0) {
            return {
                text: 'Due Today',
                color: 'text-orange-600 dark:text-orange-400 font-semibold',
            };
        }

        if (daysUntilDue === 1) {
            return {
                text: 'Due Tomorrow',
                color: 'text-amber-600 dark:text-amber-400 font-semibold',
            };
        }

        return {
            text: `Due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}`,
            color: 'text-gray-600 dark:text-gray-400',
        };
    };

    const dueDateInfo = getDueDateInfo();

    return (
        <>
            <div
                className={`
          card card-hover p-6 
          ${task.status === 'completed' ? 'opacity-75' : ''}
          ${priorityStyle.border} border-l-4
          animate-slide-up
        `}
            >
                {/* Header: Title and Actions */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <h3
                            className={`
                text-xl font-bold text-gray-900 dark:text-gray-100 mb-2
                ${task.status === 'completed' ? 'line-through opacity-60' : ''}
              `}
                        >
                            {task.title}
                        </h3>
                        <p
                            className={`
                text-gray-600 dark:text-gray-400
                ${task.status === 'completed' ? 'line-through opacity-60' : ''}
              `}
                        >
                            {task.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
                            title="Edit task"
                            aria-label="Edit task"
                        >
                            <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                            title="Delete task"
                            aria-label="Delete task"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Details: Priority, Due Date, Status */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    {/* Priority Badge */}
                    <Badge variant={task.priority}>
                        {task.priority.toUpperCase()}
                    </Badge>

                    {/* Status Badge */}
                    <Badge variant={task.status}>
                        {task.status.toUpperCase()}
                    </Badge>

                    {/* Overdue Badge */}
                    {isTaskOverdue && (
                        <Badge variant="overdue">
                            <AlertCircle className="w-3 h-3 inline mr-1" />
                            OVERDUE
                        </Badge>
                    )}

                    {/* Due Date */}
                    <div className={`flex items-center gap-2 text-sm ${dueDateInfo.color}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{dueDateInfo.text}</span>
                    </div>
                </div>

                {/* Toggle Complete Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                    <Button
                        onClick={() => onToggleStatus(task.id)}
                        variant={task.status === 'completed' ? 'secondary' : 'success'}
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        {task.status === 'completed' ? (
                            <>
                                <X className="w-4 h-4" />
                                <span>Mark as Pending</span>
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Mark as Complete</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Task"
                size="lg"
            >
                <TaskForm
                    task={task}
                    onSubmit={handleEditSubmit}
                    onCancel={() => setShowEditModal(false)}
                    isEditing={true}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                title="Delete Task"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete <strong>"{task.title}"</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleDeleteConfirm}
                            variant="danger"
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Task</span>
                        </Button>
                        <Button
                            onClick={() => setShowDeleteConfirm(false)}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TaskItem;
