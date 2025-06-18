import React from "react";
import CountryGlobe from "@/components/CountryGlobe";

async function fetchCountries() {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2,latlng",
    { cache: "force-cache" }
  );
  const data = await res.json();
  return data.map((country: any) => ({
    type: "Feature",
    properties: {
      ADMIN: country.name?.common || "Unknown",
      ISO_A2: country.cca2 || "--",
      POP_EST: country.population || 0,
    },
    geometry: {
      type: "Point",
      coordinates: country.latlng
        ? [country.latlng[1], country.latlng[0]]
        : [0, 0],
    },
  }));
}

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const features = await fetchCountries();
  const focusCountry = features.find(
    (f: any) => f.properties.ISO_A2.toLowerCase() === params.id.toLowerCase()
  );

  let initialCamera = undefined;
  if (
    searchParams &&
    searchParams.lat &&
    searchParams.lng &&
    searchParams.altitude
  ) {
    initialCamera = {
      lat: Number(searchParams.lat),
      lng: Number(searchParams.lng),
      altitude: Number(searchParams.altitude),
    };
  }

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <CountryGlobe
        features={features}
        focusCountry={focusCountry}
        initialCamera={initialCamera}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#fff",
          background: "rgba(0,0,0,0.5)",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <h2>
          {focusCountry?.properties.ADMIN} ({focusCountry?.properties.ISO_A2})
        </h2>
        <p>Population: {focusCountry?.properties.POP_EST?.toLocaleString()}</p>
        {/* Add more country info here if desired */}
      </div>
    </div>
  );
};

export default Page;
