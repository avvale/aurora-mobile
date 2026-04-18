import { useHomeViewModel } from '@/viewmodels/home.view-model';
import { DatePickerInput } from '@aurora/components/date-picker';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export function HomeView() {
  const textColor = useCSSVariable('--color-text') as string;
  const placeholderColor = useCSSVariable('--color-placeholder') as string;
  const iconColor = useCSSVariable('--color-icon') as string;
  const inputBackground = useCSSVariable('--color-input-background') as string;
  const inputBorder = useCSSVariable('--color-input-border') as string;
  const errorColor = useCSSVariable('--color-error') as string;
  const primaryColor = useCSSVariable('--color-primary') as string;
  const cardColor = useCSSVariable('--color-card') as string;
  const borderColor = useCSSVariable('--color-border') as string;

  const datePickerColors = {
    label: textColor,
    text: textColor,
    placeholder: placeholderColor,
    icon: iconColor,
    inputBackground,
    inputBorder,
    error: errorColor,
    confirmButtonBackground: primaryColor,
    pickerBackground: cardColor,
    pickerBorder: borderColor,
  };

  const { greeting, counter, selectedDate, incrementCounter, decrementCounter, resetCounter, setSelectedDate } = useHomeViewModel();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="items-center justify-center p-4 pt-16">
        <Text className="mb-8 text-2xl font-bold text-center text-text">{greeting}</Text>

        {/* DatePicker */}
        <View className="w-full px-4 mb-8">
          <DatePickerInput
            label="Fecha de nacimiento"
            placeholder="Selecciona una fecha"
            value={selectedDate}
            onChange={setSelectedDate}
            colors={datePickerColors}
            texts={{ cancel: 'Cancelar', confirm: 'Confirmar' }}
          />
        </View>

        {/* DatePicker */}
        <View className="w-full px-4 mb-8">
          <DatePickerInput
            label="Fecha de nacimiento"
            placeholder="Selecciona una fecha"
            value={selectedDate}
            onChange={setSelectedDate}
            colors={datePickerColors}
            texts={{ cancel: 'Cancelar', confirm: 'Confirmar' }}
          />
        </View>

        {/* Contador */}
        <View className="w-full max-w-xs p-6 mb-8 rounded-2xl bg-primary">
          <Text className="mb-2 text-lg text-center text-white">Contador</Text>
          <Text className="text-5xl font-bold text-center text-white">{counter}</Text>
        </View>

        <View className="flex-row gap-4">
          <Pressable onPress={decrementCounter} className="px-6 py-3 rounded-xl bg-error">
            <Text className="text-lg font-semibold text-white">-</Text>
          </Pressable>

          <Pressable onPress={resetCounter} className="px-6 py-3 rounded-xl bg-text-muted">
            <Text className="text-lg font-semibold text-white">Reset</Text>
          </Pressable>

          <Pressable onPress={incrementCounter} className="px-6 py-3 rounded-xl bg-success">
            <Text className="text-lg font-semibold text-white">+</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
