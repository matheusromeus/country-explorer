import { fetchCountries } from "@/lib/dal";
import { Country } from "@/types/countries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Countries = async () => {
  const countries: Country[] = await fetchCountries();

  return (
    <div className="flex flex-col gap-2">
      {countries.map((country) => (
        <Link
          key={country.cca2}
          href={`/country/${country.cca2}`}
          className="flex items-center gap-2 hover:underline p-2 rounded-md"
        >
          <Image
            src={country.flags.svg}
            alt={country.name.common}
            width={20}
            height={20}
          />
          <h2>{country.name.common}</h2>
        </Link>
      ))}
    </div>
  );
};

export default Countries;
