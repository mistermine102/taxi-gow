import { View } from 'react-native'
import { useContext, useState } from 'react'
import AuthContext from '../../context/Auth'
import { BaseButton, BaseLink, BaseInput, ScreenWrapper, BaseTitle } from '../../components/base/base'
import PhoneInput from '../../components/PhoneInput'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import Toast from 'react-native-toast-message'

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, send } = useAsyncRequest()

  const onSubmit = async () => {
    send(
      async () => {
        await signup({ email, password, phoneNumber: formattedPhoneNumber })
      },
      err => {
        if (err.message === 'INVALID_EMAIL') return Toast.show({ type: 'error', text1: 'Błąd rejestracji', text2: 'Nieprawidłowy email' })
        if (err.message === 'INVALID_PHONE') return Toast.show({ type: 'error', text1: 'Błąd rejestracji', text2: 'Nieprawidłowy numer telefonu' })
        if (err.message === 'INVALID_PASSWORD')
          return Toast.show({ type: 'error', text1: 'Błąd rejestracji', text2: 'Hasło musi mieć przynajmniej 6 znaków' })

        if (err.response && err.response.status === 400) {
          //email already in use
          return Toast.show({ type: 'error', text1: 'Błąd rejestracji', text2: 'Ten email jest zajęty' })
        }
      }
    )
  }

  return (
    <ScreenWrapper>
      <View className="mt-8">
        <BaseTitle>Utwórz konto!</BaseTitle>
      </View>
      <View className="mt-4">
        <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
        <PhoneInput value={phoneNumber} onChangeText={setPhoneNumber} onChangeFormattedText={setFormattedPhoneNumber} />
        <BaseInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Hasło" />
        <BaseButton onPress={onSubmit} title="Zarejestruj się" isLoading={isLoading} />
        <BaseLink title="Masz już konto? Zaloguj się" onPress={() => navigation.navigate('Signin')} />
      </View>
    </ScreenWrapper>
  )
}

export default SignupScreen
