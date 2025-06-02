// /src/screens/Auth/SignUpScreen.tsx

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';
import { globalStyles } from '@styles/global';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [city, setCity] = useState('');

  const handleSignUp = async () => {
    if (!name || !birthdate || !email || !password || !confirm || !city) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/auth/signup', {
        name,
        email,
        password,
        birthdate: birthdate.split('/').reverse().join('-'),
        role: 'user',
        city,
        phone: null,
        gender: null
      });
      Alert.alert('Sucesso', 'Conta criada!');
      navigation.replace('SignIn');
    } catch (err: any) {
      Alert.alert('Erro', err.response?.data?.error || 'Não foi possível criar conta.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha seus dados</Text>

      <Input placeholder="Nome completo" value={name} onChangeText={setName} />
      <Input placeholder="Data de nascimento (DD/MM/AAAA)" value={birthdate} onChangeText={setBirthdate} />
      <Input placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Input placeholder="Confirmar senha" value={confirm} onChangeText={setConfirm} secureTextEntry />
      <Input placeholder="Cidade" value={city} onChangeText={setCity} />

      <Button title="Cadastrar" onPress={handleSignUp} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Já possui uma conta? <Text style={styles.link}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, justifyContent: 'center' },
  title: {
    fontSize: fonts.size.title,
    fontFamily: fonts.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: fonts.size.medium,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 24
  },
  linkText: {
    textAlign: 'center',
    fontSize: fonts.size.medium,
    color: colors.gray,
    marginTop: 24
  },
  link: {
    color: colors.primary,
    fontFamily: fonts.bold
  }
});
