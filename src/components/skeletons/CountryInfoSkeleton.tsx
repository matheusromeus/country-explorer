export default function CountryInfoSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        {/* Country name skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-14 md:h-16 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mt-3" />
        </div>
        {/* Native names skeleton */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>
        {/* Region skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
