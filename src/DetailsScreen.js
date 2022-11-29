
import { View, Text, SafeAreaView, Button } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  const {id,name} = route.params
  // console.log(route.params)
  return (
    <SafeAreaView>
      <View>
        <Text>Details Screen</Text>
        <Text>Pokemon Id: {JSON.stringify(id)}</Text>
        <Text>The Name is : {JSON.stringify(name)}</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Pokedex')}
        />
      </View>
    </SafeAreaView>
  );
}

export default DetailsScreen