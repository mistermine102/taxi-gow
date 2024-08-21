import { View } from 'react-native'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import BaseLink from '../../components/base/BaseLink'
import { useContext, useState } from 'react'
import AuthContext from '../../context/Auth'

const SignupScreen = ({ navigation }) => {
  const { signup } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    signup({ email, password })
  }

  return (
    <View className="px-6 bg-white flex-1 pt-[50px]">
      <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
      <BaseInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Hasło" />
      <BaseButton onPress={onSubmit} title="Zarejestruj się" />
      <BaseLink title="Masz już konto? Zaloguj się" onPress={() => navigation.navigate('Signin')} />
    </View>
  )
}

export default SignupScreen
