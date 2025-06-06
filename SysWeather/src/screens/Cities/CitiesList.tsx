import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Header from '@components/Header';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

interface ShelterInfo {
  city: string;
  address: string;
  phone: string;
  capacity: number;
  foodUnits: number;
  priority: number; // 1 = menos urgente, 5 = mais urgente
}

// Dados de abrigos: endereços, telefones, capacidade, comida e prioridade
const sheltersData: ShelterInfo[] = [
  {
    city: 'São Paulo',
    address: 'Centro de Acolhida – Rua da Figueira, s/n, Sé, SP',
    phone: '(11) 4000-1234',
    capacity: 200,
    foodUnits: 40,
    priority: 4,
  },
  {
    city: 'São Paulo',
    address: 'Abrigo Solidário – Rua Helvétia, s/n, SP',
    phone: '(11) 3000-5678',
    capacity: 150,
    foodUnits: 55,
    priority: 3,
  },
  {
    city: 'Rio de Janeiro',
    address: 'Abrigo Municipal – Rua Afonso Cavalcanti, 455, RJ',
    phone: '(21) 2500-8765',
    capacity: 180,
    foodUnits: 29,
    priority: 4,
  },
  {
    city: 'Rio de Janeiro',
    address: 'Centro de Acolhimento – Rua Santa Luzia, 400, RJ',
    phone: '(21) 3500-4321',
    capacity: 120,
    foodUnits: 56,
    priority: 2,
  },
  {
    city: 'Belo Horizonte',
    address: 'Abrigo da Prefeitura – Av. Amazonas, 6200, BH',
    phone: '(31) 3333-7890',
    capacity: 160,
    foodUnits: 62,
    priority: 3,
  },
  {
    city: 'Belo Horizonte',
    address: 'Centro POP – Rua dos Goitacazes, 300, BH',
    phone: '(31) 4444-1234',
    capacity: 100,
    foodUnits: 42,
    priority: 2,
  },
  {
    city: 'Curitiba',
    address: 'Abrigo Municipal – Rua Cruz Machado, 67, Curitiba, PR',
    phone: '(41) 2567-8901',
    capacity: 140,
    foodUnits: 24,
    priority: 3,
  },
  {
    city: 'Curitiba',
    address: 'Centro de Refúgio – Rua da Paz, 123, Curitiba, PR',
    phone: '(41) 3789-0123',
    capacity: 90,
    foodUnits: 120,
    priority: 1,
  },
  {
    city: 'Porto Alegre',
    address: 'Abrigo Municipal – Av. Loureiro da Silva, 144, POA, RS',
    phone: '(51) 3000-1111',
    capacity: 130,
    foodUnits: 67,
    priority: 2,
  },
  {
    city: 'Porto Alegre',
    address: 'Centro Social – Rua Voluntários da Pátria, 500, POA, RS',
    phone: '(51) 4000-2222',
    capacity: 110,
    foodUnits: 50,
    priority: 2,
  },
  {
    city: 'Salvador',
    address: 'Abrigo Local – Praça Céu Azul, s/n, Salvador, BA',
    phone: '(71) 3333-3333',
    capacity: 170,
    foodUnits: 210,
    priority: 3,
  },
  {
    city: 'Salvador',
    address: 'Centro de Refúgio – Rua da Alegria, 250, Salvador, BA',
    phone: '(71) 4444-4444',
    capacity: 120,
    foodUnits: 150,
    priority: 1,
  },
];

// Agrupa abrigos por cidade
const groupByCity = (data: ShelterInfo[]) => {
  const result: Record<string, ShelterInfo[]> = {};
  data.forEach((s) => {
    if (!result[s.city]) {
      result[s.city] = [];
    }
    result[s.city].push(s);
  });
  return result;
};

const ShelterStatsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [grouped, setGrouped] = useState<Record<string, ShelterInfo[]>>({});

  useEffect(() => {
    // Simula busca de dados
    setTimeout(() => {
      setGrouped(groupByCity(sheltersData));
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Estatísticas" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  // Preparar dados por cidade
  const cityNames = Object.keys(grouped);
  const capacityDataset = cityNames.map((city) =>
    grouped[city].reduce((sum, s) => sum + s.capacity, 0)
  );
  const foodDataset = cityNames.map((city) =>
    grouped[city].reduce((sum, s) => sum + s.foodUnits, 0)
  );
  const priorityDataset = cityNames.map((city) =>
    Math.round(
      grouped[city].reduce((sum, s) => sum + s.priority, 0) /
        grouped[city].length
    )
  );

  // Cores base para os gráficos de pizza
  const baseColors = ['#d4af37', '#43A047', '#E53935', '#1E88E5', '#757575', '#213123' ];

  // Dados de Pizza para cada métrica
  const pieDataCount = cityNames.map((city, idx) => ({
    name: city,
    population: grouped[city].length,
    color: baseColors[idx % baseColors.length],
  }));
  const pieDataCapacity = cityNames.map((city, idx) => ({
    name: city,
    population: capacityDataset[idx],
    color: baseColors[idx % baseColors.length],
  }));
  const pieDataFood = cityNames.map((city, idx) => ({
    name: city,
    population: foodDataset[idx],
    color: baseColors[idx % baseColors.length],
  }));
  const pieDataPriority = cityNames.map((city, idx) => ({
    name: city,
    population: priorityDataset[idx],
    color: baseColors[idx % baseColors.length],
  }));

  // Função auxiliar para renderizar legenda abaixo do gráfico
  const renderLegend = (data: { name: string; population: number; color: string }[]) => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>
              {item.name}: {item.population}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Estatísticas" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Pizza: Quantidade de Abrigos por Cidade */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Abrig.: Quantidade por Cidade</Text>
          <PieChart
            data={pieDataCount}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: () => colors.white,
              labelColor: () => colors.white,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}      // remove legenda lateral
            style={styles.pieStyle}
          />
          {renderLegend(pieDataCount)}
          <Text style={styles.cardNote}>
            Cada fatia mostra quantos abrigos estão ativos em cada cidade.
          </Text>
        </View>

        {/* Pizza: Capacidade Total por Cidade */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Capacidade Total por Cidade</Text>
          <PieChart
            data={pieDataCapacity}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: () => colors.white,
              labelColor: () => colors.white,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}      // remove legenda lateral
            style={styles.pieStyle}
          />
          {renderLegend(pieDataCapacity)}
          <Text style={styles.cardNote}>
            Soma das capacidades de todos os abrigos por cidade.
          </Text>
        </View>

        {/* Pizza: Unidades de Comida por Cidade */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Qtd. de Dias com Comida</Text>
          <PieChart
            data={pieDataFood}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: () => colors.white,
              labelColor: () => colors.white,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}      // remove legenda lateral
            style={styles.pieStyle}
          />
          {renderLegend(pieDataFood)}
          <Text style={styles.cardNote}>
            Soma das unidades de comida de todos os abrigos por cidade.
          </Text>
        </View>

        {/* Pizza: Prioridade Média por Cidade */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prioridade Média por Cidade</Text>
          <PieChart
            data={pieDataPriority}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: () => colors.white,
              labelColor: () => colors.white,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}      // remove legenda lateral
            style={styles.pieStyle}
          />
          {renderLegend(pieDataPriority)}
          <Text style={styles.cardNote}>
            Média de prioridade (1 a 5) dos abrigos em cada cidade.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShelterStatsScreen;

const { width } = Dimensions.get('window');
const screenWidth = width - 32; // considerar 16px de padding em cada lado

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#111', // fundo escuro
    borderRadius: 12,
    padding: 16,
    marginVertical: 16, // mais espaço entre os cards
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 8,
  },
  cardTitle: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 12, // espaço abaixo do título
    textAlign: 'center',
    lineHeight: fonts.size.large + 6,
  },
  cardNote: {
    fontSize: fonts.size.small,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 12, // espaço acima da legenda
    lineHeight: fonts.size.small + 4,
  },
  pieStyle: {
    marginVertical: 12, // espaço acima/abaixo do gráfico
    borderRadius: 8,
  },
  legendContainer: {
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: fonts.size.small,
    color: colors.white,
  },
});
