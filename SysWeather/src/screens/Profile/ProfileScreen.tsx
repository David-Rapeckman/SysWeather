// /src/screens/Profile/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@contexts/AuthContext';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [storedAvatar, setStoredAvatar] = useState<string | null>(null);

  useEffect(() => {
    const carregarAvatar = async () => {
      const avatar = await AsyncStorage.getItem('@sysweather:avatar');
      if (avatar) setStoredAvatar(avatar);
    };
    const unsubscribe = navigation.addListener('focus', carregarAvatar);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.avatarWrapper}>
        <Image
          source={
            storedAvatar
              ? { uri: storedAvatar }
              : require('../../../assets/icons/user-avatar.png')
          }
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate('ChangePhoto')}
        >
          <Ionicons name="pencil" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
      <Text style={styles.field}>E-mail: {user?.email}</Text>
      <Text style={styles.field}>Cidade: {user?.city}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
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
  avatarWrapper: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EFEFEF'
  },
  editIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 6
  },
  name: {
    fontSize: fonts.size.large,
    fontWeight: '600',
    color: colors.accent,
    marginBottom: 12
  },
  field: {
    fontSize: fonts.size.medium,
    color: colors.white,
    marginBottom: 8
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 40
  },
  logoutText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  }
});
