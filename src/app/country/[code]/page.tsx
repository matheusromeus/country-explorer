import { fetchCountryByCode, fetchBorderCountries } from "@/lib/dal";
import { CountryDetail } from "@/types/countries";
import Link from "next/link";
import FavoriteButton from "@/components/buttons/favourite";
import Image from "next/image";

type Props = { params: Promise<{ code: string }> };

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const country: CountryDetail = await fetchCountryByCode(code);

  let borderCountries: {
    cca2: string;
    name: { common: string };
    flags: { svg: string };
  }[] = [];
  if (country.borders?.length) {
    borderCountries = await fetchBorderCountries(country.borders);
  }

  // Extract official native names
  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName)
        .map((name: any) => name.official)
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen relative bg-white dark:bg-background">
      {/* Dynamic Island Glass Pane Navigation */}
      {/* <div className=" max-w-4xl absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center justify-between space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-200 transition-all duration-200 hover:scale-105"
            >
              <span className="text-xl">←</span>
              <span className="font-medium text-sm">Back</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center space-x-2 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-200 transition-all duration-200 hover:scale-105"
            >
              <span className="text-sm">✨</span>
              <span className="font-medium text-sm">Bucket List</span>
            </Link>
          </div>
        </nav>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-5xl flex items-center gap-2 md:text-6xl font-bold mb-2 text-black dark:text-white">
                  {country.name.common}
                  <div className="mt-3">
                    <FavoriteButton code={country.cca2} />
                  </div>
                </h1>
                {nativeNames.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {nativeNames.map((name, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-lg text-gray-600 dark:text-gray-300">
                  <span className="text-2xl">📍</span>
                  <span>{country.region}</span>
                  {country.subregion && (
                    <>
                      <span>•</span>
                      <span>{country.subregion}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Population
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                </div>

                {country.capital && country.capital.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Capital
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {country.capital.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {country.languages && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🗣️</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Languages
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(country.languages).map((language) => (
                    <span
                      key={language}
                      className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.currencies && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">💰</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Currencies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(country.currencies).map((currency) => (
                    <span
                      key={currency.name}
                      className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {currency.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {country.tld && country.tld.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🌐</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Internet Domain
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {country.tld.map((domain, index) => (
                    <span
                      key={index}
                      className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium font-mono"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">📊</span>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Quick Facts
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Region
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {country.region}
                  </span>
                </div>
                {country.subregion && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      Subregion
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {country.subregion}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Population
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {country.population.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {borderCountries.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🗺️</span>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Nearby Countries
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {borderCountries.map((border) => (
                <Link
                  key={border.cca2}
                  href={`/country/${border.cca2}`}
                  className="group flex flex-col items-center gap-3 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black p-4 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Image
                    src={border.flags.svg}
                    alt={`Flag of ${border.name.common}`}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  <div className="text-sm font-medium">
                    {border.name.common}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
