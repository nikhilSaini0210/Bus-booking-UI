import axios from 'axios';
import {BASE_URL} from './config';
import {getAccessToken, getRefreshToken, setAccessToken} from './storage';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  async config => {
    const tokem = getAccessToken();
    if (tokem) {
      config.headers.Authorization = `Bearer ${tokem}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 403) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const {data} = await axios.post(`${BASE_URL}/api/user/refresh`, {
          refreshToken: refreshToken,
        });
        setAccessToken(data?.accessToken);
        error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
