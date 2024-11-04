import Map from './Map'
import { View } from 'react-native'
import { BaseIcon } from './base/base'
import { Marker, Circle } from 'react-native-maps'
import colors from '../../colors'
import { SERVICED_AREA_RADIUS, SERVICED_AREA_CENTER } from '../../servicedArea'

const SelectPointMap = ({ points = [], directions, currentLocation, place, onRegionChange = () => {} }) => {
  let latitudeDelta = 50
  let longitudeDelta = 50
  let latitude = 0
  let longitude = 0
  const markers = []

  //zoom in map when either route's origin or user's location is present bacause then we have a point to put on a map
  if (place || currentLocation) {
    latitudeDelta = 0.005
    longitudeDelta = 0.005
  }

  //if we have access to user's location, put a pin on a map and zoom on it on a map
  if (currentLocation) {
    const { latitude: currentLatitude, longitude: currentLongitude } = currentLocation.coords

    latitude = currentLatitude
    longitude = currentLongitude

    markers.push(
      <Marker key="currentLocation" identifier="currentLocation" coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}>
        <BaseIcon name="map-marker" size={48} color={colors.currentLocationMarker} />
      </Marker>
    )
  }

  if (points.length) {
    for (const point of points) {
      if (!point) continue

      const { latitude: pointLatitude, longitude: pointLongitude } = point
      markers.push(<Marker key={point.name} identifier={point.name} coordinate={{ latitude: pointLatitude, longitude: pointLongitude }} />)
    }
  }

  return (
    <Map
      onRegionChange={onRegionChange}
      animateToRegion={place ? { ...place, latitudeDelta, longitudeDelta } : null}
      rounded
      directions={directions}
      markers={markers}
      region={{
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }}
    >
      <Circle
        strokeColor={colors.primary}
        strokeWidth={5}
        fillColor="rgba(255,255,255,0.25)"
        radius={SERVICED_AREA_RADIUS - SERVICED_AREA_RADIUS * 0.01}
        center={SERVICED_AREA_CENTER}
      />
      <View className="flex-1 justify-center items-center" pointerEvents="none">
        <BaseIcon name="crosshairs-gps" color="red" />
      </View>
    </Map>
  )
}

export default SelectPointMap
