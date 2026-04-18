# Aurora Mobile — CLAUDE.md

## Stack — notas no obvias

Expo Router 6 (file-based, tabs), Uniwind + Tailwind v4, Apollo Client 4, react-native-reanimated 4, TypeScript 5.9. Versiones exactas → `package.json`.

- **Estado global — sin decidir**: `src/state/todo-elegir-proveedor-estados-globales.txt` anota "preferiblemente zustand", pero **Zustand no está instalado**. Confirmar con el usuario antes de asumirlo.
- **Sin testing framework instalado**. Si piden tests, preguntar stack (Jest + RNTL es lo estándar en Expo).

## Arquitectura MVVM — regla fundamental

Cada pantalla = 4 archivos. No mezclar responsabilidades.

```
app/(tabs)/<screen>.tsx                → Router (solo importa+renderiza la View)
src/views/<screen>.view.tsx            → View (UI pura, consume ViewModel)
src/viewmodels/<screen>.view-model.ts  → ViewModel (hook: estado + lógica)
src/models/dto/<entity>.dto.ts         → Model — transporte / API
src/models/domain/<entity>.model.ts    → Model — dominio
```

**Router** — una línea:

```tsx
import { ProfileView } from '@/views/profile.view';
export default function ProfileScreen() {
  return <ProfileView />;
}
```

**View** — sólo UI + clases Tailwind:

```tsx
export function ProfileView() {
  const { data, isLoading } = useProfileViewModel();
  return <View className="flex-1 bg-background">{/* ... */}</View>;
}
```

**ViewModel** — hook con return plano:

```tsx
export function useProfileViewModel() {
  const [state, setState] = useState<ProfileState>({ isLoading: false, data: null });
  const loadData = async () => {
    /* ... */
  };
  return { ...state, loadData };
}
```

**Model** — sólo tipos. Dos carpetas: `dto/` para lo que entra/sale de la API (sufijo `.dto.ts`) y `domain/` para entidades de dominio que la app consume (sufijo `.model.ts`). Si el tipo sólo vive en la respuesta del backend → `dto`. Si representa algo que las Views/ViewModels manipulan como modelo conceptual → `domain`.

## Skills — triggers para invocar antes de editar

| Área tocada / palabra clave                                | Skill a invocar              |
| ---------------------------------------------------------- | ---------------------------- |
| `src/services/graphql/**`, queries, mutations, auth Apollo | `apollo-client`              |
| `fetch`/`axios`/REST/subida de archivos a APIs no-GraphQL  | `native-data-fetching`       |
| `app/**`, navegación, tabs, stacks, screens                | `building-native-ui`         |
| `global.css`, `withUniwind`, variants, tokens CSS          | `uniwind`                    |
| Subida de SDK de Expo                                      | `upgrading-expo`             |
| Release a stores (App Store / Play Store / web hosting)    | `expo-deployment`            |
| EAS workflows YAML                                         | `expo-cicd-workflows`        |
| Patrones RN generales                                      | `vercel-react-native-skills` |

Para trabajo no trivial: `superpowers:brainstorming` → `superpowers:writing-plans` → implementar.
Antes de declarar algo completo: `superpowers:verification-before-completion`.

## Colores — Uniwind + tokens CSS

Fuente única: `global.css` → `@layer theme { :root { @variant light { … } @variant dark { … } } }`. **Ambos variants deben definir las mismas variables** o Uniwind peta en runtime. Tokens se usan como `bg-<token>`, `text-<token>`, `border-<token>`; la lista vive en `global.css`. Detalle fino → skill `uniwind`.

**Preferido — clases con tokens (auto light/dark):**

```tsx
<View className="flex-1 bg-background">
  <Pressable className="rounded-xl bg-primary px-6 py-3">
    <Text className="text-white">Acción</Text>
  </Pressable>
</View>
```

**Props no-style** (`color`, `tintColor`, `backgroundColor`) — usar `colorClassName`/`tintColorClassName` con `accent-*`:

```tsx
<ActivityIndicator colorClassName="accent-primary" />
<Image tintColorClassName="accent-text-muted" />
```

**Valores dinámicos / JS** (`app/(tabs)/_layout.tsx`, config de react-navigation) — hooks de Uniwind:

```tsx
import { useResolveClassNames } from 'uniwind';
const tabBarStyle = useResolveClassNames('bg-tab-bar-background border-tab-bar-border');
```

**`withUniwind`** — sólo para librerías de terceros sin soporte de `className` (expo-image, etc.). Envolver **una sola vez** a nivel de módulo (p.ej. `src/components/ui/styled.ts`). No envolver componentes de `react-native` ni `react-native-reanimated` — ya aceptan `className`.

**`cn` helper** (`src/utils/cn.ts`, `clsx` + `tailwind-merge`) — Uniwind no deduplica, así que usar `cn` con condicionales o al mergear `props.className`:

```tsx
import { cn } from '@/utils/cn';
<View className={cn('p-4 bg-background', isActive && 'border-2 border-primary', props.className)} />;
```

## GraphQL / Apollo

- Cliente único: `src/services/graphql/client.ts`
- Auth helpers: `setAuthToken(token)`, `clearAuthToken()`, `resetApolloStore()`
- Services por dominio: `src/services/graphql/[domain]/[entity]_service.ts`
- **Antes de tocar queries, mutations o auth → invocar skill `apollo-client`.**

## Componentes `@aurora`

`src/@aurora/` — librería interna genérica, sin dependencias del dominio. Recibe `colors`/`texts` por props. **Se trata como lib separada: no importar nada del proyecto hacia dentro de `@aurora`**.

## Path aliases (`tsconfig.json`)

```tsx
import { HomeView } from '@/views/home.view'; // src/*
import { DatePicker } from '@aurora/components/date-picker'; // src/@aurora/*
import '@root/global.css'; // raíz del repo
```

## Comandos

```bash
npm start                             # expo start
npm run ios                           # expo start --ios
npm run android                       # expo start --android
npm run lint                          # expo lint (eslint)
npx expo start --clear                # limpiar caché Metro (tras tocar global.css)
lsof -ti:8081 | xargs kill -9         # matar Metro colgado
npm run build:preview:android         # EAS build local (Android) — APK preview interno
npm run build:production:android      # EAS build local (Android) — AAB para Play Store
npm run build:production:ios          # EAS build local (iOS) — para App Store
```

## Reglas estrictas — NUNCA

1. Crear **barrel files** (`index.ts` que sólo re-exporta).
2. Usar **hex directo** en Views — siempre tokens (`bg-primary`) o `useCSSVariable` / `useResolveClassNames`.
3. Poner **lógica en Views** — va en ViewModels o stores globales.
4. **Mezclar responsabilidades** MVVM (Router ≠ View ≠ ViewModel ≠ Model).
5. Añadir `light:` / `dark:` explícitos si ya existe un token — los tokens cambian solos con el tema.
6. Hacer fetch/red fuera de `src/services/`.
7. Dejar variables en sólo un variant (light XOR dark) — Uniwind peta en runtime.
8. Hacer commits sin que el usuario lo pida explícitamente.

## Flujo esperado del agente

1. Leer esta guía antes de actuar.
2. Si el área tocada tiene skill asociada → invocarla **antes** de editar.
3. Trabajo no trivial → `superpowers:brainstorming` / `superpowers:writing-plans` primero.
4. Antes de declarar algo completo → `superpowers:verification-before-completion`.
5. Commits sólo cuando el usuario lo pida.
