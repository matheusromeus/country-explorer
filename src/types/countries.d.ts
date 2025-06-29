export type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    png?: string;
    alt?: string;
  };
  population: number;
  region: string;
  capital?: string[];
  cca2: string;
};

export type CountryDetail = {
  cca2: string;
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  name: {
    common: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  unMember: boolean;
};
