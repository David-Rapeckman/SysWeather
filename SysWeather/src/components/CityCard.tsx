// /src/components/CityCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CityWithWeather } from '../types/city';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface CityCardProps {
  city: CityWithWeather;
  onPress: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onPress }) => {
  /**
   * Seleciona o ícone local baseado em city.mainCondition.
   * Espera valores como “rain”, “thunderstorm”, “snow”, “clear”, “clouds”, “mist”, “fog”.
   */
  const selecionarIcone = () => {
    switch (city.mainCondition) {
      case 'rain':
        return require('../../assets/icons/rain.png');
      case 'thunderstorm':
        return require('../../assets/icons/thunderstorm.png');
      case 'snow':
        return require('../../assets/icons/snow.png');
      case 'drizzle':
        return require('../../assets/icons/drizzle.png');
      case 'mist':
      case 'fog':
        return require('../../assets/icons/fog.png');
      case 'clouds':
        // Se quiser um ícone específico de nuvens, crie “clouds.png”. Aqui usamos o mist/fog de fallback:
        return require('../../assets/icons/mist.png');
      case 'clear':
        return require('../../assets/icons/clear.png');
      default:
        // Caso seja alguma condição não prevista, exibe o logo genérico:
        return require('../../assets/logo-weather.png');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.temp}>{Math.round(city.currentTemp)}°C</Text>
      </View>

      <Image source={selecionarIcone()} style={styles.icon} />

      <Text style={styles.condition}>{city.currentCondition}</Text>
      <View style={styles.separator} />

      <Text style={styles.subtitle}>Prevenções:</Text>
      {city.preventions.map((p, i) => (
        <Text key={i} style={styles.item}>• {p}</Text>
      ))}

      <View style={styles.separator} />
      <Text style={styles.subtitle}>
        Mín: {Math.round(city.minTemp)}°C   Máx: {Math.round(city.maxTemp)}°C
      </Text>
      <Text style={styles.subtitle}>Chuva: {city.rainChance}%</Text>
    </TouchableOpacity>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  card: {
    width: 260,                // largura fixa de 260 (antes usava metrics.cardWidth)
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 8,
    // sombra leve iOS:
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    // sombra Android:
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  temp: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  icon: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    marginVertical: 8,
  },
  condition: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  item: {
    fontSize: 12,
    color: '#444',
    marginLeft: 8,
    marginBottom: 2,
  },
});
