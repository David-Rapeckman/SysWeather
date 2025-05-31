// /src/screens/Settings/TermsScreen.tsx

import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TermsScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Terms</Text>
    </View>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#2e86de" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Termos de Serviço</Text>
      <Text style={styles.text}>
        Ao utilizar este aplicativo, você concorda com todos os termos e condições aqui descritos.
      </Text>
      <Text style={styles.text}>
        Este app coleta e trata dados pessoais conforme a política de privacidade.
        O uso do sistema está sujeito a regras específicas e poderá ser revogado em caso de violação.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default TermsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 79,
    backgroundColor: 'rgba(40, 167, 69, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2e86de',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: '#000',
  },
});
