// /src/types/auth.ts

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  city: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, city: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Roteiro de parâmetros de navegação para CityAlerts e CityDetails
export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainApp: undefined; // TabNavigator
  Home: undefined;
  CitiesList: undefined;
  CityAlerts: { cityId: number };
  CityDetails: { cityId: number };
};
