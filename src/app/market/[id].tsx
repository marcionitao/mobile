import { useEffect, useState, useRef } from 'react'
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { View, Alert, Modal, StatusBar, ScrollView } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { PropsDetails, Details } from '@/components/market/details'

import { api } from '@/services/api'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  // criando um estado para armazenar os dados do local
  const [data, setData] = useState<DataProps>()
  const [isLoading, setLoading] = useState(true)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [coupunIsFetching, setCouponIsFetching] = useState(false)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)

  // pegando a permissão para usar a camera
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, requestPermission] = useCameraPermissions()
  // recuperando o id da rota
  const params = useLocalSearchParams<{ id: string }>()

  const qrLock = useRef(false)
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

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()
      if (!granted) {
        return Alert.alert('Camera', 'Permission denied')
      }
      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert('Camera', 'could not open camera')
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)
      const { data } = await api.patch('/coupons/' + id)
      Alert.alert('Coupon', data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Could not get coupon')
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)
    Alert.alert('Coupon', 'Do you want to use this coupon?', [
      {
        style: 'cancel',
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => getCoupon(id),
      },
    ])
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Read QR Code</Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={coupunIsFetching}
          >
            <Button.Title>Back</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
