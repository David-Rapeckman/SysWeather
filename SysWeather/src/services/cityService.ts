// /src/services/cityService.ts

import axios from 'axios';

export const cityService = axios.create({
  baseURL: 'http://localhost:3000'
});
