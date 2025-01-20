import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, Alert } from 'react-native'

import { Loading } from '@/components/loading'

import { api } from '@/services/api'
import { isLoading } from 'expo-font'

export default function Market() {
  // criando um estado para armazenar os dados do local
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  // recuperando o id da rota
  const params = useLocalSearchParams<{ id: string }>()
  // função para buscar os dados do local
  async function fetchMarket() {
    try {
      // buscando os dados do local
      const { data } = await api.get('/markets/' + params.id)
      setData(data)
      // depois que os dados foram carregados, mudamos o estado de isLoading para false
      setLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert('Locations', 'could not load locations', [
        { text: 'OK', onPress: () => router.back() },
      ])
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Market {params.id}</Text>
    </View>
  )
}
