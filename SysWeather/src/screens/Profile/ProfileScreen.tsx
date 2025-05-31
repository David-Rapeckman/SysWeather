import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const ProfileScreen = ({ navigation }: any) => {
  const { user, signOut } = useAuth();
  const goToEdit = () => navigation.navigate('EditProfile');

  const [storedEmail, setStoredEmail] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      const email = await AsyncStorage.getItem('profile_email');
      if (email) setStoredEmail(email);
    };
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <Image source={require('../../assets/icons/user-avatar.png')} style={styles.avatar} />
        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('ChangePhoto')}>
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Email :</Text>
        <Text style={styles.value}>{storedEmail || user?.email || ''}</Text>
        <TouchableOpacity onPress={goToEdit}>
          <Ionicons name="pencil" size={16} color="#000" style={styles.iconEdit} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
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
    color: '#fff',
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
    backgroundColor: '#eaeaea'
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.success,
    borderRadius: 12,
    padding: 6
  },
  name: {
    fontSize: fonts.size.large,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '90%'
  },
  label: {
    fontWeight: 'bold',
    width: 90,
    fontSize: 15,
    color: '#555'
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: '#222'
  },
  iconEdit: {
    marginLeft: 8
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    width: '90%',
    alignItems: 'center'
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: fonts.size.medium,
    fontWeight: '600'
  }
});
