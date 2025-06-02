import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { City } from '../../types/city';
import { cityService } from '@services/cityService';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const CitiesList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const response = await cityService.get<City[]>('/cities');
    setCities(response.data);
  };

  const renderItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CityAlerts', { cityId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
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

export default CitiesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF'
  },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#B3E5FC',
    borderRadius: 8
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#01579B'
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888'
  }
});
