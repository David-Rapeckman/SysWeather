// /src/screens/Profile/ChangePhotoScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const ChangePhotoScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const avatar = await AsyncStorage.getItem('@sysweather:avatar');
      if (avatar) setUri(avatar);
    })();
  }, []);

  const selecionarDaGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      setUri(pickedUri);
    }
  };

  const tirarFotoAgora = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão negada');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) {
      const takenUri = result.assets[0].uri;
      setUri(takenUri);
    }
  };

  const salvarEVoltar = async () => {
    if (uri) {
      await AsyncStorage.setItem('@sysweather:avatar', uri);
      Alert.alert('Foto salva');
      navigation.goBack();
    } else {
      Alert.alert('Nenhuma foto selecionada');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Alterar Foto</Text>
      </View>
      <Image
        source={uri ? { uri } : require('../../../assets/icons/user-avatar.png')}
        style={styles.avatarPreview}
      />
      <TouchableOpacity style={styles.button} onPress={selecionarDaGaleria}>
        <Text style={styles.buttonText}>Selecionar da Galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={tirarFotoAgora}>
        <Text style={styles.buttonText}>Tirar Foto Agora</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={salvarEVoltar}>
        <Text style={[styles.buttonText, styles.saveText]}>Salvar e Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 100
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
    color: colors.white,
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  avatarPreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EFEFEF',
    marginBottom: 24
  },
  button: {
    width: '80%',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  },
  buttonSave: {
    backgroundColor: colors.accent
  },
  saveText: {
    fontWeight: '700'
  }
});
