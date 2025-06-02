// /src/types/city.ts

export interface CityWithWeather {
  id: number;
  name: string;
  currentTemp: number;
  currentCondition: string;
  maxTemp: number;
  minTemp: number;
  rainChance: number;
  preventions: string[];
}

export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
