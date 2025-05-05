import React from 'react';

const JobCardSkeleton = () => {
    return (
        <div className="w-[350px] bg-gray-300 dark:bg-gray-800 dark:border dark:border-gray-600 p-4 rounded-lg animate-pulse text-white flex gap-4 min-w-full sm:min-w-0">
            {/* LEFT SIDE: Logo + Location */}
            <div className="flex flex-col items-center">
                {/* Logo Skeleton */}
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>

                {/* Location Button Skeleton */}
                <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            {/* RIGHT SIDE: Job Info */}
            <div className="flex-1 space-y-2">
                {/* Job Title */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

                {/* Company Name */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>

                {/* Created Date */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>

                {/* Salary */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>

                {/* Remote Work */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-4"></div>
            </div>
        </div>
    );
};

export default JobCardSkeleton;