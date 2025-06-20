"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Are you sure you are at the right address?</p>
      <Link
        href="/"
        className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
