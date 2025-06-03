// /src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, city: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async () => {
    const u = await api.getCurrentUser();
    if (u) setUser(u);
  };

  const signIn = async (email: string, password: string) => {
    const logged = await api.signIn(email.trim(), password);
    setUser(logged);
  };

  const signUp = async (name: string, email: string, password: string, city: string) => {
    const created = await api.signUp(name.trim(), email.trim(), password, city);
    setUser(created);
  };

  const signOut = async () => {
    await api.signOut();
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return ctx;
};
