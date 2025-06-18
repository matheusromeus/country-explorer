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
