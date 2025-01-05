import { Button } from '@/components/button'
import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
// import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'

// SplashScreen.preventAutoHideAsync()

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />
      <Button>
        <Button.Title>Get Started</Button.Title>
      </Button>
    </View>
  )
}
