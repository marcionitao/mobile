/* eslint-disable camelcase */
// ficheiro responsavel pelas rotas da aplicação
import { Stack } from 'expo-router'
import { colors } from '@/styles/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik'
import { Loading } from '@/components/loading'

export default function Layout() {
  // usando as fontes
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
  })

  // caso as fontes ainda nao estao carregadas(as fontes são assincronas), chame o componente Loading
  if (!fontsLoaded) return <Loading />

  return (
    // aplicando "GestureHandlerRootView" para permitir o uso de gestos na "Home"
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[100] },
        }}
      />
    </GestureHandlerRootView>
  )
}
