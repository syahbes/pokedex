
import { TouchableOpacity, Button, View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Data from './public/pokemon.json';


const Item = ({ item }) => (
  <View style={styles.item} id={item.id}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
      }} />
    <Text style={styles.text}>{item.name}</Text>
  </View>
);



const renderItem = () => {}


function HomeScreen({ navigation }) {
  const [text, setText] = useState("")
  const [sliceView, setSliceView] = useState(10)

  const onChangeText = (e) => {
    setText(e)
    console.log(e)
  }
  DataView = Data.slice(0, sliceView)
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <FlatList
          data={DataView}
          // renderItem={renderItem}
          keyExtractor={item => item.id}

          renderItem={({ item }) =>

            <TouchableOpacity onPress={() =>
              navigation.navigate('Details', {
                PokemonId: item.id,
                Name: item.name,
              })
            }

            >
              <Item item={item} />
            </TouchableOpacity>
          }

        />

        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }) {
  const { PokemonId } = route.params;
  const { Name } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>Pokemon Id: {JSON.stringify(PokemonId)}</Text>
      <Text>The Name is : {JSON.stringify(Name)}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // console.log(Data)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pokedex">
        <Stack.Screen name="Pokedex" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#30373A",
    width: "100%",
    padding: 10,
    border: "2px solid #FFC0CB",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default App;
