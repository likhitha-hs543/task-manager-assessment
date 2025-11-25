import React, { useState, useEffect } from 'react';
import { Plus, Edit } from 'lucide-react';
import { PRIORITY_LEVELS } from '../../utils/constants';
import { formatDateForInput } from '../../utils/helpers';
import Button from '../UI/Button';
import Input from '../UI/Input';

/**
 * Task Form Component
 * Form for creating and editing tasks
 * Includes validation for all required fields
 * 
 * @param {Object} task - Existing task object (for edit mode)
 * @param {function} onSubmit - Handler for form submission
 * @param {function} onCancel - Handler for cancel action
 * @param {boolean} isEditing - Whether in edit mode
 */
const TaskForm = ({
    task = null,
    onSubmit,
    onCancel = null,
    isEditing = false,
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: PRIORITY_LEVELS.MEDIUM,
        dueDate: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate form with existing task data when editing
    useEffect(() => {
        if (task && isEditing) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || PRIORITY_LEVELS.MEDIUM,
                dueDate: formatDateForInput(task.dueDate) || '',
            });
        }
    }, [task, isEditing]);

    /**
     * Handle input changes
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    /**
     * Validate form data
     */
    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.priority) {
            newErrors.priority = 'Priority is required';
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        // Call onSubmit with form data
        onSubmit(formData);

        // Clear form after successful submission (only for add mode)
        if (!isEditing) {
            setFormData({
                title: '',
                description: '',
                priority: PRIORITY_LEVELS.MEDIUM,
                dueDate: '',
            });
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    className={`input ${errors.title ? 'border-red-500' : ''}`}
                    autoFocus={!isEditing}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.title}
                    </p>
                )}
            </div>

            {/* Description Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows={4}
                    className={`input resize-none ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.description}
                    </p>
                )}
            </div>

            {/* Priority and Due Date (Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className={`input cursor-pointer ${errors.priority ? 'border-red-500' : ''}`}
                    >
                        <option value={PRIORITY_LEVELS.LOW}>Low</option>
                        <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                        <option value={PRIORITY_LEVELS.HIGH}>High</option>
                    </select>
                    {errors.priority && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.priority}
                        </p>
                    )}
                </div>

                {/* Due Date Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className={`input cursor-pointer ${errors.dueDate ? 'border-red-500' : ''}`}
                    />
                    {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.dueDate}
                        </p>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                >
                    {isEditing ? (
                        <>
                            <Edit className="w-5 h-5" />
                            <span>Update Task</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            <span>Add Task</span>
                        </>
                    )}
                </Button>

                {isEditing && onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
