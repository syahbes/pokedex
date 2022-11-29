import { TouchableOpacity, Button, View, TextInput, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Data from '../public/pokemon.json';
import Item from './Item'

const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState("")
    const [sliceView, setSliceView] = useState(10)

    const onChangeText = (e) => {
        setText(e)
        console.log(e)
    }
    DataView = Data.slice(0, sliceView)

    return (
        <SafeAreaView>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <FlatList
                    data={DataView}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('Details', item)
                        }>
                            <Item item={item} />
                        </TouchableOpacity>
                    }
                />
                
            </View>
         </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default HomeScreen