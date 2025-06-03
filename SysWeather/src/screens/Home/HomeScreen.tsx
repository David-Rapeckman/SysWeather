// /src/screens/Home/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  Modal,
  Pressable
} from 'react-native';
import { CityWithWeather } from '../../types/city';
import { api } from '@services/api';
import CityCard from '@components/CityCard';
import Header from '@components/Header';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const predefinedCities = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Salvador'
];

// Informações de abrigos e contato por cidade
const sheltersByCity: Record<
  string,
  { address: string; phone: string }[]
> = {
  'São Paulo': [
    {
      address: 'Centro de Acolhida – Rua da Figueira, s/n, Sé, SP',
      phone: '(11) 4000-1234'
    },
    {
      address: 'Abrigo Solidário – Rua Helvétia, s/n, SP',
      phone: '(11) 3000-5678'
    }
  ],
  'Rio de Janeiro': [
    {
      address: 'Abrigo Municipal – Rua Afonso Cavalcanti, 455, RJ',
      phone: '(21) 2500-8765'
    },
    {
      address: 'Centro de Acolhimento – Rua Santa Luzia, 400, RJ',
      phone: '(21) 3500-4321'
    }
  ],
  'Belo Horizonte': [
    {
      address: 'Abrigo da Prefeitura – Av. Amazonas, 6200, BH',
      phone: '(31) 3333-7890'
    },
    {
      address: 'Centro POP – Rua dos Goitacazes, 300, BH',
      phone: '(31) 4444-1234'
    }
  ],
  Curitiba: [
    {
      address: 'Abrigo Municipal – Rua Cruz Machado, 67, Curitiba, PR',
      phone: '(41) 2567-8901'
    },
    {
      address: 'Centro de Refúgio – Rua da Paz, 123, Curitiba, PR',
      phone: '(41) 3789-0123'
    }
  ],
  'Porto Alegre': [
    {
      address: 'Abrigo Municipal – Av. Loureiro da Silva, 144, POA, RS',
      phone: '(51) 3000-1111'
    },
    {
      address: 'Centro Social – Rua Voluntários da Pátria, 500, POA, RS',
      phone: '(51) 4000-2222'
    }
  ],
  Salvador: [
    {
      address: 'Abrigo Local – Praça Céu Azul, s/n, Salvador, BA',
      phone: '(71) 3333-3333'
    },
    {
      address: 'Centro de Refúgio – Rua da Alegria, 250, Salvador, BA',
      phone: '(71) 4444-4444'
    }
  ]
};

const HomeScreen: React.FC = () => {
  const [citiesWeather, setCitiesWeather] = useState<CityWithWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState<string>('');
  const [showAlert, setShowAlert] = useState(true);
  const [selectedCity, setSelectedCity] = useState<CityWithWeather | null>(
    null
  );
  const [showShelterModal, setShowShelterModal] = useState(false);

  useEffect(() => {
    fetchAllWeather();
  }, []);

  const fetchAllWeather = async () => {
    setLoading(true);
    try {
      const results: CityWithWeather[] = [];
      for (const name of predefinedCities) {
        const w = await api.getWeatherForCity(name);
        results.push(w);
      }
      setCitiesWeather(results);
    } catch (err: any) {
      setErrorFetch(err.message || 'Erro ao buscar dados do clima.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: CityWithWeather }) => (
    <View style={styles.cardContainer}>
      <CityCard
        city={item}
        onPress={() => {
          setSelectedCity(item);
          setShowShelterModal(true);
        }}
      />
    </View>
  );

  const closeShelterModal = () => {
    setShowShelterModal(false);
    setSelectedCity(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Cidades & Clima" />

      {/* Alerta Popup */}
      <Modal
        visible={showAlert}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Alerta</Text>
            <Text style={styles.popupMessage}>
              Este é um alerta de exemplo para o usuário. Para buscar abrigo, toque em uma cidade abaixo.
            </Text>
            <Pressable
              style={styles.popupButton}
              onPress={() => setShowAlert(false)}
            >
              <Text style={styles.popupButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : errorFetch ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{errorFetch}</Text>
        </View>
      ) : (
        <FlatList
          data={citiesWeather}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal de Abrigos */}
      <Modal
        visible={showShelterModal}
        transparent
        animationType="slide"
        onRequestClose={closeShelterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Abrigos em {selectedCity?.name}
              </Text>
              <Pressable onPress={closeShelterModal}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>
            {selectedCity && (
              <View style={styles.shelterList}>
                {sheltersByCity[selectedCity.name]?.map((shelter, idx) => (
                  <View key={idx} style={styles.shelterItem}>
                    <Text style={styles.shelterAddress}>
                      • {shelter.address}
                    </Text>
                    <Text style={styles.shelterPhone}>
                      Contato: {shelter.phone}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8
  },
  cardContainer: {
    marginBottom: 16,
    alignItems: 'center'
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
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupContent: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center'
  },
  popupTitle: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8
  },
  popupMessage: {
    fontSize: fonts.size.medium,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16
  },
  popupButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  popupButtonText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  modalTitle: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    color: colors.primary
  },
  modalClose: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    color: colors.primary
  },
  shelterList: {
    marginTop: 8
  },
  shelterItem: {
    marginBottom: 12
  },
  shelterAddress: {
    fontSize: fonts.size.medium,
    color: '#333'
  },
  shelterPhone: {
    fontSize: fonts.size.small,
    color: '#555',
    marginLeft: 12
  }
});
