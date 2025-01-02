import * as SplashScreen from 'expo-splash-screen'
import { View, Text } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function Index() {
  return (
    <View>
      <Text>hello</Text>
    </View>
  )
}
