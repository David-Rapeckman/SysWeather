// /src/navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from '@screens/Home/HomeScreen';
import CitiesList from '@screens/Cities/CitiesList';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import { colors } from '@styles/colors';

type TabParamList = {
  Home: undefined;
  Cities: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({
      route,
    }: {
      route: RouteProp<TabParamList, keyof TabParamList>;
    }) => ({
      headerShown: false,
      tabBarIcon: ({
        color,
        size,
      }: {
        color: string;
        size: number;
      }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';
        if (route.name === 'Home') iconName = 'home-outline';
        if (route.name === 'Cities') iconName = 'location-outline';
        if (route.name === 'Profile') iconName = 'person-outline';
        if (route.name === 'Settings') iconName = 'settings-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray,
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cities" component={CitiesList} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
