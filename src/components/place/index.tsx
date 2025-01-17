import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { IconTicket } from '@tabler/icons-react-native'

import { s } from './styles'
import { colors } from '@/styles/theme'

export type PlaceProps = {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}
// O "TouchableOpacityProps", permitem controlar o comportamento e a aparência do componente TouchableOpacity
type Props = TouchableOpacityProps & {
  data: PlaceProps
}

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <Image style={s.image} source={{ uri: data.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.description} numberOfLines={2}>
          {/* numberOfLines para limitar o número de linhas */}
          {data.description}
        </Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.tickets}>{data.coupons} coupons available</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
