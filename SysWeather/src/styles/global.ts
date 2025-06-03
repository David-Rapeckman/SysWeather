// /src/styles/global.ts
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { metrics } from './metrics';
import { fonts } from './fonts';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: metrics.padding
  },
  title: {
    fontSize: fonts.size.title,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 20
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.white
  }
});
