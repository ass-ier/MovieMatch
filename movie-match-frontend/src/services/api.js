import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// You may need to use a library like react-native-dotenv or expo-constants for env vars
const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api; 