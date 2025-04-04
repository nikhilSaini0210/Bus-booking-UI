import {ROUTES} from '../../navigation/Routes';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import apiClient from '../apiClient';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../storage';

export const loginWithGoogle = async (idToken: string) => {
  const {data} = await apiClient.post('api/user/login', {
    id_token: idToken,
  });

  setAccessToken(data?.accessToken);
  setRefreshToken(data?.refreshToken);
  return data?.user;
};

export const logout = async () => {
  removeAccessToken();
  removeRefreshToken();
  resetAndNavigate(ROUTES.LOGIN);
};

export const refresh_Tokens = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const {data} = await apiClient.post('api/user/refresh', {
      refreshToken: refreshToken,
    });
    if (data?.accessToken) {
      setAccessToken(data?.accessToken);
      return true;
    } else {
      throw new Error('Invalid Refresh response');
    }
  } catch (error) {
    console.error('Token refeesh failed: ', error);
    logout();
    return false;
  }
};
