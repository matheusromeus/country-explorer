import { fetchCountries } from "@/lib/dal";
import { Country } from "@/types/countries";
import { DataTable } from "./data-table";

const Countries = async () => {
  const countries: Country[] = await fetchCountries();
  return (
    <div className="p-10">
      <DataTable countries={countries} />
    </div>
  );
};

export default Countries;
