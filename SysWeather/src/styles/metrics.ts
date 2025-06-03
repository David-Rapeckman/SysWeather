// /src/styles/metrics.ts
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  padding: 20,
  radius: 10
};
