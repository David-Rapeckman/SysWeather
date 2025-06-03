// /src/screens/Settings/TermsScreen.tsx
import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '@styles/fonts';
import { colors } from '@styles/colors';

const TermsScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Termos</Text>
    </View>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Termos de Serviço</Text>
      <Text style={styles.text}>
        Ao utilizar este aplicativo, você concorda com todos os termos e condições aqui descritos.
      </Text>
      <Text style={styles.text}>
        Este app armazena dados locais para gerenciar usuários e cidades. O uso do sistema está sujeito a boas práticas de segurança e privacidade.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default TermsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 79,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  headerText: {
    color: '#fff',
    fontSize: fonts.size.title,
    fontWeight: '700'
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40
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
    marginBottom: 15,
    lineHeight: 22,
    color: '#000'
  }
});
