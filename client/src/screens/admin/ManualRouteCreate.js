import { View, TouchableOpacity, Text } from 'react-native'
import { BaseTitle, ScreenWrapper, BaseButton } from '../../components/base/base'
import PlacesInput from '../../components/PlacesInput'
import PhoneInput from '../../components/PhoneInput'
import { useState } from 'react'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import appApi from '../../api/appApi'
import ModalAdminSelectDriver from '../../components/modals/AdminSelectDriver'
import ModalAdminRoutePreview from '../../components/modals/AdminRoutePreview'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Toast from 'react-native-toast-message'

const ManualRouteCreate = ({ navigation }) => {
  const [isDriversModalVisible, setIsDriversModalVisible] = useState(false)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)
  const [routePreview, setRoutePreview] = useState()
  const getAllDrivers = useAsyncRequest()
  const [allDrivers, setAllDrivers] = useState([])
  const [clientOrigin, setClientOrigin] = useState()
  const [destination, setDestination] = useState()
  const [selectedDriver, setSelectedDriver] = useState({})
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')
  const createRoute = useAsyncRequest()
  const getRoutePreview = useAsyncRequest()

  const openDriversModal = () => {
    setIsDriversModalVisible(true)
    getAllDrivers.send(async () => {
      const response = await appApi.get('/drivers/all')
      setAllDrivers(response.data.drivers)
    })
  }

  const onPlaceSelect = (place, type) => {
    const { lat, lng } = place.geometry.location

    const placeObj = {
      address: place.formatted_address,
      coords: {
        latitude: lat,
        longitude: lng,
      },
    }

    if (type === 'origin') {
      setClientOrigin(placeObj)
    }
    if (type === 'destination') {
      setDestination(placeObj)
    }
  }

  const selectDriver = driver => {
    if (!driver.isAvailable) {
      return
    }
    setSelectedDriver(driver)
  }

  const onFormSubmit = () => {
    const parsedPhoneNumber = parsePhoneNumberFromString(formattedPhoneNumber)
    let errorMsg = null

    //validate
    if (!clientOrigin) errorMsg = 'Nieprawidłowy punkt startowy'
    if (!destination) errorMsg = 'Nieprawidłowe miejsce docelowe'
    if (!selectedDriver._id) errorMsg = 'Nie wybrano kierowcy'
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) errorMsg = 'Nieprawidłowy numer telefonu'
    if (errorMsg) return Toast.show({ type: 'error', text1: 'Błąd tworzenia trasy', text2: errorMsg })

    setIsPreviewModalVisible(true)
    getRoutePreview.send(async () => {
      const parsedOrigin = `${clientOrigin.coords.latitude}, ${clientOrigin.coords.longitude}`
      const parsedDestination = `${destination.coords.latitude}, ${destination.coords.longitude}`
      const driverId = selectedDriver._id

      const response = await appApi.get(`/routes/preview?origin=${parsedOrigin}&destination=${parsedDestination}&driverId=${driverId}`)
      setRoutePreview({ ...response.data.routePreview, clientOrigin, destination, driver: selectedDriver, clientPhoneNumber: formattedPhoneNumber })
    })
  }

  const onCreateRouteConfirmed = () => {
    createRoute.send(async () => {
      //send request
      await appApi.post('/routes/manual', {
        clientOrigin: `${clientOrigin.coords.latitude}, ${clientOrigin.coords.longitude}`,
        destination: `${destination.coords.latitude}, ${destination.coords.longitude}`,
        driverId: selectedDriver._id,
        clientPhoneNumber: formattedPhoneNumber,
      })

      //clear form
      setClientOrigin(null)
      setDestination(null)
      setSelectedDriver({})
      setPhoneNumber('')

      Toast.show({ type: 'success', text1: 'Dodano trasę', text2: 'Pomyślnie dodano trasę' })
      navigation.navigate('AllRoutes')
    })
  }

  return (
    <ScreenWrapper>
      {isDriversModalVisible ? (
        <ModalAdminSelectDriver
          isVisible={isDriversModalVisible}
          onClose={() => setIsDriversModalVisible(false)}
          onBtnPress={() => setIsDriversModalVisible(false)}
          allDrivers={allDrivers}
          isLoading={getAllDrivers.isLoading}
          selectedDriver={selectedDriver}
          selectDriver={selectDriver}
        />
      ) : null}
      {isPreviewModalVisible ? (
        <ModalAdminRoutePreview
          isLoading={getRoutePreview.isLoading}
          isVisible={isPreviewModalVisible}
          onClose={() => setIsPreviewModalVisible(false)}
          onBtnPress={onCreateRouteConfirmed}
          route={routePreview}
        />
      ) : null}

      <View className="mt-16">
        <BaseTitle>Dodaj trasę</BaseTitle>
        <View style={{ gap: 16 }} className="mt-4">
          <PlacesInput onPlaceSelect={(data, details) => onPlaceSelect(details, 'origin')} placeholder="Punkt startowy" />
          <PlacesInput onPlaceSelect={(data, details) => onPlaceSelect(details, 'destination')} placeholder="Miejsce docelowe" />
          <TouchableOpacity onPress={openDriversModal} className="rounded-md bg-lightGray px-4 py-3 ">
            <Text className="text-[16px]">{selectedDriver._id ? `${selectedDriver.name} (${selectedDriver.licensePlate})` : 'Wybierz kierowcę'}</Text>
          </TouchableOpacity>
          <PhoneInput
            placeholder="Numer telefonu klienta"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onChangeFormattedText={setFormattedPhoneNumber}
          />
          <BaseButton isLoading={createRoute.isLoading} onPress={onFormSubmit} title="Dodaj trasę" />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default ManualRouteCreate
