// /src/screens/Settings/AboutAppScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const AboutAppScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Sobre</Text>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={colors.primary} />
      <Text style={styles.backText}>Voltar</Text>
    </TouchableOpacity>
    <Text style={styles.title}>Sobre o SysWeather</Text>
    <Text style={styles.text}>
      SysWeather monitora eventos extremos em tempo real nas cidades cadastradas pelo usuário.
    </Text>
    <Text style={styles.text}>
      Utiliza integração com APIs meteorológicas e armazenamento local para registrar dados.
    </Text>
    <Text style={styles.version}>Versão 1.0.0</Text>
  </SafeAreaView>
);

export default AboutAppScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.white,
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backText: {
    marginLeft: 8,
    fontSize: fonts.size.medium,
    color: colors.primary
  },
  title: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000'
  },
  text: {
    fontSize: fonts.size.medium,
    marginBottom: 10,
    color: '#000'
  },
  version: {
    fontSize: fonts.size.small,
    color: 'gray',
    marginTop: 20
  }
});
