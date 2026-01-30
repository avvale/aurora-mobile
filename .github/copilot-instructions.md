# Aurora Mobile - Expo React Native Template

## Stack del Proyecto

- **Framework**: Expo SDK 54 + React 19.1.0
- **Styling**: NativeWind v4.2.1 + Tailwind CSS 3.4.19
- **GraphQL**: Apollo Client 4.1.2 con autenticación OAuth
- **Navegación**: Expo Router 6 con tabs
- **Arquitectura**: MVVM estricto (Model-View-ViewModel)

Intentar mantener el proyecto lo mas actualizado posible con las últimas versiones estables de las librerías.

## Arquitectura MVVM Obligatoria

**Regla fundamental**: Cada pantalla = 4 archivos (Router → View → ViewModel → Model)

### 1. Router (`app/**/*.tsx`)

Solo importa y renderiza la View. Cero lógica.

```tsx
// app/(tabs)/profile.tsx
import { ProfileView } from '@/views/ProfileView';
export default function ProfileScreen() {
  return <ProfileView />;
}
```

### 2. View (`src/views/**View.tsx`)

UI pura. Consume ViewModel + Colors. Solo `style={{}}` inline para temas.

```tsx
export function ProfileView() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { state, action } = useProfileViewModel(); // ViewModel hook

  return (
    <View style={{ backgroundColor: colors.background }}>
      {/* Mix de className (Tailwind) + style (tema) */}
      <Text className="text-lg font-bold" style={{ color: colors.text }}>
        {state}
      </Text>
    </View>
  );
}
```

### 3. ViewModel (`src/viewmodels/use**ViewModel.ts`)

Lógica de negocio como hook.

```tsx
export function useProfileViewModel() {
  const [state, setState] = useState<ProfileState>({
    isLoading: false,
    data: null,
  });

  const loadData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const result = await service.getData();
    setState((prev) => ({ ...prev, isLoading: false, data: result }));
  };

  return { ...state, loadData }; // Flat return, no nested objects
}
```

### 4. Model (`src/models/dto/**DTO.ts`)

Solo interfaces TypeScript. Sin lógica.

```tsx
export interface UserDTO {
  id: string;
  name: string;
}
```

## Sistema de Colores Centralizado

**Archivo único**: `src/constants/colors.ts` con paleta light/dark completa.

```tsx
// Uso en Views (NUNCA usar hex directamente)
const colors = Colors[colorScheme ?? 'light'];
<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Hola</Text>
</View>;
```

Colores disponibles: `text`, `textSecondary`, `textMuted`, `background`, `backgroundSecondary`, `card`, `primary`, `success`, `warning`, `error`, `inputBackground`, `inputBorder`, `placeholder`, `border`, `separator`, `tint`, `icon`, `tabIconDefault`, `tabIconSelected`, `tabBarBackground`, `tabBarBorder`.

## GraphQL con Apollo Client

**Setup dual auth**: Basic Auth (OAuth app) + Bearer token (usuario).

- Cliente: `src/services/graphql/client.ts` con `apolloClient`
- Auth helpers: `setAuthToken(token)`, `clearAuthToken()`, `resetApolloStore()`
- Services: `src/services/graphql/[domain]/[entity]_service.ts`

```tsx
// Ejemplo: src/services/graphql/iam/permission_service.ts
import { apolloClient } from '@/services/graphql/client';
import { PERMISSIONS_QUERY } from './queries';

export async function getPermissions(): Promise<Permission[]> {
  const { data } = await apolloClient.query({
    query: PERMISSIONS_QUERY,
  });
  return data.iamPaginatePermissions.rows;
}
```

## Componentes Reutilizables (@aurora)

Librería interna en `src/@aurora/` para componentes generalizados (sin dependencias del proyecto).

**Ejemplo**: `DatePickerInput` - Date picker cross-platform con colores/textos configurables.

```tsx
// Requiere: npm install @react-native-community/datetimepicker
<DatePickerInput
  value={date}
  onChange={setDate}
  colors={{ ...colors }} // Mapeo de Colors
  texts={{ cancel: 'Cancelar', confirm: 'Confirmar' }}
/>
```

## Navegación y UI

- **Tabs**: Usar `Ionicons` de `@expo/vector-icons` (no IconSymbol limitado)
- **TabLayout**: Ya configurado con Colors en `app/(tabs)/_layout.tsx`
- **SafeAreaView warning**: Suprimido en `app/_layout.tsx` con `LogBox.ignoreLogs`

## Path Aliases

```tsx
import { HomeView } from '@/views/HomeView'; // src/*
import { DatePicker } from '@/@aurora/components'; // src/@aurora/*
```

## Comandos Importantes

```bash
npx expo start                    # Dev server
npx expo start --ios              # iOS simulator
npx expo start --android          # Android emulator
npx expo start --clear            # Limpiar caché
lsof -ti:8081 | xargs kill -9     # Matar Metro Bundler
```

## Reglas Estrictas

1. **NUNCA crear barrel files** (index.ts que re-exporta)
2. **NUNCA usar hex colors directamente** - usar `Colors[colorScheme]`
3. **NUNCA poner lógica en Views** - solo en ViewModels
