import { View, Text } from 'react-native'
import { useState, useContext } from 'react'
import AuthContext from '../../context/Auth'
import {
  BaseInput,
  BaseButton,
  BaseLink,
  ScreenWrapper,
  BaseTitle,
} from '../../components/base/base'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import Toast from 'react-native-toast-message'
import EmptyModal from '../../components/modals/EmptyModal'

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState()
  const signInReq = useAsyncRequest()

  const onSubmit = async () => {
    signInReq.send(
      async () => {
        await signin({ email, password })
      },
      (err) => {
        if (err.response) {
          switch (err.response.data.message) {
            case 'USER_NOT_VERIFIED':
              //show modal with resending email option
              setIsVerifyModalVisible(true)
              return
            case 'INVALID_CREDENTIALS':
              return Toast.show({
                type: 'error',
                text1: 'Błąd logowania',
                text2: 'Nieprawidłowy email lub hasło',
              })
            default:
              return Toast.show({
                type: 'error',
                text1: 'Błąd logowania',
                text2: 'Coś poszło nie tak',
              })
          }
        }
      }
    )
  }

  return (
    <ScreenWrapper>
      <EmptyModal isVisible={isVerifyModalVisible}>
        <View className="flex-1 w-full p-4 items-center">
          <BaseTitle>Konto nie zweryfikowane</BaseTitle>
          <View className="flex-1 mt-8">
            <Text>
              Wygląda na to że to konto nie jest zweryfikowane. Kliknij w link
              wysłany na twój adres email aby zweryfikowanć konto.
            </Text>
          </View>
          <View className="flex-row" style={{ gap: 8 }}>
            <View className="flex-1">
              <BaseButton
                onPress={() => setIsVerifyModalVisible(false)}
                alt
                title="Wróć"
              />
            </View>
            <View className="flex-1">
              <BaseButton title="Wyślij email ponownie" />
            </View>
          </View>
        </View>
      </EmptyModal>
      <View className="mt-8">
        <BaseTitle>Witaj ponownie!</BaseTitle>
      </View>
      <View className="mt-4 mb-2" style={{ gap: 16 }}>
        <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
        <BaseInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Hasło"
        />
        <BaseButton
          onPress={onSubmit}
          title="Zaloguj się"
          isLoading={signInReq.isLoading}
        />
      </View>
      <BaseLink
        title="Nie masz konta? Zarejestruj się"
        onPress={() => navigation.navigate('Signup')}
      />
    </ScreenWrapper>
  )
}

export default SigninScreen
