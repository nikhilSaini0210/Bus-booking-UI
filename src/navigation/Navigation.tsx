import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/NavigationUtils';
import {ROUTES} from './Routes';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BusListScreen from '../screens/BusListScreen';
import SeatSelection from '../screens/SeatSelection';

const Stack = createNativeStackNavigator();

// const SplashScreenWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <SplashScreen />
//   </>
// );

// const ProductDashboardWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <ProductDashboard />
//   </>
// );

// const ProductCategoriesWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <ProductCategories />
//   </>
// );

// const ProductOrderWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <ProductOrder />
//   </>
// );

// const DeliveryLoginWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <DeliveryLogin />
//   </>
// );

// const CustomerLoginWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <CustomerLogin />
//   </>
// );

// const DeliveryDashboardWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <DeliveryDashboard />
//   </>
// );

// const OrderSuccessWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <OrderSuccess />
//   </>
// );

// const LiveTrackingWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <LiveTracking />
//   </>
// );

// const ProfileWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <Profile />
//   </>
// );

// const DeliveryMapWithStatusBar: FC = () => (
//   <>
//     <CustomStatusBar />
//     <DeliveryMap />
//   </>
// );

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ROUTES.SPLASH}>
        <Stack.Screen
          name={ROUTES.SPLASH}
          component={SplashScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name={ROUTES.HOME}
          component={HomeScreen}
        />
        <Stack.Screen name={ROUTES.BUSLIST} component={BusListScreen} />
        <Stack.Screen name={ROUTES.SEATSELECTION} component={SeatSelection} />
        {/* <Stack.Screen
          name={ROUTES.PRODUCTCATEGORIES}
          component={ProductCategoriesWithStatusBar}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.PRODUCTORDER}
          component={ProductOrderWithStatusBar}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.ORDERSUCCESS}
          component={OrderSuccessWithStatusBar}
        /> */}
        {/* <Stack.Screen
          name={ROUTES.LIVETRACKING}
          component={LiveTrackingWithStatusBar}
        /> */}
        {/* <Stack.Screen name={ROUTES.PROFILE} component={ProfileWithStatusBar} /> */}
        {/* <Stack.Screen
          name={ROUTES.DELIVERYMAP}
          component={DeliveryMapWithStatusBar}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
