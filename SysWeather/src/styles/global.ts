import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { metrics } from './metrics';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: metrics.padding
  },
  title: {
    fontSize: fonts.size.title,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.black
  }
});
