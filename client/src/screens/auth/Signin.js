import { View} from 'react-native'
import { useState, useContext } from 'react'
import AuthContext from '../../context/Auth'
import { BaseInput, BaseButton, BaseLink, ScreenWrapper, BaseTitle } from '../../components/base/base'
import Toast from '../../components/Toast'
import useToast from '../../hooks/useToast'
import useAsyncRequest from '../../hooks/useAsyncRequest'

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isToastVisible, toastTitle, showToast } = useToast()
  const { send, isLoading } = useAsyncRequest()

  const onSubmit = async () => {
    send(
      async () => {
        await signin({ email, password })
      },
      () => showToast('Nieprawidłowy email lub hasło')
    )
  }

  return (
    <ScreenWrapper>
      <Toast isVisible={isToastVisible} title={toastTitle} />
      <View className="mt-8">
        <BaseTitle>Witaj ponownie!</BaseTitle>
      </View>
      <View className="mt-4">
        <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
        <BaseInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Hasło" />
        <BaseButton onPress={onSubmit} title="Zaloguj się" isLoading={isLoading} />
        <BaseLink title="Nie masz konta? Zarejestruj się" onPress={() => navigation.navigate('Signup')} />
      </View>
    </ScreenWrapper>
  )
}

export default SigninScreen
