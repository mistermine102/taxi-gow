import { Text, View, Button } from 'react-native'

const SelectDriver = ({ navigation }) => {
  return (
    <View>
      <Text>SelectDriver</Text>
      <Button title="Next" onPress={() => navigation.navigate('Summary')} />
    </View>
  )
}
export default SelectDriver
