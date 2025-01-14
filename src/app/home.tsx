import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

type MarketProps = PlaceProps

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState('')
  const [markets, setMarkets] = useState<MarketProps[]>([])

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

  useEffect(() => {
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

      <Places data={markets} />
    </View>
  )
}
