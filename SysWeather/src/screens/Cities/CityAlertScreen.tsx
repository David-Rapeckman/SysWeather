// /src/screens/Cities/CityAlertsScreen.tsx
// nova tela para exibir alertas baseados na cidade do usuário

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { listarUsuariosCadastrados, User } from '../../services/userService';
import axios from 'axios';

interface AlertData {
  cidade: string;
  alerta: string;
}

const CityAlertsScreen: React.FC = () => {
  const [alertas, setAlertas] = useState<AlertData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    buscarAlertasUsuario();
  }, []);

  const buscarAlertasUsuario = async () => {
    const usuarios = await listarUsuariosCadastrados();
    // para cada usuário, obter alertas via backend:
    const resultados: AlertData[] = [];
    for (const u of usuarios) {
      try {
        const resp = await axios.get<{ alerta: string }>(`http://localhost:3000/alerts?city=${encodeURIComponent(u.city)}`);
        resultados.push({ cidade: u.city, alerta: resp.data.alerta });
      } catch {
        resultados.push({ cidade: u.city, alerta: 'Nenhum alerta disponível.' });
      }
    }
    setAlertas(resultados);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {alertas.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cidade}>Cidade: {item.cidade}</Text>
          <Text style={styles.alerta}>{item.alerta}</Text>
        </View>
      ))}
    </View>
  );
};

export default CityAlertsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  cidade: { fontSize: 16, fontWeight: '600', color: '#333' },
  alerta: { fontSize: 14, color: '#B00020', marginTop: 4 },
});
