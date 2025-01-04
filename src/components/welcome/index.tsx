import { View, Text, Image } from 'react-native'
import { s } from './styles'

export function Welcome() {
  return (
    <View>
      <Image source={require('@/assets/logo.png')} style={s.logo} />
      <Text style={s.title}>Welcome to Nahebei!</Text>
      <Text style={s.subtitle}>
        Get advantage coupons to use in your {'\n'}
        favorite establishments.
      </Text>
    </View>
  )
}
