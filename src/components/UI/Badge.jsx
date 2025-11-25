import React from 'react';

/**
 * Reusable Badge Component
 * Displays colored badges for priorities and statuses
 * 
 * @param {string} variant - Badge variant: 'high', 'medium', 'low', 'completed', 'pending', 'overdue'
 * @param {ReactNode} children - Badge content
 * @param {string} className - Additional CSS classes
 */
const Badge = ({ variant = 'medium', children, className = '' }) => {
    const baseStyles = 'badge';

    const variantStyles = {
        high: 'badge-high',
        medium: 'badge-medium',
        low: 'badge-low',
        completed: 'badge-completed',
        pending: 'badge-pending',
        overdue: 'badge-overdue',
    };

    const badgeClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.medium}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <span className={badgeClasses}>
            {children}
        </span>
    );
};

export default Badge;
