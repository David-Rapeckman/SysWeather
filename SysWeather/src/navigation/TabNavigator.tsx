// /src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@screens/Home/HomeScreen';
import CitiesList from '@screens/Cities/CitiesList';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts';

type TabParamList = {
  Home: undefined;
  CitiesList: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';
        if (route.name === 'Home') iconName = 'home-outline';
        if (route.name === 'CitiesList') iconName = 'location-outline';
        if (route.name === 'Profile') iconName = 'person-outline';
        if (route.name === 'Settings') iconName = 'settings-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.gray,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        height: 60
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600'
      }
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="CitiesList" component={CitiesList} options={{ title: 'Cidades' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
  </Tab.Navigator>
);

export default TabNavigator;
