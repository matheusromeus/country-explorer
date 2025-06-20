import FlagSkeleton from "@/components/skeletons/FlagSkeleton";
import CountryInfoSkeleton from "@/components/skeletons/CountryInfoSkeleton";
import LanguagesCardSkeleton from "@/components/skeletons/LanguagesCardSkeleton";
import CurrenciesCardSkeleton from "@/components/skeletons/CurrenciesCardSkeleton";
import InternetDomainCardSkeleton from "@/components/skeletons/InternetDomainCardSkeleton";
import QuickFactsCardSkeleton from "@/components/skeletons/QuickFactsCardSkeleton";
import BorderCountriesCardSkeleton from "@/components/skeletons/BorderCountriesCardSkeleton";
import FooterSkeleton from "@/components/skeletons/FooterSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen relative bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Flag skeleton */}
            <FlagSkeleton />

            {/* Country info skeleton */}
            <CountryInfoSkeleton />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {/* Languages card skeleton */}
            <LanguagesCardSkeleton />

            {/* Currencies card skeleton */}
            <CurrenciesCardSkeleton />
          </div>

          <div className="space-y-6">
            {/* Internet Domain card skeleton */}
            <InternetDomainCardSkeleton />

            {/* Quick Facts card skeleton */}
            <QuickFactsCardSkeleton />
          </div>
        </div>

        {/* Border countries skeleton */}
        <BorderCountriesCardSkeleton />
      </div>

      {/* Footer skeleton */}
      <FooterSkeleton />
    </div>
  );
}
