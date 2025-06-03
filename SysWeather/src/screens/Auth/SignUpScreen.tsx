// /src/screens/Auth/SignUpScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable
} from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { globalStyles } from '@styles/global';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [city, setCity] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password || !confirm || !city.trim()) {
      setErrorMessage('Preencha todos os campos.');
      setShowErrorModal(true);
      return;
    }
    if (password !== confirm) {
      setErrorMessage('As senhas não coincidem.');
      setShowErrorModal(true);
      return;
    }
    try {
      await signUp(name.trim(), email.trim(), password, city.trim());
      setErrorMessage('Conta criada com sucesso!');
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
        navigation.replace('SignIn');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message);
      setShowErrorModal(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>SysWeather - Cadastro</Text>
      <Text style={styles.subtitle}>Crie sua conta</Text>

      <Input placeholder="Nome completo" value={name} onChangeText={setName} />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Input
        placeholder="Confirmar senha"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      <Input placeholder="Cidade" value={city} onChangeText={setCity} />

      <Button title="Cadastrar" onPress={handleSignUp} />

      <Pressable style={styles.linkContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Já possui conta? <Text style={styles.linkBold}>Entrar</Text>
        </Text>
      </Pressable>

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
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: colors.background
  },
  title: {
    fontSize: fonts.size.title,
    fontWeight: 'bold',
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 12
  },
  subtitle: {
    fontSize: fonts.size.medium,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 24
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center'
  },
  linkText: {
    fontSize: fonts.size.medium,
    color: colors.gray
  },
  linkBold: {
    color: colors.accent,
    fontWeight: 'bold'
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
