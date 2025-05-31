import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CitiesList from '@screens/Cities/CitiesList';
import CityDetails from '@screens/Cities/CityDetails';
import AddCityScreen from '@screens/Cities/AddCityScreen';
import HomeScreen from '@screens/Home/HomeScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import { colors } from '@styles/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Cities':
            iconName = 'location-outline';
            break;
          case 'Profile':
            iconName = 'person-outline';
            break;
          case 'Settings':
            iconName = 'settings-outline';
            break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray,
      tabBarStyle: {
        backgroundColor: colors.white,
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
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Cities" component={CitiesList} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
