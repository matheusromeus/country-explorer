"use client";

import { useFavorites } from "@/atoms/favoritesAtoms";
import { useEffect, useState } from "react";
import { fetchCountriesByCodes } from "@/lib/dal";
import type { Country } from "@/types/countries";

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {countries.length === 0 ? (
        <p>No favorite countries yet.</p>
      ) : (
        <ul className="space-y-2">
          {countries.map((c) => (
            <li key={c.cca2}>{c.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
