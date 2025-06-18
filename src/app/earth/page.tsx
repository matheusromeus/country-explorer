"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, startTransition } from "react";
import { useRouter } from "next/navigation";

// @ts-ignore
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type CountryFeature = {
  type: "Feature";
  properties: {
    ADMIN: string;
    ISO_A2: string;
    POP_EST: number;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
};

export default function EarthPage() {
  const router = useRouter();
  const globeRef = useRef<any>(null);
  const [features, setFeatures] = useState<CountryFeature[]>([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2,latlng"
    )
      .then((res) => res.json())
      .then((data) => {
        const features: CountryFeature[] = data.map((country: any) => ({
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
        setFeatures(features);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Globe
        ref={globeRef}
        globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"
        pointsData={features}
        pointLat={(d: any) => d.geometry.coordinates[1]}
        pointLng={(d: any) => d.geometry.coordinates[0]}
        pointAltitude={0.01}
        pointColor={() => "orange"}
        pointLabel={(d: any) => `
    <div>
      <div><b>${d.properties.ADMIN} (${d.properties.ISO_A2})</b></div>
      <div>Population: <i>${d.properties.POP_EST}</i></div>
    </div>
  `}
        onPointClick={(d: any) => {
          if (d?.geometry?.coordinates) {
            const cameraState = globeRef.current.pointOfView();
            globeRef.current.pointOfView(
              {
                lat: d.geometry.coordinates[1],
                lng: d.geometry.coordinates[0],
                altitude: 1.5,
              },
              1500
            );
            setTimeout(() => {
              startTransition(() => {
                const params = new URLSearchParams({
                  lat: cameraState.lat,
                  lng: cameraState.lng,
                  altitude: cameraState.altitude,
                });
                router.push(
                  `/country/${d.properties.ISO_A2}?${params.toString()}`
                );
              });
            }, 1600);
          }
        }}
      />
    </div>
  );
}
