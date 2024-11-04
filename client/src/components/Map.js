import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useEffect, useRef } from 'react'
import colors from '../../colors'

const Map = ({
  children,
  directions = {},
  markers = [],
  height = 300,
  rounded = false,
  region = {},
  onRegionChange = () => {},
  animateToRegion = null,
}) => {
  const { origin, destination } = directions
  const mapRef = useRef()

  useEffect(() => {
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
  }, [origin, destination])

  useEffect(() => {
    if (!animateToRegion) return

    const { latitude, longitude } = animateToRegion

    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
      },
      1000
    )
  }, [animateToRegion?.latitude, animateToRegion?.longitude])

  return (
    <MapView
      onRegionChange={onRegionChange}
      customMapStyle={[
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#242f3e',
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#ffffff',
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#000000',
            },
          ],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#ffffff',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#ffffff',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#263c3f',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#6b9a76',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#38414e',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#212a37',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9ca5b3',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#746855',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#1f2835',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#f3d19c',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#2f3948',
            },
          ],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#17263c',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#515c6d',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#17263c',
            },
          ],
        },
      ]}
      key={process.env.GOOGLE_PLACES_API_KEY}
      region={region}
      ref={mapRef}
      style={[{ borderRadius: rounded ? 8 : 0 }, { height }]}
    >
      {markers.map(marker => marker)}
      {origin ? <Marker identifier="origin" coordinate={{ latitude: origin.latitude, longitude: origin.longitude }} /> : null}
      {destination ? <Marker identifier="destination" coordinate={{ latitude: destination.latitude, longitude: destination.longitude }} /> : null}
      {origin && destination ? (
        <MapViewDirections
          strokeWidth={3}
          strokeColor={colors.primary}
          origin={origin}
          destination={destination}
          apikey={process.env.GOOGLE_PLACES_API_KEY}
        />
      ) : null}
      {children}
    </MapView>
  )
}

export default Map
