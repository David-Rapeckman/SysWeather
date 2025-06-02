// /src/navigation/AppNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/Auth/SplashScreen';
import SignInScreen from '@screens/Auth/SignInScreen';
import SignUpScreen from '@screens/Auth/SignUpScreen';
import TabNavigator from './TabNavigator';
import CityAlertsScreen from '@screens/Cities/CityAlertsScreen';
import CityDetails from '@screens/Cities/CityDetails';
import { useAuth } from '@contexts/AuthContext';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;                     // TabNavigator
  CityAlerts: { cityId: number };      // precisa existir assim
  CityDetails: { cityId: number };     // também
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="CityAlerts" component={CityAlertsScreen} />
          <Stack.Screen name="CityDetails" component={CityDetails} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
