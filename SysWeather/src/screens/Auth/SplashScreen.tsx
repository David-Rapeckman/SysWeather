import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/weather-splash.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.8
  }
});
