export default function QuickFactsCardSkeleton() {
  return (
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
  );
}
