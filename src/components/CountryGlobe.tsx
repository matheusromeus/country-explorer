"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";

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
    coordinates: [number, number];
  };
};

type Props = {
  features: CountryFeature[];
  focusCountry?: CountryFeature;
  initialCamera?: { lat: number; lng: number; altitude: number };
};

export default function CountryGlobe({
  features,
  focusCountry,
  initialCamera,
}: Props) {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (initialCamera && globeRef.current) {
      globeRef.current.pointOfView(initialCamera, 0); // Instantly set to previous camera
    }
  }, [initialCamera]);

  useEffect(() => {
    if (focusCountry && globeRef.current) {
      globeRef.current.pointOfView(
        {
          lat: focusCountry.geometry.coordinates[1],
          lng: focusCountry.geometry.coordinates[0],
          altitude: 1.5,
        },
        1500
      );
    }
  }, [focusCountry]);

  return (
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
    />
  );
}
