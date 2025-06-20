import { fetchCountryByCode } from "@/lib/dal";
import { CountryDetail } from "@/types/countries";
import Link from "next/link";
import FavoriteButton from "@/components/buttons/favourite";
import Image from "next/image";
import Footer from "@/components/dashboard/footer";
import { Suspense } from "react";
import BorderCountries from "@/components/country/BorderCountries";
import BorderCountriesSkeleton from "@/components/skeletons/BorderCountriesSkeleton";

type Props = { params: Promise<{ code: string }> };

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const country: CountryDetail | null = await fetchCountryByCode(code);

  // Handle case when country data couldn't be fetched
  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-background">
        <div className="text-center space-y-4">
          <div className="text-6xl">🌍</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Country Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sorry, we couldn&apos;t find information for country code &quot;
            {code}&quot;.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This might be due to a network issue or invalid country code.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Extract official native names
  const nativeNames = country.name?.nativeName
    ? Object.values(country.name.nativeName)
        .map((name: { official: string; common: string }) => name.official)
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen relative bg-white dark:bg-background">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {country.languages && (
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20">
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
                      className="bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-black dark:hover:bg-white transition-all duration-200"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {country.currencies && (
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20">
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
                      className="bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-black dark:hover:bg-white transition-all duration-200"
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
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20">
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
                      className="bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium font-mono shadow-lg hover:bg-black dark:hover:bg-white transition-all duration-200"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/20">
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

        {country.borders && country.borders.length > 0 && (
          <Suspense fallback={<BorderCountriesSkeleton />}>
            <BorderCountries borders={country.borders} />
          </Suspense>
        )}
      </div>
      <Footer />
    </div>
  );
}
