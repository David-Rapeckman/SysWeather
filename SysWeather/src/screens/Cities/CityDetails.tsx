// /src/screens/Cities/CityDetails.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/auth';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

type CityDetailsRouteProp = RouteProp<RootStackParamList, 'CityDetails'>;

const CityDetails: React.FC = () => {
  const route = useRoute<CityDetailsRouteProp>();
  const { cityId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalhes da Cidade</Text>
      <Text style={styles.field}>ID: {cityId}</Text>
      <Text style={styles.field}>Nome: Exemplo de Cidade</Text>
      <Text style={styles.field}>País: Brasil</Text>
      <Text style={styles.field}>População: 1.234.567</Text>
      <Text style={styles.alert}>Alerta Climático: Nenhum alerta no momento</Text>
    </SafeAreaView>
  );
};

export default CityDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  title: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.accent
  },
  field: {
    fontSize: fonts.size.medium,
    marginBottom: 12,
    color: colors.white
  },
  alert: {
    fontSize: fonts.size.medium,
    marginTop: 24,
    color: '#ff4444'
  }
});
