import { fetchCountryByCode, fetchBorderCountries } from "@/lib/dal";
import { CountryDetail } from "@/types/countries";
import Link from "next/link";
import FavoriteButton from "@/components/buttons/favourite";

type Props = { params: Promise<{ code: string }> };

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const country: CountryDetail = await fetchCountryByCode(code);

  let borderCountries: { cca2: string; name: { common: string } }[] = [];
  if (country.borders?.length) {
    borderCountries = await fetchBorderCountries(country.borders);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{country.name.common}</h1>
      <p className="text-lg">{country.region}</p>
      <p className="text-lg">{country.subregion}</p>
      <p className="text-lg">{country.capital}</p>
      <p className="text-lg">{country.tld}</p>
      <p className="text-lg">
        {Object.values(country.currencies || {})
          .map((c: { name: string }) => c.name)
          .join(", ")}
      </p>
      <p className="text-lg">
        {Object.values(country.languages || {}).join(", ")}
      </p>

      <div className="flex flex-wrap gap-2">
        {borderCountries.map((border) => (
          <Link
            key={border.cca2}
            prefetch={true}
            href={`/country/${border.cca2}`}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            {border.name.common}
          </Link>
        ))}
      </div>
      <FavoriteButton code={country.cca2} />
    </div>
  );
}
