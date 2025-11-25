import React from 'react';
import { Filter, X } from 'lucide-react';
import { FILTER_OPTIONS, PRIORITY_LEVELS } from '../../utils/constants';

/**
 * Filter Bar Component
 * Provides filtering controls for task status and priority
 * 
 * @param {string} statusFilter - Current status filter
 * @param {string} priorityFilter - Current priority filter
 * @param {function} onStatusChange - Handler for status filter changes
 * @param {function} onPriorityChange - Handler for priority filter changes
 * @param {function} onClearFilters - Handler to clear all filters
 */
const FilterBar = ({
    statusFilter,
    priorityFilter,
    onStatusChange,
    onPriorityChange,
    onClearFilters,
}) => {
    const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all';

    return (
        <div className="flex flex-wrap items-center gap-4">
            {/* Filter Icon & Label */}
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                <Filter className="w-5 h-5" />
                <span>Filters:</span>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onStatusChange(FILTER_OPTIONS.ALL)}
                        className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${statusFilter === FILTER_OPTIONS.ALL
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                            }
            `}
                    >
                        All
                    </button>
                    <button
                        onClick={() => onStatusChange(FILTER_OPTIONS.COMPLETED)}
                        className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${statusFilter === FILTER_OPTIONS.COMPLETED
                                ? 'bg-green-600 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                            }
            `}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => onStatusChange(FILTER_OPTIONS.PENDING)}
                        className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${statusFilter === FILTER_OPTIONS.PENDING
                                ? 'bg-amber-600 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                            }
            `}
                    >
                        Pending
                    </button>
                </div>
            </div>

            {/* Priority Filter Dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Priority:</span>
                <select
                    value={priorityFilter}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    className="input py-2 pr-10 cursor-pointer"
                >
                    <option value="all">All Priorities</option>
                    <option value={PRIORITY_LEVELS.HIGH}>High</option>
                    <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                    <option value={PRIORITY_LEVELS.LOW}>Low</option>
                </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all font-medium text-sm"
                >
                    <X className="w-4 h-4" />
                    Clear Filters
                </button>
            )}
        </div>
    );
};

export default FilterBar;
