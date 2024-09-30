import { useCallback, useMemo } from "react";
import { City } from "country-state-city";
import { parseCities } from "../../lib/utils/parseCities";

export function useGetCities() {
  const getCities = useCallback( () => {
    try {
      return parseCities(City.getCitiesOfCountry("UA") || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return useMemo(() => ({ getCities }), [getCities]);
}
