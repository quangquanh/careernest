import React from "react";

const CompanyCardSkeleton = () => {
    return (
        <div className="w-full bg-gray-300 dark:bg-gray-800 dark:border dark:border-gray-600 p-6 rounded-lg animate-pulse text-white flex flex-col items-center gap-4">
            {/* Logo Company Skeleton */}
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>

            {/* Company Name Skeleton */}
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>

            {/* Tech Stack Skeleton - 6 tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"
                    ></div>
                ))}
            </div>

            {/* Location Skeleton */}
            <div className="flex items-center gap-2 mt-4">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        </div>
    );
};

export default CompanyCardSkeleton;
