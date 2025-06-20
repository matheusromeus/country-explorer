export default function Loading() {
  return (
    <div className="min-h-screen relative bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Flag skeleton */}
            <div className="relative">
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>

            {/* Country info skeleton */}
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
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {/* Languages card skeleton */}
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Currencies card skeleton */}
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Internet Domain card skeleton */}
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Quick Facts card skeleton */}
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Border countries skeleton */}
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-lg p-4 rounded-2xl border border-white/30 dark:border-white/20"
              >
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
}
