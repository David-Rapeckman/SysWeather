import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

const HomeScreen = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Dashboard</Text>
    </View>
  </SafeAreaView>
);

export default HomeScreen;

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
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  headerText: {
    color: '#fff',
    fontSize: fonts.size.title,
    fontWeight: '700'
  }
});
