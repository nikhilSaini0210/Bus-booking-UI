import {Alert, Image, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import {getAccessToken, getRefreshToken} from '../service/storage';
import {resetAndNavigate} from '../utils/NavigationUtils';
import {ROUTES} from '../navigation/Routes';
import {refresh_Tokens} from '../service/requests/auth';

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const tokenCheck = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken() as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate(ROUTES.LOGIN);
        Alert.alert('Session Expired, please login agian.');
        return;
      }

      if (decodedAccessToken?.exp < currentTime) {
        const refreshed = await refresh_Tokens();
        if (!refreshed) {
          Alert.alert('There was an error');
          return;
        }
      }

      resetAndNavigate(ROUTES.HOME);
      return;
    }
    resetAndNavigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View className="flex-1 justify-center bg-white items-center">
      <Image
        source={require('../assets/images/logo_t.png')}
        className="h-[30%] w-[60%]"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
