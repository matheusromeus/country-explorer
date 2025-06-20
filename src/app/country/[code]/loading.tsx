import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex flex-col gap-4 justify-center items-center min-h-screen">
      <Loader2 className="w-12 h-12 animate-spin" />
      <p className="text-lg text-gray-900 dark:text-gray-100">
        What a beautiful country!
      </p>
    </div>
  );
}
