import { Colors } from '@/constants/colors';
import { useHomeViewModel } from '@/viewmodels/home.view-model';
import { DatePickerInput } from '@aurora/components/date-picker';
import { Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';

export function HomeView() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { greeting, counter, selectedDate, incrementCounter, decrementCounter, resetCounter, setSelectedDate } = useHomeViewModel();

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="items-center justify-center p-4 pt-16">
        <Text className="mb-8 text-2xl font-bold text-center" style={{ color: colors.text }}>
          {greeting}
        </Text>

        {/* DatePicker */}
        <View className="w-full px-4 mb-8">
          <DatePickerInput
            label="Fecha de nacimiento"
            placeholder="Selecciona una fecha"
            value={selectedDate}
            onChange={setSelectedDate}
            colors={{
              label: colors.text,
              text: colors.text,
              placeholder: colors.placeholder,
              icon: colors.icon,
              inputBackground: colors.inputBackground,
              inputBorder: colors.inputBorder,
              error: colors.error,
              confirmButtonBackground: colors.primary,
              pickerBackground: colors.card,
              pickerBorder: colors.border,
            }}
            texts={{
              cancel: 'Cancelar',
              confirm: 'Confirmar',
            }}
          />
        </View>

        {/* DatePicker */}
        <View className="w-full px-4 mb-8">
          <DatePickerInput
            label="Fecha de nacimiento"
            placeholder="Selecciona una fecha"
            value={selectedDate}
            onChange={setSelectedDate}
            colors={{
              label: colors.text,
              text: colors.text,
              placeholder: colors.placeholder,
              icon: colors.icon,
              inputBackground: colors.inputBackground,
              inputBorder: colors.inputBorder,
              error: colors.error,
              confirmButtonBackground: colors.primary,
              pickerBackground: colors.card,
              pickerBorder: colors.border,
            }}
            texts={{
              cancel: 'Cancelar',
              confirm: 'Confirmar',
            }}
          />
        </View>

        {/* Contador */}
        <View className="w-full max-w-xs p-6 mb-8 rounded-2xl" style={{ backgroundColor: colors.primary }}>
          <Text className="mb-2 text-lg text-center text-white">Contador</Text>
          <Text className="text-5xl font-bold text-center text-white">{counter}</Text>
        </View>

        <View className="flex-row gap-4">
          <Pressable onPress={decrementCounter} className="px-6 py-3 rounded-xl" style={{ backgroundColor: colors.error }}>
            <Text className="text-lg font-semibold text-white">-</Text>
          </Pressable>

          <Pressable onPress={resetCounter} className="px-6 py-3 rounded-xl" style={{ backgroundColor: colors.textMuted }}>
            <Text className="text-lg font-semibold text-white">Reset</Text>
          </Pressable>

          <Pressable onPress={incrementCounter} className="px-6 py-3 rounded-xl" style={{ backgroundColor: colors.success }}>
            <Text className="text-lg font-semibold text-white">+</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
