"use client";

import { useFavorites } from "@/atoms/favoritesAtoms";
import { useEffect, useState } from "react";
import { fetchCountriesByCodes } from "@/lib/dal";
import type { Country } from "@/types/countries";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setCountries([]);
      setLoading(false);
      return;
    }

    fetchCountriesByCodes(favorites)
      .then((data) => setCountries(data))
      .finally(() => setLoading(false));
  }, [favorites]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-900 dark:text-gray-100 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
        Loading...
      </div>
    );

  return (
    <div className={`min-h-screen px-4  sm:px-6 lg:px-8 pt-12 sm:pt-16 `}>
      <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[160px] xl:text-[240px] 2xl:text-[320px] font-bold mb-8 sm:mb-12 lg:mb-16 -translate-x-2 sm:-translate-x-4 lg:-translate-x-8 xl:-translate-x-12 2xl:-translate-x-20 overflow-hidden text-black dark:text-gray-100">
        FAVORITES
      </h1>
      {countries.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 lg:py-20">
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-4 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            No favorite countries yet.
          </p>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]">
            Start exploring countries and add them to your favorites!
          </p>
        </div>
      ) : (
        <div className="pb-8 sm:pb-12 lg:pb-16">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
            {countries.map((c) => (
              <Link
                href={`/country/${c.cca2}`}
                className={`flex items-center gap-2 sm:gap-3 hover:opacity-70 transition-opacity duration-200 hover:underline`}
                key={c.cca2}
                prefetch={true}
              >
                <Image
                  src={c.flags.svg}
                  alt={c.name.common}
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-cover rounded-sm flex-shrink-0 dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]"
                />
                <span className="text-sm sm:text-base font-medium truncate text-gray-900 dark:text-gray-100 dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
                  {c.name.common}
                </span>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
