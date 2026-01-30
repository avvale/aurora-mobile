/**
 * DatePickerInput - Componente de selección de fecha
 * En Android: muestra el picker nativo estándar
 * En iOS: muestra un spinner con botones de Confirmar/Cancelar
 *
 * Componente generalizado para cualquier app React Native.
 * Los colores y textos son completamente configurables via props.
 *
 * @requires @react-native-community/datetimepicker
 * @requires @expo/vector-icons
 *
 * Instalación:
 * ```bash
 * npm install @react-native-community/datetimepicker
 * ```
 */

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';

/**
 * Configuración de colores para el DatePickerInput
 * Todos los colores son opcionales y tienen valores por defecto
 */
export interface DatePickerColors {
  /** Color del texto del label */
  label?: string;
  /** Color del texto cuando hay valor */
  text?: string;
  /** Color del texto del placeholder */
  placeholder?: string;
  /** Color del icono del calendario */
  icon?: string;
  /** Color de fondo del input */
  inputBackground?: string;
  /** Color del borde del input */
  inputBorder?: string;
  /** Color del borde cuando hay error */
  error?: string;
  /** Color de fondo del botón cancelar */
  cancelButtonBackground?: string;
  /** Color de texto del botón cancelar */
  cancelButtonText?: string;
  /** Color de fondo del botón confirmar */
  confirmButtonBackground?: string;
  /** Color de texto del botón confirmar */
  confirmButtonText?: string;
  /** Color de fondo del contenedor del picker (iOS) */
  pickerBackground?: string;
  /** Color del borde del contenedor del picker (iOS) */
  pickerBorder?: string;
}

/**
 * Textos configurables para internacionalización
 */
export interface DatePickerTexts {
  /** Texto del botón cancelar */
  cancel?: string;
  /** Texto del botón confirmar */
  confirm?: string;
}

/** Colores por defecto del componente */
const defaultColors: Required<DatePickerColors> = {
  label: '#1F2937',
  text: '#1F2937',
  placeholder: '#9CA3AF',
  icon: '#9CA3AF',
  inputBackground: '#F9FAFB',
  inputBorder: '#E5E7EB',
  error: '#EF4444',
  cancelButtonBackground: '#E5E7EB',
  cancelButtonText: '#1F2937',
  confirmButtonBackground: '#3B82F6',
  confirmButtonText: '#FFFFFF',
  pickerBackground: '#F9FAFB',
  pickerBorder: '#E5E7EB',
};

/** Textos por defecto */
const defaultTexts: Required<DatePickerTexts> = {
  cancel: 'Cancel',
  confirm: 'Confirm',
};

interface DatePickerInputProps {
  /** Etiqueta del campo */
  label: string;
  /** Texto placeholder cuando no hay valor */
  placeholder: string;
  /** Fecha seleccionada */
  value: Date | null;
  /** Callback cuando cambia la fecha */
  onChange: (date: Date) => void;
  /** Fecha máxima permitida */
  maximumDate?: Date;
  /** Fecha mínima permitida */
  minimumDate?: Date;
  /** Control externo del estado del picker */
  isOpen?: boolean;
  /** Callback para notificar cambios de estado */
  onOpenChange?: (isOpen: boolean) => void;
  /** Indica si hay un error */
  hasError?: boolean;
  /** Mensaje de error a mostrar */
  errorMessage?: string;
  /** Callback cuando pierde el foco */
  onBlur?: () => void;
  /** Configuración de colores personalizada */
  colors?: DatePickerColors;
  /** Textos personalizados para i18n */
  texts?: DatePickerTexts;
  /** Formato de fecha personalizado (función) */
  formatDate?: (date: Date) => string;
  /** Modo de visualización del picker (iOS: 'spinner' | 'compact' | 'inline', Android: 'default' | 'spinner' | 'calendar' | 'clock') */
  display?: 'default' | 'spinner' | 'compact' | 'inline' | 'calendar' | 'clock';
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  maximumDate,
  minimumDate,
  isOpen,
  onOpenChange,
  hasError = false,
  errorMessage,
  onBlur,
  colors: customColors,
  texts: customTexts,
  formatDate: customFormatDate,
  display,
}) => {
  // Merge colores y textos personalizados con los valores por defecto
  const colors = { ...defaultColors, ...customColors };
  const texts = { ...defaultTexts, ...customTexts };

  // Display por defecto según plataforma: 'spinner' en iOS, 'default' en Android
  const displayMode = display || (Platform.OS === 'ios' ? 'spinner' : 'default');

  const [internalShowDatePicker, setInternalShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  // Usar control externo si está disponible, sino usar el estado interno
  const showDatePicker = isOpen !== undefined ? isOpen : internalShowDatePicker;
  const setShowDatePicker = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalShowDatePicker(value);
    }
  };

  // Formatear fecha para mostrar (usa función personalizada si se proporciona)
  const formatDate = (date: Date) => {
    if (customFormatDate) {
      return customFormatDate(date);
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Manejar cambio de fecha
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      // Android: cerrar inmediatamente y aplicar cambio
      setShowDatePicker(false);
      if (event.type === 'set' && date) {
        onChange(date);
      }
      // Notificar que perdió el foco (tanto si confirma como si cancela)
      if (onBlur) {
        onBlur();
      }
    } else {
      // iOS: solo actualizar tempDate sin cerrar
      if (date) {
        setTempDate(date);
      }
    }
  };

  // Confirmar selección en iOS
  const confirmDateSelection = () => {
    onChange(tempDate);
    setShowDatePicker(false);
    // Notificar que perdió el foco
    if (onBlur) {
      onBlur();
    }
  };

  // Cancelar selección en iOS
  const cancelDateSelection = () => {
    setTempDate(value || new Date());
    setShowDatePicker(false);
    // Notificar que perdió el foco
    if (onBlur) {
      onBlur();
    }
  };

  // Toggle del picker
  const toggleDatePicker = () => {
    // Cerrar el teclado si está abierto
    Keyboard.dismiss();

    if (showDatePicker) {
      // Si está abierto, cerrar (comportamiento de cancelar)
      cancelDateSelection();
      // Notificar que perdió el foco
      if (onBlur) {
        onBlur();
      }
    } else {
      // Si está cerrado, abrir
      setTempDate(value || new Date());
      setShowDatePicker(true);
    }
  };

  return (
    <View>
      <Text className="mb-2 text-sm font-semibold" style={{ color: colors.label }}>
        {label}
      </Text>

      <TouchableOpacity
        className="flex-row items-center justify-between p-3.5 border rounded-xl"
        style={{
          backgroundColor: colors.inputBackground,
          borderColor: hasError ? colors.error : colors.inputBorder,
          borderWidth: hasError ? 2 : 1,
        }}
        onPress={toggleDatePicker}
      >
        <Text className="text-base" style={{ color: value ? colors.text : colors.placeholder }}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={colors.icon} />
      </TouchableOpacity>

      {hasError && errorMessage && (
        <Text className="mt-1 text-xs" style={{ color: colors.error }}>
          {errorMessage}
        </Text>
      )}

      {showDatePicker && (
        <>
          {Platform.OS === 'ios' ? (
            // iOS DatePicker con botones de confirmar/cancelar
            <View
              className="p-4 mt-4 rounded-xl"
              style={{
                backgroundColor: colors.pickerBackground,
                borderWidth: 1,
                borderColor: colors.pickerBorder,
              }}
            >
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={displayMode}
                onChange={handleDateChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                style={{ height: 120 }}
              />
              <View className="flex-row justify-end mt-4 space-x-3">
                <TouchableOpacity
                  onPress={cancelDateSelection}
                  className="px-4 py-2 mr-3 rounded-lg"
                  style={{
                    backgroundColor: colors.cancelButtonBackground,
                  }}
                >
                  <Text style={{ color: colors.cancelButtonText }}>{texts.cancel}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDateSelection} className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.confirmButtonBackground }}>
                  <Text style={{ color: colors.confirmButtonText }}>{texts.confirm}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // Android DatePicker (modal nativo)
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display={displayMode}
              onChange={handleDateChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          )}
        </>
      )}
    </View>
  );
};
