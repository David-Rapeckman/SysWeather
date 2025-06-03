// /src/screens/Home/AddCityScreen.tsx
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  Pressable
} from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { api } from '@services/api';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { globalStyles } from '@styles/global';

type Navigation = {
  goBack: () => void;
};

const AddCityScreen: React.FC<{ navigation: Navigation }> = ({ navigation }) => {
  const [cityName, setCityName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleAdd = async () => {
    if (!cityName.trim()) {
      setErrorMessage('Nome da cidade não pode ficar vazio.');
      setShowErrorModal(true);
      return;
    }
    try {
      await api.addCity(cityName.trim());
      navigation.goBack();
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao adicionar cidade.');
      setShowErrorModal(true);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <Text style={styles.title}>Adicionar Cidade</Text>
      <Text style={styles.label}>Nome da cidade:</Text>
      <Input
        placeholder="ex: São Paulo"
        value={cityName}
        onChangeText={setCityName}
      />
      <Button title="Salvar" onPress={handleAdd} />

      <Modal transparent visible={showErrorModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddCityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  title: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 20
  },
  label: {
    fontSize: fonts.size.medium,
    color: colors.white,
    marginBottom: 8
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center'
  },
  modalMessage: {
    fontSize: fonts.size.medium,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16
  },
  modalButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalButtonText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  }
});
