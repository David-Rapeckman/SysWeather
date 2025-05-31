import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const ChangePhotoScreen = ({ navigation }: any) => {
  const handleSelectGallery = () => {
    Alert.alert('Funcionalidade não implementada');
  };
  const handleTakePhoto = () => {
    Alert.alert('Funcionalidade não implementada');
  };
  const handleSave = () => {
    Alert.alert('Foto Atualizada');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Alterar Foto</Text>
      </View>
      <Image source={require('../../assets/icons/user-avatar.png')} style={styles.image} />
      <View style={styles.buttons}>
        <Button title="Selecionar da Galeria" onPress={handleSelectGallery} />
        <Button title="Tirar Foto Agora" onPress={handleTakePhoto} />
        <Button title="Salvar e Voltar" onPress={handleSave} />
      </View>
    </View>
  );
};

export default ChangePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    zIndex: 10
  },
  headerText: {
    color: '#fff',
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.success,
    marginTop: 80
  },
  buttons: {
    width: '100%',
    gap: 12
  }
});
