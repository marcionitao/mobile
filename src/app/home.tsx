import { useEffect, useState } from 'react'
import { Alert, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import { router } from 'expo-router'

import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

import { api } from '@/services/api'
import { colors, fontFamily } from '@/styles/theme'

// como "PlaceProps" não possue as propriedades necessarias para o maps(latitude e longitude), adicionamos
type MarketProps = PlaceProps & {
  latitude: number
  longitude: number
}

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
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />
        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            image={require('@/assets/ping.png')}
          >
            <Callout
              onPress={
                () =>
                  router.navigate({
                    pathname: '/market/:id',
                    params: { id: item.id },
                  }) // redireciona para a rota market/:id ao clicar no pin do mapa
              }
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
