export interface City {
  id: number;
  name: string;
}

export interface CityWithWeather {
  id: number;
  name: string;
  currentTemp: number;
  currentCondition: string;
  
  mainCondition: string;
  maxTemp: number;
  minTemp: number;
  rainChance: number;
  preventions: string[];
}
