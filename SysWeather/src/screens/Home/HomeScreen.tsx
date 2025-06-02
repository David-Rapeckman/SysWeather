import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import { CityWithWeather } from '../../types/city';
import { cityService } from '@services/cityService';
import CityCard from '@components/CityCard';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const HomeScreen: React.FC = () => {
  const [cities, setCities] = useState<CityWithWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCitiesWithWeather();
  }, []);

  // Função para buscar as cidades e o clima de cada uma
  const fetchCitiesWithWeather = async () => {
    try {
      const cityResp = await cityService.get<Array<{ id: number; name: string }>>('/cities');
      const cityList = cityResp.data;
      const data: CityWithWeather[] = [];
      for (const c of cityList) {
        // Aqui tipa corretamente a resposta do clima!
        const weatherResp = await cityService.get<CityWithWeather>(`/weather/${c.id}`);
        const w = weatherResp.data;
        data.push({
          id: c.id,
          name: c.name,
          currentTemp: w.currentTemp,
          currentCondition: w.currentCondition,
          maxTemp: w.maxTemp,
          minTemp: w.minTemp,
          rainChance: w.rainChance,
          preventions: w.preventions,
        });
      }
      setCities(data);
    } catch (error) {
      // Aqui pode tratar erro se quiser
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: CityWithWeather }) => (
    <CityCard city={item} onPress={() => {}} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather</Text>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={cities}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingTop: 100
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 79,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  headerText: {
    color: colors.white,
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  list: {
    paddingLeft: 16,
    paddingTop: 20
  }
});
