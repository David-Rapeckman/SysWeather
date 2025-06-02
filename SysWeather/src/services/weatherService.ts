// /src/services/weatherService.ts

import axios from 'axios';

export const weatherService = axios.create({
  baseURL: 'http://localhost:3000'
});
