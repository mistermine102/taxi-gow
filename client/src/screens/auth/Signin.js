import { View } from 'react-native'
import { useState, useContext } from 'react'
import AuthContext from '../../context/Auth'

import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import BaseLink from '../../components/base/BaseLink'

const SigninScreen = ({ navigation }) => {
  const { signin } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    signin({ email, password })
  }

  return (
    <View className="px-6 bg-white flex-1 pt-[50px]">
      <BaseInput value={email} onChangeText={setEmail} placeholder="Email" />
      <BaseInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Hasło" />
      <BaseButton onPress={onSubmit} title="Zaloguj się" />
      <BaseLink title="Nie masz konta? Zarejestruj się" onPress={() => navigation.navigate('Signup')} />
    </View>
  )
}

export default SigninScreen
