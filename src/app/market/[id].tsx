import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Market() {
  // recuperando o id da rota
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Market {params.id}</Text>
    </View>
  )
}
