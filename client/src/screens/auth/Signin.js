import { View } from 'react-native'
import { useState, useContext } from 'react'
import AuthContext from '../../context/Auth'
import { BaseInput, BaseButton, BaseLink } from '../../components/base/base'

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await signin({ email, password })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="px-6 bg-white flex-1 pt-[50px]">
      <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
      <BaseInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Hasło" />
      <BaseButton onPress={onSubmit} title="Zaloguj się" isLoading={isLoading} />
      <BaseLink title="Nie masz konta? Zarejestruj się" onPress={() => navigation.navigate('Signup')} />
    </View>
  )
}

export default SigninScreen
