import { View, Text } from 'react-native'
import { s } from './styles'
import { IconProps } from '@tabler/icons-react-native' // importando o tipo IconProps para usarmos a propriedade "icon"
import { colors } from '@/styles/colors'

type StepProps = {
  title: string
  description: string
  icon: React.ComponentType<IconProps> // passando um tipo de componente para a propriedade "icon"
}

export function Step({ title, description, icon: Icon }: StepProps) {
  return (
    <View style={s.container}>
      {Icon ? <Icon size={32} color={colors.red.base} /> : null}
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  )
}
