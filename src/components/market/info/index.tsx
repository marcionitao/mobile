import { Text, View } from 'react-native'
import { IconProps, Icon } from '@tabler/icons-react-native'

import { s } from './styles'
import { colors } from '@/styles/theme'
import React from 'react'

type Props = {
  description: string
  icon: React.ComponentType<IconProps> // passando um tipo de componente para a propriedade "icon"
}

export function Info({ description, icon: Icon }: Props) {
  return (
    <View style={s.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={s.text}>{description}</Text>
    </View>
  )
}
