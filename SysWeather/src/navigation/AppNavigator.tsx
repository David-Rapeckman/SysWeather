import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '@screens/Auth/SignInScreen';
import SignUpScreen from '@screens/Auth/SignUpScreen';
import SplashScreen from '@screens/Auth/SplashScreen';
import TabNavigator from './TabNavigator';
import { useAuth } from '@contexts/AuthContext';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
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
        <Stack.Screen name="MainApp" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
