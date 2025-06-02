// /src/components/Button.tsx

import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { metrics } from '@styles/metrics';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => (
  <TouchableOpacity style={styles.button} activeOpacity={0.8} {...rest}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: metrics.radius,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: 'bold'
  }
});

export default Button;
