import { View } from 'react-native'
import { useContext, useState } from 'react'
import AuthContext from '../../context/Auth'
import { BaseButton, BaseLink, BaseInput } from '../../components/base/base'

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await signup({ email, password })
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
      <BaseButton onPress={onSubmit} title="Zarejestruj się" isLoading={isLoading} />
      <BaseLink title="Masz już konto? Zaloguj się" onPress={() => navigation.navigate('Signin')} />
    </View>
  )
}

export default SignupScreen
