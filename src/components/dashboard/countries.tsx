import { fetchCountries } from "@/lib/dal";
import { Country } from "@/types/countries";
import CountryList from "./country-list";

const Countries = async () => {
  const countries: Country[] = await fetchCountries();
  return <CountryList countries={countries} />;
};

export default Countries;
