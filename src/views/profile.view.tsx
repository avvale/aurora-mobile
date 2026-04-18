import { cn } from '@/utils/cn';
import { useProfileViewModel } from '@/viewmodels/profile.view-model';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

export function ProfileView() {
  const { isLoading, isLoadingContacts, isAuthenticated, contacts, error, performLogin, loadContacts, logout } = useProfileViewModel();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 pt-16">
        <Text className="mb-8 text-2xl font-bold text-center text-text">👤 Perfil</Text>

        {/* Estado de autenticación */}
        <View className="w-full p-6 mb-6 rounded-2xl bg-background-secondary">
          <Text className="mb-4 text-lg font-bold text-text">🔐 Autenticación</Text>

          {!isAuthenticated ? (
            <Pressable
              onPress={performLogin}
              disabled={isLoading}
              className={cn('py-3 px-6 rounded-xl', isLoading ? 'bg-text-muted' : 'bg-primary')}
            >
              <Text className="font-semibold text-center text-white">
                {isLoading ? 'Autenticando...' : '🔑 Iniciar Sesión'}
              </Text>
            </Pressable>
          ) : (
            <View>
              <View className="p-4 mb-4 rounded-xl bg-success/20">
                <Text className="font-semibold text-success">✅ Sesión activa</Text>
              </View>

              <Pressable onPress={logout} className="py-3 px-6 rounded-xl bg-error">
                <Text className="font-semibold text-center text-white">🚪 Cerrar Sesión</Text>
              </Pressable>
            </View>
          )}

          {isLoading && (
            <View className="flex-row items-center justify-center py-4">
              <ActivityIndicator size="large" colorClassName="accent-primary" />
            </View>
          )}

          {error && (
            <View className="p-4 mt-4 rounded-xl bg-error/20">
              <Text className="mb-2 font-semibold text-error">❌ Error:</Text>
              <Text className="text-sm text-error">{error}</Text>
            </View>
          )}
        </View>

        {/* Sección de Contactos */}
        {isAuthenticated && (
          <View className="w-full p-6 mb-6 rounded-2xl bg-background-secondary">
            <Text className="mb-4 text-lg font-bold text-text">📋 Contactos</Text>

            <Pressable
              onPress={loadContacts}
              disabled={isLoadingContacts}
              className={cn('py-3 px-6 rounded-xl mb-4', isLoadingContacts ? 'bg-text-muted' : 'bg-tint')}
            >
              <Text className="font-semibold text-center text-white">
                {isLoadingContacts ? 'Cargando...' : '📥 Cargar Contactos'}
              </Text>
            </Pressable>

            {isLoadingContacts && (
              <View className="py-4">
                <ActivityIndicator size="large" colorClassName="accent-tint" />
              </View>
            )}

            {contacts.length > 0 && (
              <View className="mt-2">
                <Text className="mb-3 text-sm text-text-secondary">{contacts.length} contactos encontrados</Text>

                {contacts.map((contact) => (
                  <View key={contact.id} className="p-4 mb-3 rounded-xl bg-card border border-border">
                    <Text className="mb-1 text-base font-semibold text-text">
                      {contact.name} {contact.surname1} {contact.surname2}
                    </Text>
                    {contact.email && <Text className="text-sm text-text-secondary">✉️ {contact.email}</Text>}
                    {contact.phone && <Text className="text-sm text-text-secondary">📞 {contact.phone}</Text>}
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
