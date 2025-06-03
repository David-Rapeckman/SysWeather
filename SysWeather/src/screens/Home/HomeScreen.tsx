// /src/screens/Home/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { City } from '@services/api';
import { api } from '@services/api';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { globalStyles } from '@styles/global';

type Navigation = {
  navigate: (screen: string) => void;
};

const HomeScreen: React.FC<{ navigation: Navigation }> = ({ navigation }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchCities);
    return unsubscribe;
  }, [navigation]);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const list = await api.getCities();
      setCities(list);
    } catch (err: any) {
      setErrorFetch(err.message || 'Erro ao carregar cidades.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CityAlerts', { cityId: item.id })}
    >
      <Text style={styles.cityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={globalStyles.title}>Cidades Cadastradas</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : errorFetch ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{errorFetch}</Text>
        </View>
      ) : cities.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noCitiesText}>Nenhuma cidade cadastrada.</Text>
        </View>
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCity')}
      >
        <Text style={styles.addButtonText}>+ Adicionar Cidade</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  list: {
    paddingBottom: 80
  },
  card: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  cityName: {
    fontSize: fonts.size.large,
    color: colors.accent,
    fontWeight: '700'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: colors.danger,
    fontSize: fonts.size.medium
  },
  noCitiesText: {
    color: colors.gray,
    fontSize: fonts.size.medium
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4
  },
  addButtonText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  }
});
