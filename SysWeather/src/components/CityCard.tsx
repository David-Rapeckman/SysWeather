import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { metrics } from '@styles/metrics';

interface CityCardProps {
  id: number;
  name: string;
  onPress: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ name, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },
  name: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    color: colors.primary
  }
});

export default CityCard;
