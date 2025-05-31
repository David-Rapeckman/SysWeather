// /src/contexts/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { User } from '../types/auth';

// Definição explícita do formato de retorno da API de autenticação
interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    const storedUserJson = await AsyncStorage.getItem('@sysweather:user');
    if (storedUserJson) {
      const parsed: User = JSON.parse(storedUserJson);
      setUser(parsed);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Forçar axios a entender que o response.data será AuthResponse
    const response = await axios.post<AuthResponse>('http://localhost:3000/auth/signin', {
      email,
      password,
    });

    const { user: loggedUser, token } = response.data;
    await AsyncStorage.setItem('@sysweather:user', JSON.stringify(loggedUser));
    await AsyncStorage.setItem('@sysweather:token', token);
    setUser(loggedUser);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@sysweather:user');
    await AsyncStorage.removeItem('@sysweather:token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
