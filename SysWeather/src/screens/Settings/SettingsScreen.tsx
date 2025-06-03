// /src/screens/Settings/SettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import Header from '@components/Header';

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [muted, setMuted] = useState(false);
  const [customNotifications, setCustomNotifications] = useState(true);

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Configurações" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.settingItem}>
          <Text style={styles.label}></Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Mutar notificações:</Text>
          <Switch value={muted} onValueChange={() => setMuted((prev) => !prev)} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.label}>Notificações personalizadas:</Text>
          <Switch
            value={customNotifications}
            onValueChange={() => setCustomNotifications((prev) => !prev)}
          />
        </View>

        <Text style={styles.sectionHeading}>Informações</Text>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => setShowAboutModal(true)}
        >
          <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.linkText}>Sobre o App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => setShowHelpModal(true)}
        >
          <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.linkText}>Central de Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => setShowTermsModal(true)}
        >
          <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          <Text style={styles.linkText}>Termos de Serviço</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal animationType="slide" transparent visible={showAboutModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sobre o SysWeather</Text>
              <Pressable onPress={() => setShowAboutModal(false)}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </Pressable>
            </View>
            <Text style={styles.modalText}>
              SysWeather monitora eventos extremos em tempo real nas cidades cadastradas pelo usuário.
            </Text>
            <Text style={styles.modalText}>
              Utiliza integração com APIs meteorológicas e armazenamento local para registrar dados.
            </Text>
            <Text style={styles.modalVersion}>Versão 1.0.0</Text>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={showHelpModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Central de Ajuda</Text>
              <Pressable onPress={() => setShowHelpModal(false)}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </Pressable>
            </View>
            <Text style={styles.modalText}>Precisa de suporte? Contate:</Text>
            <Text style={styles.modalText}>• suporte@sysweather.com</Text>
            <Text style={styles.modalText}>• WhatsApp: (11) 99999-9999</Text>
            <Text style={styles.modalText}>• FAQ disponível no site oficial</Text>
            <Text style={styles.modalNote}>
              Nosso time está disponível de segunda a sexta, das 8h às 18h.
            </Text>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={showTermsModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Termos de Serviço</Text>
              <Pressable onPress={() => setShowTermsModal(false)}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </Pressable>
            </View>
            <ScrollView>
              <Text style={styles.modalText}>
                Ao utilizar este aplicativo, você concorda com todos os termos e condições aqui descritos.
              </Text>
              <Text style={styles.modalText}>
                Este app armazena dados locais para gerenciar usuários e cidades. O uso do sistema está sujeito a boas práticas de segurança e privacidade.
              </Text>
              <Text style={styles.modalText}>
                As responsabilidades do usuário incluem manter seus dados atualizados e não compartilhar credenciais com terceiros.
              </Text>
              <Text style={styles.modalText}>
                Em caso de dúvidas, contate suporte@sysweather.com.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20
  },
  sectionHeading: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: fonts.size.large,
    fontWeight: '700',
    color: colors.accent
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  label: {
    fontSize: fonts.size.medium,
    color: colors.white
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  linkText: {
    marginLeft: 8,
    fontSize: fonts.size.medium,
    color: colors.primary,
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
    maxHeight: '80%',
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
  modalText: {
    fontSize: fonts.size.medium,
    color: '#000',
    marginBottom: 12
  },
  modalNote: {
    marginTop: 16,
    fontSize: fonts.size.small,
    color: '#666',
    fontStyle: 'italic'
  },
  modalVersion: {
    marginTop: 16,
    fontSize: fonts.size.small,
    color: '#333'
  }
});
