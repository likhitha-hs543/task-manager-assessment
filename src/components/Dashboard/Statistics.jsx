import React from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { calculateStats } from '../../utils/helpers';

/**
 * Statistics Component
 * Displays task statistics and productivity insights
 * 
 * @param {Array} tasks - Array of all tasks
 */
const Statistics = ({ tasks }) => {
    const stats = calculateStats(tasks);

    const statCards = [
        {
            title: 'Total Tasks',
            value: stats.total,
            icon: TrendingUp,
            color: 'bg-blue-50 dark:bg-blue-900/20',
            iconColor: 'text-blue-600 dark:text-blue-400',
            borderColor: 'border-blue-200 dark:border-blue-800',
        },
        {
            title: 'Completed',
            value: stats.completed,
            icon: CheckCircle2,
            color: 'bg-green-50 dark:bg-green-900/20',
            iconColor: 'text-green-600 dark:text-green-400',
            borderColor: 'border-green-200 dark:border-green-800',
        },
        {
            title: 'Pending',
            value: stats.pending,
            icon: Clock,
            color: 'bg-amber-50 dark:bg-amber-900/20',
            iconColor: 'text-amber-600 dark:text-amber-400',
            borderColor: 'border-amber-200 dark:border-amber-800',
        },
        {
            title: 'Overdue',
            value: stats.overdue,
            icon: AlertCircle,
            color: 'bg-red-50 dark:bg-red-900/20',
            iconColor: 'text-red-600 dark:text-red-400',
            borderColor: 'border-red-200 dark:border-red-800',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.title}
                        className={`
              card p-6 ${stat.color} ${stat.borderColor} border-l-4
              hover:shadow-xl transition-all duration-300
            `}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    {stat.title}
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Completion Rate Card (Full Width) */}
            <div className="col-span-full card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Completion Rate
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {stats.completionRate}%
                        </p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${stats.completionRate}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
