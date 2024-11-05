import { View } from 'react-native'
import SelectPointMap from './SelectPointMap'
import { BaseButton } from './base/base'
import PlacesInput from './PlacesInput'
import { useState } from 'react'
import useLocation from '../hooks/useLocation'

const SelectPointForm = ({
  point = null,
  allPoints = [],
  onPointAdded = () => {},
  onContinue = () => {},
  isContinueButtonLoading = false,
  directions,
}) => {
  const [place, setPlace] = useState()
  const [region, setRegion] = useState()
  const { currentLocation } = useLocation()

  const onPlaceSelect = (data, details) => {
    const { lat, lng } = details.geometry.location
    setPlace({ latitude: lat, longitude: lng })
  }

  return (
    <View>
      <View className="mb-4">
        <PlacesInput placeholder="Wpisz nazwę ulicy" onPlaceSelect={onPlaceSelect} />
      </View>
      <SelectPointMap onRegionChange={r => setRegion(r)} currentLocation={currentLocation} points={allPoints} place={place} directions={directions} />
      <View className="mt-4" style={{ gap: 8 }}>
        <BaseButton alt title="Wybierz" onPress={() => onPointAdded({ latitude: region.latitude, longitude: region.longitude })} />
        {point ? <BaseButton title="Kontynuuj" onPress={onContinue} isLoading={isContinueButtonLoading} /> : null}
      </View>
    </View>
  )
}

export default SelectPointForm
