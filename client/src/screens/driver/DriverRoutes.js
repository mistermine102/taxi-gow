import { BaseButton, BaseTitle, ScreenWrapper } from '../../components/base/base'
import appApi from '../../api/appApi'
import { useEffect, useState } from 'react'
import RouteItem from '../../components/RouteItem'
import { useIsFocused } from '@react-navigation/native'
import { View } from 'react-native'

const DriverRoutes = () => {
  const [route, setRoute] = useState()
  const [btnCaption, setBtnCaption] = useState()
  const [btnFunction, setBtnFunction] = useState()
  const isFocused = useIsFocused()

  const updateButton = (statusId, routeId) => {
    const uri = `/routes/${routeId}`
    let newBtnCaption = ''
    let newStatusId = null

    //check route status
    switch (statusId) {
      case 1:
        newBtnCaption = 'Rozpocznij'
        newStatusId = 2
        break
      case 2:
        newBtnCaption = 'Dotarłem po klienta'
        newStatusId = 3
        break
      case 3:
        newBtnCaption = 'Dotarłem do punktu docelowego'
        newStatusId = 4
        break
      case 4:
        newBtnCaption = 'Zakończ trasę'
        newStatusId = 5
        break
      default:
        break
    }
    setBtnCaption(newBtnCaption)
    setBtnFunction(() => async () => {
      const response = await appApi.patch(uri, {
        newStatusId,
      })

      const { route: newRoute } = response.data
      newRoute.statusId === 5 ? setRoute(null) : setRoute(newRoute)
    })
  }

  useEffect(() => {
    if (!isFocused) return

    const getRoutes = async () => {
      try {
        const response = await appApi.get('/users/route')
        if (!response.data.route) return

        const { statusId, _id } = response.data.route

        updateButton(statusId, _id)
        setRoute(response.data.route)
      } catch (err) {
        console.log(err)
      }
    }
    getRoutes()
  }, [isFocused])

  useEffect(() => {
    if (!route) return

    const { statusId, _id } = route
    updateButton(statusId, _id)
  }, [route])

  if (!route) return null

  return (
    <ScreenWrapper>
      <View className="mt-16 mb-4">
        <BaseTitle>Trasy</BaseTitle>
      </View>
      <RouteItem
        userType="driver"
        name={route.clientId}
        status={route.statusId}
        origin={route.clientOrigin.address}
        destination={route.destination.address}
      >
        <BaseButton title={btnCaption} onPress={btnFunction} />
        <BaseButton alt title="Zobacz na mapie" />
      </RouteItem>
    </ScreenWrapper>
  )
}
export default DriverRoutes
