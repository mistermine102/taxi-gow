import { View } from 'react-native'
import { useState, useContext } from 'react'
import AuthContext from '../../context/Auth'
import { BaseInput, BaseButton, BaseLink, ScreenWrapper, BaseTitle } from '../../components/base/base'
import useAsyncRequest from '../../hooks/useAsyncRequest'
import Toast from 'react-native-toast-message'

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { send, isLoading } = useAsyncRequest()

  const onSubmit = async () => {
    send(
      async () => {
        await signin({ email, password })
      },
      err => {
        if (err.response && err.response.data.message === 'USER_NOT_VERIFIED') {
          return Toast.show({ type: 'error', text1: 'Błąd logowania', text2: 'Konto nie zostało zweryfikowane' })
        }
        Toast.show({ type: 'error', text1: 'Błąd logowania', text2: 'Nieprawidłowy email lub hasło' })
      }
    )
  }

  return (
    <ScreenWrapper>
      <View className="mt-8">
        <BaseTitle>Witaj ponownie!</BaseTitle>
      </View>
      <View className="mt-4 mb-2" style={{ gap: 16 }}>
        <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
        <BaseInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Hasło" />
        <BaseButton onPress={onSubmit} title="Zaloguj się" isLoading={isLoading} />
      </View>
      <BaseLink title="Nie masz konta? Zarejestruj się" onPress={() => navigation.navigate('Signup')} />
    </ScreenWrapper>
  )
}

export default SigninScreen
