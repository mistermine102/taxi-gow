import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View } from 'react-native'
import { useEffect, useState } from 'react'
import useLocation from '../hooks/useLocation'

const PlacesInput = ({ placeholder, onPlaceSelect }) => {
  const { location } = useLocation()
  const [parsedLocation, setParsedLocation] = useState()

  useEffect(() => {
    if (!location) return

    const { latitude, longitude } = location.coords
    setParsedLocation(`${latitude},${longitude}`)
  }, [location])

  if (!location) return null

  return (
    <View>
      <GooglePlacesAutocomplete
        styles={{ container: { flex: 0 }, textInput: { backgroundColor: '#EDEDED', paddingVertical: 10, height: '100%' } }}
        placeholder={placeholder}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={onPlaceSelect}
        query={{
          key: process.env.GOOGLE_PLACES_API_KEY,
          language: 'pl',
          rankby: 'distance',
          radius: 20000,
          location: parsedLocation,
        }}
      />
    </View>
  )
}

export default PlacesInput
