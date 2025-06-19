import { fetchCountryByCode, fetchBorderCountries } from "@/lib/dal";
import { CountryDetail } from "@/types/countries";
import Link from "next/link";
import FavoriteButton from "@/components/buttons/favourite";
import Image from "next/image";

type Props = { params: Promise<{ code: string }> };

export default async function CountryPage({ params }: Props) {
  const { code } = await params;
  const country: CountryDetail = await fetchCountryByCode(code);

  let borderCountries: { cca2: string; name: { common: string } }[] = [];
  if (country.borders?.length) {
    borderCountries = await fetchBorderCountries(country.borders);
  }

  return (
    // <div className="p-6 max-w-4xl mx-auto space-y-6">
    //   <h1 className="text-3xl font-bold">{country.name.common}</h1>
    //   <p className="text-lg">{country.region}</p>
    //   <p className="text-lg">{country.subregion}</p>
    //   <p className="text-lg">{country.capital}</p>
    //   <p className="text-lg">{country.tld}</p>
    //   <p className="text-lg">
    //     {Object.values(country.currencies || {})
    //       .map((c: { name: string }) => c.name)
    //       .join(", ")}
    //   </p>
    //   <p className="text-lg">
    //     {Object.values(country.languages || {}).join(", ")}
    //   </p>

    //   <div className="flex flex-wrap gap-2">
    //     {borderCountries.map((border) => (
    //       <Link
    //         key={border.cca2}
    //         prefetch={true}
    //         href={`/country/${border.cca2}`}
    //         className="bg-blue-500 text-white p-2 rounded-md"
    //       >
    //         {border.name.common}
    //       </Link>
    //     ))}
    //   </div>
    //   <FavoriteButton code={country.cca2} />
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900">
      {/* Navigation */}
      <nav className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-b border-white/20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 text-gray-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span className="font-medium">Back to Explorer</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/favorites"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              ✨ My Bucket List
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section with Flag */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Flag */}
            <div className="relative">
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              {/* Favorite Button */}
              <div className="absolute top-6 right-6 z-10">
                <FavoriteButton code={country.cca2} />
              </div>
            </div>

            {/* Country Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {country.name.common}
                </h1>
                {/* {getNativeName() && getNativeName() !== country.name.common && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    {getNativeName()}
                  </p>
                )} */}
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

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Population
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {country.population}
                      </p>
                    </div>
                  </div>
                </div>

                {country.capital && country.capital.length > 0 && (
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Languages */}
            {/* {getLanguages().length > 0 && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🗣️</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Languages
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getLanguages().map((language, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )} */}
            {country.languages &&
              Object.values(country.languages).map((language) => (
                <div key={language}>
                  <p>{language}</p>
                </div>
              ))}

            {/* Currencies */}
            {/* {getCurrencies().length > 0 && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">💰</span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Currency
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getCurrencies().map((currency, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {currency}
                    </span>
                  ))}
                </div>
              </div>
            )} */}
            {country.currencies &&
              Object.values(country.currencies).map((currency) => (
                <div key={currency.name}>
                  <p>{currency.name}</p>
                </div>
              ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Level Domains */}
            {country.tld && country.tld.length > 0 && (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg">
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
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium font-mono"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info Card */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg">
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
                    {country.population}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Border Countries */}
        {borderCountries.length > 0 && (
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🗺️</span>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Neighboring Countries
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {borderCountries.map((border) => (
                <Link
                  key={border.cca2}
                  href={`/country/${border.cca2}`}
                  className="group bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-4 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="text-2xl mb-2">🏁</div>
                  <div className="text-sm font-medium">
                    {border.name.common}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Plan Your Adventure</h3>
            <p className="text-xl mb-6 text-emerald-100">
              Ready to explore {country.name.common}? Start planning your
              journey today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/favorites"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 backdrop-blur-sm"
              >
                ✨ View My Bucket List
              </Link>
              <Link
                href="/"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 backdrop-blur-sm"
              >
                🌍 Explore More Countries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
