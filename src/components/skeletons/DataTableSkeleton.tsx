export default function DataTableSkeleton() {
  return (
    <div className="w-full p-5 border rounded-lg">
      {/* Filter controls skeleton */}
      <div className="flex items-center py-4 gap-4">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ml-auto" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-md">
        <div className="border border-gray-200 dark:border-gray-700 rounded-md">
          {/* Table header skeleton */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex">
              <div className="flex-1 px-6 py-3">
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-[150px] px-6 py-3">
                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-[150px] px-6 py-3">
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-[150px] px-6 py-3">
                <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-[100px] px-6 py-3">
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
              </div>
            </div>
          </div>

          {/* Table body skeleton - showing 10 skeleton rows */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex items-center">
                {/* Country column */}
                <div className="flex-1 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded-sm animate-pulse" />
                    <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>

                {/* Region column */}
                <div className="w-[150px] px-6 py-4">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Population column */}
                <div className="w-[150px] px-6 py-4">
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Capital column */}
                <div className="w-[150px] px-6 py-4">
                  <div className="h-5 w-18 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Favorite column */}
                <div className="w-[100px] px-6 py-4">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-x-2 flex">
          <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
