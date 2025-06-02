import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/animations/weather-splash.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E88E5', justifyContent: 'center', alignItems: 'center' },
  animation: { width: 250, height: 250 }
});

export default SplashScreen;
