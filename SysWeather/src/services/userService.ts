// /src/services/userService.ts

import axios from 'axios';

export const userService = axios.create({
  baseURL: 'http://localhost:3000/auth'
});
