import { Colors } from '@/constants/colors';
import { useProfileViewModel } from '@/viewmodels/profile.view-model';
import { ActivityIndicator, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';

export function ProfileView() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { isLoading, isLoadingContacts, isAuthenticated, authData, contacts, error, performLogin, loadContacts, logout } = useProfileViewModel();

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="p-4 pt-16">
        <Text className="mb-8 text-2xl font-bold text-center" style={{ color: colors.text }}>
          👤 Perfil
        </Text>

        {/* Estado de autenticación */}
        <View className="w-full p-6 mb-6 rounded-2xl" style={{ backgroundColor: colors.backgroundSecondary }}>
          <Text className="mb-4 text-lg font-bold" style={{ color: colors.text }}>
            🔐 Autenticación
          </Text>

          {!isAuthenticated ? (
            <Pressable
              onPress={performLogin}
              disabled={isLoading}
              className="py-3 px-6 rounded-xl"
              style={{ backgroundColor: isLoading ? colors.textMuted : colors.primary }}
            >
              <Text className="font-semibold text-center text-white">{isLoading ? 'Autenticando...' : '🔑 Iniciar Sesión'}</Text>
            </Pressable>
          ) : (
            <View>
              <View className="p-4 mb-4 rounded-xl" style={{ backgroundColor: colors.success + '20' }}>
                <Text className="font-semibold" style={{ color: colors.success }}>
                  ✅ Sesión activa
                </Text>
              </View>

              <Pressable onPress={logout} className="py-3 px-6 rounded-xl" style={{ backgroundColor: colors.error }}>
                <Text className="font-semibold text-center text-white">🚪 Cerrar Sesión</Text>
              </Pressable>
            </View>
          )}

          {isLoading && (
            <View className="flex-row items-center justify-center py-4">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}

          {error && (
            <View className="p-4 mt-4 rounded-xl" style={{ backgroundColor: colors.error + '20' }}>
              <Text className="mb-2 font-semibold" style={{ color: colors.error }}>
                ❌ Error:
              </Text>
              <Text className="text-sm" style={{ color: colors.error }}>
                {error}
              </Text>
            </View>
          )}
        </View>

        {/* Sección de Contactos */}
        {isAuthenticated && (
          <View className="w-full p-6 mb-6 rounded-2xl" style={{ backgroundColor: colors.backgroundSecondary }}>
            <Text className="mb-4 text-lg font-bold" style={{ color: colors.text }}>
              📋 Contactos
            </Text>

            <Pressable
              onPress={loadContacts}
              disabled={isLoadingContacts}
              className="py-3 px-6 rounded-xl mb-4"
              style={{ backgroundColor: isLoadingContacts ? colors.textMuted : colors.tint }}
            >
              <Text className="font-semibold text-center text-white">{isLoadingContacts ? 'Cargando...' : '📥 Cargar Contactos'}</Text>
            </Pressable>

            {isLoadingContacts && (
              <View className="py-4">
                <ActivityIndicator size="large" color={colors.tint} />
              </View>
            )}

            {contacts.length > 0 && (
              <View className="mt-2">
                <Text className="mb-3 text-sm" style={{ color: colors.textSecondary }}>
                  {contacts.length} contactos encontrados
                </Text>

                {contacts.map((contact) => (
                  <View key={contact.id} className="p-4 mb-3 rounded-xl" style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                    <Text className="mb-1 text-base font-semibold" style={{ color: colors.text }}>
                      {contact.name} {contact.surname1} {contact.surname2}
                    </Text>
                    {contact.email && (
                      <Text className="text-sm" style={{ color: colors.textSecondary }}>
                        ✉️ {contact.email}
                      </Text>
                    )}
                    {contact.phone && (
                      <Text className="text-sm" style={{ color: colors.textSecondary }}>
                        📞 {contact.phone}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
