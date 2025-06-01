// /src/components/CityCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CityWithWeather } from '../types/city';

interface CityCardProps {
  city: CityWithWeather;
  onPress: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onPress }) => {
  const selecionarIcone = () => {
    const cond = city.currentCondition.toLowerCase();
    if (cond.includes('rain')) {
      return require('../../assets/icons/rain.png');
    }
    if (cond.includes('thunderstorm')) {
      return require('../../assets/icons/thunderstorm.png');
    }
    return require('../../assets/icons/clear.png');
  };

  return (
    <TouchableOpacity style={styles.cartao} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cabecalho}>
        <Text style={styles.nome}>{city.name}</Text>
        <Text style={styles.temperatura}>{Math.round(city.currentTemp)}°</Text>
      </View>
      <Image source={selecionarIcone()} style={styles.icone} />
      <Text style={styles.condicao}>{city.currentCondition}</Text>
      <View style={styles.separador} />
      <Text style={styles.subtitulo}>Prevenções:</Text>
      {city.preventions.map((p, idx) => (
        <Text key={idx} style={styles.item}>
          • {p}
        </Text>
      ))}
      <View style={styles.separador} />
      <Text style={styles.subtitulo}>Previsão:</Text>
      <Text style={styles.previsao}>
        Máx: {Math.round(city.maxTemp)}°  Min: {Math.round(city.minTemp)}°
      </Text>
      <Text style={styles.previsao}>Chuva: {city.rainChance}%</Text>
    </TouchableOpacity>
  );
};

export default CityCard;

const styles = StyleSheet.create({
  cartao: {
    width: 280,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  temperatura: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E90FF',
  },
  icone: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    marginVertical: 8,
  },
  condicao: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
  },
  separador: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginVertical: 8,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  item: {
    fontSize: 12,
    color: '#444444',
    marginLeft: 4,
    marginBottom: 2,
  },
  previsao: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 2,
    marginLeft: 4,
  },
});
