export default function InternetDomainCardSkeleton() {
  return (
    <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
