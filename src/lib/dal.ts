import { cache } from "react";

export const fetchCountries = cache(async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2",
    {
      next: { revalidate: 86400 }, // 24 hours in seconds
    }
  );
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
});

export const fetchCountryByCode = cache(async (code: string) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca2`,
    {
      next: { revalidate: 86400 }, // 1 day
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch country");
  }

  const data = await res.json();
  return data;
});

export const fetchBorderCountries = cache(async (codes: string[]) => {
  if (!codes.length) return [];

  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codes.join(
      ","
    )}&fields=name,cca2`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch border countries");
  }

  return res.json();
});
