import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Search Bar Component
 * Provides search input for filtering tasks
 * Implements debouncing for performance (handled by parent with useDebounce hook)
 * 
 * @param {string} value - Current search value
 * @param {function} onChange - Handler for search input changes
 * @param {string} placeholder - Placeholder text
 */
const SearchBar = ({
    value,
    onChange,
    placeholder = 'Search tasks...',
}) => {
    const handleClear = () => {
        onChange({ target: { value: '' } });
    };

    return (
        <div className="relative w-full">
            {/* Search Icon */}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            {/* Search Input */}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input pl-12 pr-12"
            />

            {/* Clear Button */}
            {value && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Clear search"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
