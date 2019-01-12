import axios from 'axios';
import { API_INDEX } from '../settings';
import { AsyncStorage } from 'react-native';

axios.defaults.baseURL = API_INDEX;

axios.interceptors.request.use((config) => {
  const newConfig = config;
  return AsyncStorage.getItem('token').then((token) => {
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  });
  
});

export default axios;
