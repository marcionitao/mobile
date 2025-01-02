import { ActivityIndicator } from 'react-native'

import { s } from './styles'
import { colors } from '@/styles/theme'

export function Loading() {
  // "ActivityIndicator" é um componente nativo do react native que mostra um indicador de carregamento
  return (
    <ActivityIndicator
      size="large"
      color={colors.green.base}
      style={s.container}
    />
  )
}
