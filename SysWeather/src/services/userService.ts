// /src/services/userService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthdate: string;
  role: 'admin' | 'user';
  city: string;
  phone?: string;
  gender?: string;
}

const STORAGE_KEY_USERS = '@sysweather:users';

export const listarUsuariosCadastrados = async (): Promise<User[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY_USERS);
  if (!json) return [];
  try {
    const arr: User[] = JSON.parse(json);
    return arr;
  } catch {
    return [];
  }
};

export const salvarUsuario = async (usuario: User): Promise<void> => {
  const todos = await listarUsuariosCadastrados();
  todos.push(usuario);
  await AsyncStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(todos));
};
