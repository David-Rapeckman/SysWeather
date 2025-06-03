// /src/components/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { metrics } from '@styles/metrics';

const Input: React.FC<TextInputProps> = (props) => (
  <TextInput
    style={styles.input}
    placeholderTextColor={colors.gray}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: metrics.radius,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    color: colors.white,
    fontSize: fonts.size.medium,
    marginBottom: 12
  }
});

export default Input;
