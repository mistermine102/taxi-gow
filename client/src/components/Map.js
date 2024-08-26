import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useEffect, useRef } from 'react'

const Map = ({ directions }) => {
  const { origin, destination } = directions
  const mapRef = useRef()

  useEffect(() => {
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
  }, [origin, destination])

  return (
    <MapView ref={mapRef} className="h-[300px]" style={{ borderRadius: 8 }}>
      {origin ? <Marker identifier="origin" coordinate={{ latitude: origin.latitude, longitude: origin.longitude }} /> : null}
      {destination ? <Marker identifier="destination" coordinate={{ latitude: destination.latitude, longitude: destination.longitude }} /> : null}
      {origin && destination ? <MapViewDirections origin={origin} destination={destination} apikey={process.env.GOOGLE_PLACES_API_KEY} /> : null}
    </MapView>
  )
}

export default Map
