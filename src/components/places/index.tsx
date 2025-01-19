import { useRef } from 'react'
import { useWindowDimensions, Text } from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { Place, PlaceProps } from '../place'
import { s } from './styles'

type Props = {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions() // useWindowDimensions para pegar as dimensões da tela
  const bottomSheetRef = useRef<BottomSheet>(null)
  // pegando as dimensões da tela de maneira dinâmica
  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            // onPress={() => router.navigate(`/market/${item.id}` as never)}
            onPress={() =>
              router.navigate({
                pathname: '/market/:id',
                params: { id: item.id },
              })
            }
          />
        )} // ao clicar no item, o valor do 'id' é passado por params para o componente [id].tsx
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locations near you</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
