import { TouchableOpacity, View, FlatList, SafeAreaView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import Data from '../public/pokemon.json';
import Item from './Item'
//testing

const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#BB8FCE",
            }}
        />
    );
}

const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        );
    };

    const loadMoreItem = () => {
        setIsLoading(true)
        setSliceView(prev => prev + 10)
        setFilteredList(Data.slice(0, sliceView + 10))
    }

    const [sliceView, setSliceView] = useState(10)
    const [filteredList, setFilteredList] = useState(Data.slice(0, sliceView))
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
        setIsLoading(false)
        setFilteredList(
            Data
                .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 20)
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            marginTop: 30,
        }}>
            <View style={{
                flex: 1,
            }}>
                <Searchbar
                    placeholder="Search for Pokemon"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ marginBottom: 5 }}
                />
                <FlatList
                    ItemSeparatorComponent={FlatListItemSeparator}
                    data={filteredList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('Details', item)
                        }>
                            <Item item={item} />
                        </TouchableOpacity>
                    }
                    onEndReached={(distance) => {
                        // console.log(distance);
                        if (!searchQuery) { loadMoreItem() }
                    }}
                    onEndReachedThreshold={0.02}
                    ListFooterComponent={renderLoader}

                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
    },
})

export default HomeScreen
