import { useEffect, useState } from 'react'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { View, Alert } from 'react-native'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { PropsDetails, Details } from '@/components/market/details'

import { api } from '@/services/api'

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  // criando um estado para armazenar os dados do local
  const [data, setData] = useState<DataProps>()
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

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={data.cover} />

      <Details data={data} />
    </View>
  )
}
