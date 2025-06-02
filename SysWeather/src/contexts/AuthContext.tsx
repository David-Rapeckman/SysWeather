import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  city: string;
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // fake sign in (sempre aceita qualquer usuário)
  const signIn = async (email: string, password: string) => {
    const fakeUser: User = {
      id: 1,
      name: "Usuário Teste",
      email,
      role: "user",
      city: "São Paulo"
    };
    setUser(fakeUser);
    await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@user");
  };

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("@user");
      if (data) setUser(JSON.parse(data));
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token: null, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return ctx;
};
