
import {  View, Text, StyleSheet, Image } from 'react-native';

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

  const styles = StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: "#30373A",
      width: "100%",
      padding: 10,
      // border: "2px solid #FFC0CB",
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
  
export default Item  