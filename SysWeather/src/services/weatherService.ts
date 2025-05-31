import axios from 'axios';

export const weatherService = axios.create({
  baseURL: 'http://localhost:3000'
});
