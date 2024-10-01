import { View, Text } from 'react-native'
import { useState, useContext } from 'react'
import AuthContext from '../../context/Auth'
import { BaseInput, BaseButton, BaseLink, ScreenWrapper, BaseTitle } from '../../components/base/base'
import Toast from '../../components/Toast'
import useToast from '../../hooks/useToast'

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isToastVisible, toastTitle, showToast } = useToast()

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await signin({ email, password })
    } catch (err) {
      showToast('Nieprawidłowy email lub hasło')
    } finally {
      setIsLoading(false)
    }
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
