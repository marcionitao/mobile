/* eslint-disable camelcase */
// ficheiro responsavel pelas rotas da aplicação
import { Stack } from 'expo-router'
import { colors } from '@/styles/theme'

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik'

export default function Layout() {
  // usando as fontes
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
  })

  // caso as fontes ainda nao estao carregadas
  if (!fontsLoaded) return null

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.gray[100] },
      }}
    />
  )
}
