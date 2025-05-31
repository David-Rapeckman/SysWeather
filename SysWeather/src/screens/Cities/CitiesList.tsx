// /src/screens/Cities/CitiesList.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Definição explícita do tipo City conforme o contrato com o backend Oracle
interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

const CitiesList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    // Assumir que a rota /cities retorna um array de City
    const response = await axios.get<City[]>('http://localhost:3000/cities');
    setCities(response.data);
  };

  const renderItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CityDetails', { cityId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.country}>{item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma cidade cadastrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  card: { padding: 12, borderBottomWidth: 1, borderColor: '#EEE' },
  name: { fontSize: 18, fontWeight: '600', color: '#333' },
  country: { fontSize: 14, color: '#666', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
});

export default CitiesList;
