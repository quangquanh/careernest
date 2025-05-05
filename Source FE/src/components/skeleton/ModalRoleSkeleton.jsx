import React from 'react';

const ModalRoleSkeleton = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[600px]">
                {/* Tiêu đề */}
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>

                {/* Input tên role */}
                <div className="mb-4">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Input miêu tả */}
                <div className="mb-4">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Quyền hạn */}
                <div className="mb-4">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Trạng thái */}
                <div className="flex items-center mb-4">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="ml-auto h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                {/* Button */}
                <div className="flex justify-end">
                    <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default ModalRoleSkeleton;