import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  // estado para a categoria selecionada
  const [category, setCategory] = useState('')

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

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />
    </View>
  )
}
