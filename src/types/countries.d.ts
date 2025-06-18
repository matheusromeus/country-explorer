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
