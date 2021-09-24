import React, {useEffect, useState} from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList } from 'react-native';
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import GenreCard from "../components/GenreCard";
import ItemSeparator from "../components/ItemSeparator";
import MovieCard from "../components/MovieCard";
import {getPopularMovies, getUpcomingMovies} from "../services/MovieService";
import { genres } from "../constants/Genres";



const HomeScreen = ({navigation}) => {
    const [activeGenre, setActiveGenre] = useState(1)
    const [popularMovies, setPopularMovies] = useState({})
    const [upcomingMovies, setUpcomingMovies] = useState({})


    useEffect(() => {
        let unmounted = false

        if (!unmounted) {
            if (activeGenre && activeGenre != 1) {
                getPopularMovies(activeGenre).then(res => setPopularMovies(res.data))

            }else {
                getPopularMovies().then(res => setPopularMovies(res.data))
            }

            getUpcomingMovies().then(res => setUpcomingMovies(res.data))
        }

        return () => unmounted = true
    }, [activeGenre])



    return (
        <ScrollView style={styles.container}>
            <StatusBar style={"auto"} backgroundColor={Colors.BASE_COLOR} translucent={false}/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Популярное</Text>
                <Text style={styles.headerSubtitle}>Все</Text>
            </View>
            <View style={styles.genreListContainer}>
                <FlatList data={genres}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
                          ListHeaderComponent={() => <ItemSeparator width={20}/>}
                          ListFooterComponent={() => <ItemSeparator width={20}/>}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({item}) => <GenreCard item={item} active={activeGenre == item.id} onPress={(item) => setActiveGenre(item.id)}/>}
                />
            </View>
            <View>
                <FlatList data={popularMovies.results}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
                          ListHeaderComponent={() => <ItemSeparator width={20}/>}
                          ListFooterComponent={() => <ItemSeparator width={20}/>}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({item}) => <MovieCard item={item} onPress={() => navigation.navigate('Film', {movieId : item.id})}/>}
                />
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Cкоро выйдут</Text>
                <Text style={styles.headerSubtitle}>Все</Text>
            </View>
            <View>
                <FlatList data={upcomingMovies.results}
                          horizontal
                          heartLess={false}
                          showsHorizontalScrollIndicator={false}
                          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
                          ListHeaderComponent={() => <ItemSeparator width={20}/>}
                          ListFooterComponent={() => <ItemSeparator width={20}/>}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({item}) => <MovieCard item={item} size={0.5} onPress={() => navigation.navigate('Film', {movieId : item.id})}/>}
                />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BASE_COLOR,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'Regular'
    },
    headerSubtitle: {
        fontSize: 13,
        color: Colors.ACTIVE,
        fontFamily: 'Bold'
    },
    genreListContainer: {
        paddingVertical: 10
    }
})