// /src/screens/Settings/HelpCenterScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const HelpCenterScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Ajuda</Text>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={colors.primary} />
      <Text style={styles.backText}>Voltar</Text>
    </TouchableOpacity>
    <Text style={styles.title}>Central de Ajuda</Text>
    <Text style={styles.text}>Precisa de suporte? Contate:</Text>
    <Text style={styles.item}>• suporte@sysweather.com</Text>
    <Text style={styles.item}>• WhatsApp: (11) 99999-9999</Text>
    <Text style={styles.item}>• FAQ disponível no site oficial</Text>
    <Text style={styles.note}>
      Nosso time está disponível de segunda a sexta, das 8h às 18h.
    </Text>
  </SafeAreaView>
);

export default HelpCenterScreen;

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
  item: {
    fontSize: fonts.size.medium,
    marginBottom: 6,
    color: '#000'
  },
  note: {
    marginTop: 20,
    color: 'gray',
    fontStyle: 'italic'
  }
});
