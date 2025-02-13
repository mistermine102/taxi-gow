import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View } from 'react-native'
import { SERVICED_AREA_CENTER, SERVICED_AREA_RADIUS } from '../../servicedArea.js'
import Toast from 'react-native-toast-message'
import Loader from '../components/Loader.js'

const PlacesInput = ({ placeholder, onPlaceSelect }) => {
  return (
    <View>
      <GooglePlacesAutocomplete
        styles={{ container: { flex: 0 }, textInput: { backgroundColor: '#EDEDED', paddingVertical: 10, height: '100%' } }}
        placeholder={placeholder}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        timeout={5000}
        listLoaderComponent={<Loader />}
        onTimeout={() => Toast.show({ type: 'error', text1: 'Nie udało się wyszukać miejsc' })}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={onPlaceSelect}
        query={{
          key: process.env.GOOGLE_PLACES_API_KEY,
          language: 'pl',
          rankby: 'distance',
          radius: SERVICED_AREA_RADIUS,
          strictbounds: true,
          location: `${SERVICED_AREA_CENTER.latitude}, ${SERVICED_AREA_CENTER.longitude}`,
        }}
      />
    </View>
  )
}

export default PlacesInput
