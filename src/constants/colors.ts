/**
 * Colores de la aplicación para modo claro y oscuro.
 * Uso: Colors[colorScheme].nombreColor
 */

import { Platform } from 'react-native';

const tintColorLight = '#3B82F6'; // blue-500
const tintColorDark = '#60A5FA'; // blue-400

export const Colors = {
  light: {
    // Textos
    text: '#11181C',
    textSecondary: '#687076',
    textMuted: '#9CA3AF',

    // Fondos
    background: '#FFFFFF',
    backgroundSecondary: '#F3F4F6',
    card: '#FFFFFF',

    // Tint y navegación
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#E5E7EB',

    // Bordes y separadores
    border: '#E5E7EB',
    separator: '#F3F4F6',

    // Estados
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',

    // Inputs
    inputBackground: '#F9FAFB',
    inputBorder: '#D1D5DB',
    placeholder: '#9CA3AF',
  },
  dark: {
    // Textos
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',

    // Fondos
    background: '#111827',
    backgroundSecondary: '#1F2937',
    card: '#1F2937',

    // Tint y navegación
    tint: tintColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    tabBarBackground: '#1F2937',
    tabBarBorder: '#374151',

    // Bordes y separadores
    border: '#374151',
    separator: '#1F2937',

    // Estados
    primary: '#60A5FA',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',

    // Inputs
    inputBackground: '#374151',
    inputBorder: '#4B5563',
    placeholder: '#6B7280',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
