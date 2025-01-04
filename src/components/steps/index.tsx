import { View, Text } from 'react-native'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
import { s } from './styles'
import { Step } from '../step'

export function Steps() {
  return (
    <View style={s.container}>
      <Text style={s.title}>See how it works:</Text>

      <Step
        icon={IconMapPin}
        title="Find establishments"
        description="See places near you that are Nahebei partners"
      />
      <Step
        icon={IconQrcode}
        title="Activate coupon with QR code"
        description="I scanned the code in the store to use the benefit"
      />
      <Step
        icon={IconTicket}
        title="Secure advantages near you"
        description="Activate coupons wherever you are, in different types of establishments"
      />
    </View>
  )
}
