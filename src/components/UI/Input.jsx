import React from 'react';

/**
 * Reusable Input Component
 * Provides consistent input styling with error handling
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message to display
 * @param {boolean} required - Whether field is required
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional input props
 */
const Input = React.forwardRef(({
    label,
    error,
    required = false,
    className = '',
    ...props
}, ref) => {
    const inputClasses = `input ${error ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : ''} ${className}`.trim();

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                ref={ref}
                className={inputClasses}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
