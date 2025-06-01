// /src/screens/Auth/SplashScreen.tsx

import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('SignIn');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../../../assets/animations/weather-splash.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
