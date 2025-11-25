import React from 'react';

/**
 * Reusable Button Component
 * Provides consistent button styling across the application
 * 
 * @param {string} variant - Button variant: 'primary', 'secondary', 'danger', 'success'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {Object} props - Additional button props
 */
const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    disabled = false,
    ...props
}) => {
    const baseStyles = 'btn';

    const variantStyles = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const widthStyle = fullWidth ? 'w-full' : '';
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${widthStyle}
    ${disabledStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <button
            className={buttonClasses}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
