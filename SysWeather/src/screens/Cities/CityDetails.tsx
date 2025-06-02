import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator'; // ou centralize em types


type CityDetailsRouteProp = RouteProp<RootStackParamList, 'CityDetails'>;

interface CityDetail {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  population: number;
  weatherAlert: string | null;
}

const CityDetails: React.FC = () => {
  const route = useRoute<CityDetailsRouteProp>();
  const { cityId } = route.params;
  const [city, setCity] = useState<CityDetail | null>(null);

  useEffect(() => {
    fetchCityDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCityDetails = async () => {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{city.name}</Text>
      <Text style={styles.field}>País: {city.country}</Text>
      <Text style={styles.field}>População: {city.population}</Text>
      <Text style={styles.field}>
        Local: {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
      </Text>
      <Text style={styles.alert}>
        Alerta Climático: {city.weatherAlert ?? 'Nenhum alerta no momento'}
      </Text>
    </SafeAreaView>
  );
};

export default CityDetails;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#888'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333'
  },
  field: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555'
  },
  alert: {
    fontSize: 16,
    marginTop: 24,
    color: '#D32F2F'
  }
});
