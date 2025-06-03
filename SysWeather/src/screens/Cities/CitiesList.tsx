// /src/screens/Cities/CitiesList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { City } from '@services/api';
import { api } from '@services/api';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const CitiesList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchCities);
    return unsubscribe;
  }, [navigation]);

  const fetchCities = async () => {
    const list = await api.getCities();
    setCities(list);
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCity')}
      >
        <Text style={styles.addText}>+ Adicionar Cidade</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CitiesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 8
  },
  name: {
    fontSize: fonts.size.large,
    fontWeight: '600',
    color: colors.accent
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.gray
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4
  },
  addText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  }
});
