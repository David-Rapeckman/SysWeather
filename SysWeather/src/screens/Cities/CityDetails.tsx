// /src/screens/Cities/CityDetails.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';

// Definição explícita do tipo retornado pela API de detalhes de cidade
interface CityDetail {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  population: number;
  weatherAlert: string | null;
}

type RootStackParamList = {
  CityDetails: { cityId: number };
};

const CityDetails: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CityDetails'>>();
  const { cityId } = route.params;
  const [city, setCity] = useState<CityDetail | null>(null);

  useEffect(() => {
    fetchCityDetails();
  }, []);

  const fetchCityDetails = async () => {
    // Supor que a rota /cities/:id retorna { city: CityDetail }
    const response = await axios.get<{ city: CityDetail }>(`http://localhost:3000/cities/${cityId}`);
    setCity(response.data.city);
  };

  if (!city) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dados da cidade...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{city.name}</Text>
      <Text style={styles.field}>País: {city.country}</Text>
      <Text style={styles.field}>População: {city.population}</Text>
      <Text style={styles.field}>
        Localização: {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
      </Text>
      <Text style={styles.alert}>
        Alerta Climático: {city.weatherAlert ?? 'Nenhum alerta no momento'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#888' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#333' },
  field: { fontSize: 16, marginBottom: 12, color: '#555' },
  alert: { fontSize: 16, marginTop: 24, color: '#B00020' },
});

export default CityDetails;
