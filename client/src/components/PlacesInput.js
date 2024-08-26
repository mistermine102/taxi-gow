import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View } from 'react-native'

const PlacesInput = ({ placeholder, onPlaceSelect }) => {
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
        }}
      />
    </View>
  )
}

export default PlacesInput
