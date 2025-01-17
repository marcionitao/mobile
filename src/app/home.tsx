import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

type MarketProps = PlaceProps

// definindo propriedades para o maps
const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState('')
  const [markets, setMarkets] = useState<MarketProps[]>([])
  // para futura utilização e obter a localizacao do usuario
  const [atualLocation, setAtualLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0].id) // a primeira categoria da lista é a padrão
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao carregar as categorias')
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return
      }
      const { data } = await api.get('/markets/category/' + category)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Locations', 'could not load locations')
    }
  }

  // pegar a localizacao do usuario (não está a ser usado)
  async function getCurrentLocation() {
    try {
      // garantir se o usuario aceita a permissao de localizacao
      const { granted } = await Location.requestForegroundPermissionsAsync()
      // se o usuario aceitar a permissao de localizacao
      if (granted) {
        const location = await Location.getCurrentPositionAsync()
        setAtualLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        console.log(atualLocation)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentLocation()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: '#257F49' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          // latitude: atualLocation.latitude,
          // longitude: atualLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      <Places data={markets} />
    </View>
  )
}
