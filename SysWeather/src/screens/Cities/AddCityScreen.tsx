import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { cityService } from '@services/cityService';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { metrics } from '@styles/metrics';

const AddCityScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Nome da cidade obrigatório.');
      return;
    }
    try {
      await cityService.post('/cities', { name });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Adicionar Cidade</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome da cidade"
        value={name}
        onChangeText={setName}
      />
      <Button title="Adicionar" onPress={handleAdd} />
    </SafeAreaView>
  );
};

export default AddCityScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 20
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
    color: '#fff',
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: metrics.radius,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    fontSize: fonts.size.medium,
    marginBottom: 12,
    marginTop: 20
  }
});
