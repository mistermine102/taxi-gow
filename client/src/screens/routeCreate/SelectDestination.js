import { Text, View, Button } from 'react-native'

const SelectDestination = ({ navigation }) => {
  return (
    <View>
      <Text>SelectDestination</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate('SelectDriver')}
      />
    </View>
  )
}
export default SelectDestination
