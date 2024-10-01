import { View, Text } from 'react-native'
import { useContext, useState } from 'react'
import AuthContext from '../../context/Auth'
import { BaseButton, BaseLink, BaseInput, ScreenWrapper, BaseTitle } from '../../components/base/base'
import Toast from '../../components/Toast'
import useToast from '../../hooks/useToast'
import PhoneInput from '../../components/PhoneInput'

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { showToast, isToastVisible, toastTitle } = useToast()

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await signup({ email, password, phoneNumber: formattedPhoneNumber })
    } catch (err) {
      if (err.message === 'INVALID_EMAIL') return showToast('Nieprawidłowy email')
      if (err.message === 'INVALID_PHONE') return showToast('Nieprawidłowy numer telefonu')
      if (err.message === 'INVALID_PASSWORD') return showToast('Hasło musi mieć przynajmniej 6 znaków')

      if (err.response && err.response.status === 400) {
        //email already in use
        return showToast('Ten email jest używany przez inne konto')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScreenWrapper>
      <Toast isVisible={isToastVisible} title={toastTitle} />
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
