import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CityAlertsRouteProp = RouteProp<RootStackParamList, 'CityAlerts'>;

const CityAlertsScreen: React.FC = () => {
  const route = useRoute<CityAlertsRouteProp>();
  const { cityId } = route.params;
  const [alerta, setAlerta] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAlert();
  }, []);

  const fetchAlert = async () => {
    try {
      const resp = await axios.get<any[]>(`http://localhost:3000/events/${cityId}`);
      if (resp.data.length > 0) {
        setAlerta(resp.data[0].type + ' - ' + resp.data[0].severity);
      } else {
        setAlerta('Nenhum alerta disponível.');
      }
    } catch {
      setAlerta('Erro ao buscar alerta.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.city}>ID da Cidade: {cityId}</Text>
        <Text style={styles.alert}>{alerta}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CityAlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
