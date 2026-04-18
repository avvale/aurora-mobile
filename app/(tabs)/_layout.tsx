import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useCSSVariable, useResolveClassNames } from 'uniwind';

export default function TabLayout() {
  const tabBarActiveTintColor = useCSSVariable('--color-tab-icon-selected') as string;
  const tabBarInactiveTintColor = useCSSVariable('--color-tab-icon-default') as string;
  const tabBarBaseStyle = useResolveClassNames('bg-tab-bar-background border-t border-tab-bar-border');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle: [tabBarBaseStyle, Platform.OS === 'ios' ? { position: 'absolute' } : null],
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <IconSymbol name="house.fill" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <IconSymbol name="person.fill" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
