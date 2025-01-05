import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  ActivityIndicator,
} from 'react-native'
import { IconProps as TablerIconProps } from '@tabler/icons-react-native'

import { s } from './styles'
import { colors } from '@/styles/theme'

// Definindo tipos c/ todas as propriedades de TouchableOpacity
type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

// A função Button é um componente que recebe children como propriedade. children representa o que está dentro do componente quando ele é usado.
// Dentro do componente, ele retorna um TouchableOpacity, que é o botão em si, e exibe o conteúdo passado como children.
function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest} // passando todas as propriedades restantes para o TouchableOpacity
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

// A função Title é outro componente que também recebe children e simplesmente retorna um componente Text, exibindo o texto que foi passado.
function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>
}

// passando um tipo de componente para a propriedade "icon"
type IconProps = {
  icon: React.ComponentType<TablerIconProps>
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

// A linha Button.Title = Title cria uma relação entre o componente Button e o componente Title, permitindo que Title seja acessado como uma propriedade do Button. Isso significa que você pode usar Button.Title para renderizar um título dentro do botão.
Button.Title = Title
Button.Icon = Icon

export { Button }
