// /src/types/auth.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  city: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainApp: undefined;
  Home: undefined;
  CityAlerts: undefined;
};
