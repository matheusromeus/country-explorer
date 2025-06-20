import { fetchBorderCountries } from "@/lib/dal";
import Link from "next/link";
import Image from "next/image";

interface BorderCountry {
  cca2: string;
  name: { common: string };
  flags: { svg: string };
}

interface BorderCountriesProps {
  borders: string[];
}

export default async function BorderCountries({
  borders,
}: BorderCountriesProps) {
  if (!borders.length) return null;

  const borderCountries = await fetchBorderCountries(borders);

  if (!borderCountries.length) return null;

  return (
    <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">🗺️</span>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Nearby Countries
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {borderCountries.map((border: BorderCountry) => (
          <Link
            key={border.cca2}
            href={`/country/${border.cca2}`}
            className="group flex flex-col items-center gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-lg hover:bg-white/30 dark:hover:bg-black/30 text-black dark:text-white p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-white/30 dark:border-white/20"
          >
            <Image
              src={border.flags.svg}
              alt={`Flag of ${border.name.common}`}
              width={50}
              height={50}
              className="object-cover rounded-lg"
            />
            <div className="text-sm font-medium">{border.name.common}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
