"use client";

import { useState, useMemo } from "react";
import { Country } from "@/types/countries";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../buttons/favourite";

type Props = { countries: Country[] };

export default function CountryList({ countries }: Props) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = region ? c.region === region : true;
      return matchesSearch && matchesRegion;
    });
  }, [search, region, countries]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((country) => (
          <Link
            key={country.cca2}
            href={`/country/${country.cca2}`}
            className="flex items-center gap-2 hover:underline p-2 rounded-md"
          >
            <Image
              loading="lazy"
              src={country.flags.svg}
              alt={country.name.common}
              width={20}
              height={20}
            />
            <h2>{country.name.common}</h2>
            <FavoriteButton code={country.cca2} />
          </Link>
        ))}
      </div>
    </div>
  );
}
