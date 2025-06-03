// /src/screens/Cities/CityAlertsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { RootStackParamList } from '../../types/auth';

type CityAlertsRouteProp = RouteProp<RootStackParamList, 'CityAlerts'>;

const CityAlertsScreen: React.FC = () => {
  const route = useRoute<CityAlertsRouteProp>();
  const { cityId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.city}>ID da Cidade: {cityId}</Text>
        <Text style={styles.alert}>Nenhum alerta disponível (dados locais).</Text>
      </View>
    </SafeAreaView>
  );
};

export default CityAlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFCDD2'
  },
  city: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B71C1C'
  },
  alert: {
    fontSize: 14,
    color: '#D32F2F',
    marginTop: 4
  }
});
