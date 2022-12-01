
import { View, SafeAreaView, StyleSheet, Image, } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Data from '../public/pokemon.json';

const TypeColorMap = {
  "Fire": "#ff3333",
  "Water": "#18AFF0",
  "Grass": "#1E9B1E",
  "Bug": "#CB871B",
  "Electric": "#ffff00",
  "Normal": "#999966",
  "Ghost": "#8585ad",
  "Fighting": "#009999",
  "Psychic": "#ff80ff",
  "Fairy": "#6600ff",
  "Ground": "#A58482",
  "Poison": "#85929E",
  
}

const hpArr = [
  "💖", "💖", "💖", "💖", "💖", "💖", "💖", "💖", "💖", "💖",
  "🖤", "🖤", "🖤", "🖤", "🖤", "🖤", "🖤", "🖤", "🖤", "🖤",
]

const hpRate = (x) => {
  let y = 0
  if (x > 99) { y = 10 }
  else { y = x / 10 }
  y = Math.floor(10 - y)
  return hpArr.slice(y, y + 10)
}

const DetailsScreen = ({ route, navigation }) => {

  const { id, name, type, hp, attack, speed } = route.params

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}>
        {/* name + type(dynamic bg) */}
        <View style={styles.pokeHeader}>
          <Text variant='displaySmall' style={{marginRight:15}}>{name}</Text>
          <View style={[styles.pokeTypeContainer, { backgroundColor: `${TypeColorMap[type[0]]}` }]}>
            <Text variant='bodyLarge'>{type[0]}</Text>
          </View>
        </View>
        {/* photo + hp (dynamic) */}
        <View style={styles.imageContainer}>

          <Image
            style={styles.pokeImage}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }} />
        </View>
        <View style={styles.HPContainer}>
        <Text variant='bodyLarge' style={{marginBottom: 20}}>
            HP: {hpRate(hp)}
          </Text>
          <Text variant='bodyLarge' style={{marginBottom: 20}}>
            Attack: {attack}
          </Text>
          <Text variant='bodyLarge'>
            Speed: {speed}
          </Text>
        </View>
        <View style={styles.pokeButton}>

          <IconButton
            title="Back"
            icon="arrow-left-bold"
            mode="contained"
            disabled={id == 1}
            onPress={() => navigation.navigate('Details', Data[id - 2])}
            style={{marginRight:20}}
          />
          <IconButton
            title="Home"
            mode="contained"
            icon="home"
            onPress={() => navigation.navigate('Pokedex')}
            style={{marginRight:20}}
          />
          <IconButton
            title="Next"
            icon="arrow-right-bold"
            mode="contained"
            disabled={id == 809}
            onPress={() => navigation.navigate('Details', Data[id])}
          />


        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  pokeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 25,
  },

  pokeTypeContainer: {
    borderRadius: 10,
    padding: 5,
  },
  pokeImage: {
    width: 200,
    height: 200,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

  },
  imageContainer: {
    padding: 10,
    marginBottom: 30,
  },
  HPContainer: {
    padding: 10,
    // marginBottom: 20,
  },
  pokeButton: {
    position: 'absolute',
    flexDirection: 'row',
    // gap: 10,
    bottom: 30,
    left: 0,
    width: "100%",
    // backgroundColor: "#000",
    justifyContent: "center",
  }
})

export default DetailsScreen