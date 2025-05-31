import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Modal,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { metrics } from '@styles/metrics';

const EditProfileScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const e = await AsyncStorage.getItem('profile_email');
      const b = await AsyncStorage.getItem('profile_birthdate');
      if (e) setEmail(e);
      if (b) setBirthDate(new Date(b));
    };
    loadProfile();
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateEmail = (value: string) =>
    value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = async () => {
    if (!validateEmail(email)) {
      setErrorMessage('E-mail inválido.');
      setShowErrorModal(true);
      return;
    }
    try {
      await AsyncStorage.setItem('profile_email', email);
      await AsyncStorage.setItem('profile_birthdate', birthDate.toISOString());
      navigation.goBack();
    } catch {
      setErrorMessage('Erro ao salvar.');
      setShowErrorModal(true);
    }
  };

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setBirthDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar Perfil</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: '#333' }}>
          {birthDate ? formatDate(birthDate) : 'Selecionar data'}
        </Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
      <View style={styles.buttonGroup}>
        <Button title="Salvar Alterações" onPress={handleSave} />
        <Button title="Cancelar" color="#888" onPress={() => navigation.goBack()} />
      </View>
      <Modal animationType="fade" transparent visible={showErrorModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Erro</Text>
            <Text style={styles.modalOptionText}>{errorMessage}</Text>
            <Pressable style={[styles.modalOption, styles.modalCancel]} onPress={() => setShowErrorModal(false)}>
              <Text style={[styles.modalOptionText, { color: 'red' }]}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8'
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 79,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  headerText: {
    color: '#fff',
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
    marginBottom: 15,
    borderRadius: metrics.radius,
    backgroundColor: colors.white
  },
  buttonGroup: {
    width: '100%',
    marginTop: 20,
    gap: 12
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: colors.danger
  },
  modalOption: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center'
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center'
  },
  modalCancel: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  }
});
