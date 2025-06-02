// /src/components/CityCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CityWithWeather } from '../types/city';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { metrics } from '@styles/metrics';

interface CityCardProps {
  city: CityWithWeather;
  onPress: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onPress }) => {
  const selecionarIcone = () => {
    const cond = city.currentCondition.toLowerCase();
    if (cond.includes('rain')) return require('../../assets/icons/rain.png');
    if (cond.includes('thunderstorm')) return require('../../assets/icons/thunderstorm.png');
    return require('../../assets/icons/clear.png');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.name}>{city.name}</Text>
        <Text style={styles.temp}>{Math.round(city.currentTemp)}°</Text>
      </View>
      <Image source={selecionarIcone()} style={styles.icon} />
      <Text style={styles.condition}>{city.currentCondition}</Text>
      <View style={styles.separator} />
      <Text style={styles.subtitle}>Prevenções:</Text>
      {city.preventions.map((p, i) => (
        <Text key={i} style={styles.item}>• {p}</Text>
      ))}
      <View style={styles.separator} />
      <Text style={styles.subtitle}>Previsão:</Text>
      <Text style={styles.forecast}>Máx: {Math.round(city.maxTemp)}°  Min: {Math.round(city.minTemp)}°</Text>
      <Text style={styles.forecast}>Chuva: {city.rainChance}%</Text>
    </TouchableOpacity>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333'
  },
  temp: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary
  },
  icon: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    marginVertical: 8
  },
  condition: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#B0BEC5',
    marginVertical: 8
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  item: {
    fontSize: 12,
    color: '#37474F',
    marginLeft: 4,
    marginBottom: 2
  },
  forecast: {
    fontSize: 12,
    color: '#546E7A',
    marginBottom: 2,
    marginLeft: 4
  }
});
