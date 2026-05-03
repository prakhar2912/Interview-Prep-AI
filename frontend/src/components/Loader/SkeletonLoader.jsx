import React from "react";

const SkeletonLoader = () => {
  return (
    <div role="status" className="animate-pulse max-w-3xl mx-auto space-y-6">

      {/* Title */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10/12"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-9/12"></div>
      </div>

      {/* Code Block Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
        <div className="h-2.5 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Second Section */}
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-6"></div>

      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10/12"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-9/12"></div>
      </div>

    </div>
  );
};

export default SkeletonLoader;