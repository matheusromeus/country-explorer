import { fetchCountries } from "@/lib/dal";
import { Country } from "@/types/countries";
import { DataTable } from "./data-table";

const Countries = async () => {
  try {
    const countries: Country[] = await fetchCountries();
    return (
      <div className="p-10">
        <DataTable countries={countries} />
      </div>
    );
  } catch (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        Failed to load countries. Please try again later.
      </div>
    );
  }
};

export default Countries;
