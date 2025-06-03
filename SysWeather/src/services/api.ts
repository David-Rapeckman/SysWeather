import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CityWithWeather } from '../types/city';

const USER_KEY = '@sysweather:user';
const CITIES_KEY = '@sysweather:cities';

// Sua API key da OpenWeather
const OPENWEATHER_API_KEY = '287a31ca50264eadd98dd163f23e70e6';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  city: string;
}

export interface City {
  id: number;
  name: string;
}

export const api = {
  // —— Usuário —— //

  signUp: async (
    name: string,
    email: string,
    password: string,
    city: string
  ): Promise<User> => {
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user',
      city
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  signIn: async (email: string, password: string): Promise<User> => {
    // Se for login de admin padrão:
    if (email === 'admin' && password === 'admin123') {
      return {
        id: 0,
        name: 'Administrador',
        email: 'admin',
        password: 'admin123',
        role: 'admin',
        city: ''
      };
    }
    // Caso contrário, busca usuário normal no AsyncStorage
    const storedJson = await AsyncStorage.getItem(USER_KEY);
    if (!storedJson) {
      throw new Error('Nenhuma conta encontrada. Cadastre-se primeiro.');
    }
    const stored = JSON.parse(storedJson) as User;
    if (stored.email !== email || stored.password !== password) {
      throw new Error('E-mail ou senha incorretos.');
    }
    return stored;
  },

  getCurrentUser: async (): Promise<User | null> => {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? (JSON.parse(data) as User) : null;
  },

  signOut: async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_KEY);
  },

  // —— Cidades —— //

  getCities: async (): Promise<City[]> => {
    const data = await AsyncStorage.getItem(CITIES_KEY);
    return data ? (JSON.parse(data) as City[]) : [];
  },

  addCity: async (name: string): Promise<void> => {
    const list = await api.getCities();
    const newCity: City = { id: Date.now(), name };
    list.push(newCity);
    await AsyncStorage.setItem(CITIES_KEY, JSON.stringify(list));
  },

  // —— Clima (OpenWeather) —— //

  /**
   * Retorna um objeto CityWithWeather com dados do tempo para determinada cidade (pelo nome).
   * Faz uma requisição ao endpoint “current weather” da OpenWeather.
   */
  getWeatherForCity: async (cityName: string): Promise<CityWithWeather> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`;

    try {
      const resp = await axios.get<any>(url);
      const data = resp.data;

      const currentTemp: number = data.main.temp;
      const maxTemp: number = data.main.temp_max;
      const minTemp: number = data.main.temp_min;
      const conditionDesc: string = data.weather[0].description;           // ex: “chuva leve”
      const mainCondition: string = data.weather[0].main.toLowerCase();    // ex: “rain”, “clear” etc.

      const preventions: string[] = [];
      if (mainCondition.includes('rain')) {
        preventions.push('Leve um guarda-chuva ou capa de chuva');
        preventions.push('Use calçado antiderrapante');
      } else if (mainCondition.includes('thunderstorm')) {
        preventions.push('Evite áreas abertas e mantenha-se em local seguro');
        preventions.push('Desconecte aparelhos elétricos');
      } else if (mainCondition.includes('drizzle')) {
        preventions.push('Use uma capa leve para chuva');
      } else if (mainCondition.includes('snow')) {
        preventions.push('Use roupas quentes e botas adequadas');
        preventions.push('Cuidado com vias escorregadias');
      } else if (mainCondition.includes('clear')) {
        preventions.push('Use protetor solar');
        preventions.push('Mantenha-se hidratado');
      } else if (mainCondition.includes('clouds')) {
        preventions.push('Leve um agasalho leve');
      } else if (mainCondition.includes('mist') || mainCondition.includes('fog')) {
        preventions.push('Dirija com cuidado em neblina');
      } else {
        preventions.push('Verifique a previsão completa online');
      }

      let rainChance = 0;
      if (data.rain && data.rain['1h']) {
        // a API devolve precipitação em mm; aqui transformamos em % (ex: 0.5 mm/h → 5%)
        rainChance = Math.min(Math.round(data.rain['1h'] * 10), 100);
      }

      return {
        id: Date.now(),
        name: cityName,
        currentTemp,
        currentCondition: conditionDesc,
        mainCondition,   // ← agora retornamos também
        maxTemp,
        minTemp,
        rainChance,
        preventions
      };
    } catch (err) {
      throw new Error('Não foi possível obter dados do clima.');
    }
  }
};
