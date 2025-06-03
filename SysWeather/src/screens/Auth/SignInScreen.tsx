// /src/screens/Auth/SignInScreen.tsx
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

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { signIn } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorMessage('Preencha ambos os campos.');
      setShowErrorModal(true);
      return;
    }
    try {
      await signIn(email.trim(), password);
      // Ao logar, a tela troca para o TabNavigator (via AppNavigator)
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
      <Text style={styles.title}>SysWeather</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Pressable
        style={styles.linkContainer}
        onPress={() => navigation.navigate('SignUp' as never)}
      >
        <Text style={styles.linkText}>
          Não tem uma conta? <Text style={styles.linkBold}>Cadastre-se</Text>
        </Text>
      </Pressable>

      <Modal transparent visible={showErrorModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Erro</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

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
  modalTitle: {
    fontSize: fonts.size.large,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.danger
  },
  modalMessage: {
    fontSize: fonts.size.medium,
    color: colors.white,
    textAlign: 'center'
  },
  modalButton: {
    marginTop: 20,
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
