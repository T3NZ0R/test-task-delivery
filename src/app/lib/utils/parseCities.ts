import { ICity } from "country-state-city";

export const parseCities = (cities: ICity[]) => {
  return [...new Set(cities.map((city) => city.name))].map((city) => {
    return { label: city };
  });
};
