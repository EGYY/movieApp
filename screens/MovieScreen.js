import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    Share,
    Linking,
    FlatList
} from 'react-native';
import Colors from "../constants/Colors";
import {getCurrMovie, getImage, getVideo} from "../services/MovieService";
import {StatusBar} from "expo-status-bar";
import {LinearGradient} from "expo-linear-gradient";
import {Feather, Entypo, Ionicons, AntDesign} from "@expo/vector-icons";
import ItemSeparator from "../components/ItemSeparator";
import {APPEND_TO_RESPONSE as AR} from "../constants/Urls";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";

const {height, width} = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({route, navigation}) => {
    const {movieId} = route.params
    const [movie, setMovie] = useState({});
    const [isCastSelected, setIsCastSelected] = useState(true)

    useEffect(() => {
        movieId && getCurrMovie(movieId, `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`).then(res => setMovie(res?.data))
    }, [movieId])

    return (
        <ScrollView style={styles.container}>
            <StatusBar style="light" translucent={false}/>
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.6)", "rgba(217, 217, 217, 0)"]}
                start={[0, 0.3]}
                style={styles.linearGradient}
            />
            <View style={styles.moviePosterImageContainer}>
                <Image
                    style={styles.moviePosterImage}
                    resizeMode="cover"
                    source={{uri: getImage(movie?.backdrop_path)}}
                />
            </View>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={35} color={Colors.WHITE}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                        Share.share({message: `${movie?.title}\n\n${movie?.homepage}`})
                    }
                >
                    <Entypo name="share" size={35} color={Colors.WHITE}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.playButton}
                onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
            >
                <Ionicons name="play-circle-outline" size={70} color={Colors.WHITE}/>
            </TouchableOpacity>

            <ItemSeparator height={setHeight(2)}/>
            <View style={styles.movieTitleContainer}>
                <Text style={styles.movieTitle} numberOfLines={3}>
                    {movie?.title} | {movie?.original_title}
                </Text>
                <View style={styles.row}>
                    <AntDesign name="star" size={22} color='black'/>
                    <Text style={styles.ratingText}>{movie?.vote_average}</Text>
                </View>
            </View>
            <Text style={styles.genreText}>
                {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
                {movie?.runtime} мин.
            </Text>
            <Text style={styles.genreText}>
                {movie?.original_language}
            </Text>
            <View style={styles.overviewContainer}>
                <Text style={styles.overviewTitle}>Описание</Text>
                <Text style={styles.overviewText}>{movie?.overview}</Text>
            </View>
            <View>
                <Text style={styles.castTitle}>Состав</Text>
                <View style={styles.castSubMenuContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setIsCastSelected(true)}
                    >
                        <Text
                            style={{
                                ...styles.castSubMenuText,
                                color: isCastSelected ? Colors.BLACK : Colors.LIGHT_GRAY,
                            }}
                        >
                            Актеры
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setIsCastSelected(false)}
                    >
                        <Text
                            style={{
                                ...styles.castSubMenuText,
                                color: isCastSelected ? Colors.LIGHT_GRAY : Colors.BLACK,
                            }}
                        >
                            Команда
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ marginVertical: 5 }}
                    data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
                    keyExtractor={(item) => item?.credit_id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => <ItemSeparator width={20} />}
                    ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                    ListFooterComponent={() => <ItemSeparator width={20} />}
                    renderItem={({ item }) => (
                        <CastCard
                            originalName={item?.name}
                            characterName={isCastSelected ? item?.character : item?.job}
                            image={item?.profile_path}
                        />
                    )}
                />
            </View>
            <Text style={styles.extraListTitle}>Рекомендация</Text>
            <FlatList
                data={movie?.recommendations?.results}
                keyExtractor={(item) => item?.id?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <ItemSeparator width={20} />}
                ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                ListFooterComponent={() => <ItemSeparator width={20} />}
                renderItem={({ item }) => (
                    <MovieCard
                        item={item}
                        size={0.6}
                        onPress={() => navigation.navigate('Film', { movieId: item.id })}
                    />
                )}
            />
            <Text style={styles.extraListTitle}>Похожие фильмы</Text>
            <FlatList
                data={movie?.similar?.results}
                keyExtractor={(item) => item?.id?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <ItemSeparator width={20} />}
                ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                ListFooterComponent={() => <ItemSeparator width={20} />}
                renderItem={({ item }) => (
                    <MovieCard
                        item={item}
                        size={0.6}
                        onPress={() => {
                            navigation.navigate('Film', { movieId: item.id })
                        }}
                    />
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BASE_COLOR,
        position: 'relative'
    },
    moviePosterImageContainer: {
        height: setHeight(35),
        width: setWidth(145),
        alignItems: "center",
        left: setWidth((100 - 145) / 2),
        top: 0,
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        elevation: 8,
    },
    linearGradient: {
        width: setWidth(100),
        height: setHeight(6),
        position: "absolute",
        top: 0,
        elevation: 9,
    },
    moviePosterImage: {
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        width: setWidth(145),
        height: setHeight(35),
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        position: "absolute",
        right: 0,
        left: 0,
        top: 50,
        elevation: 20,
    },
    headerText: {
        color: Colors.WHITE,
        fontFamily: 'Bold',
    },
    playButton: {
        position: "absolute",
        top: 110,
        left: setWidth(50) - 70 / 2,
        elevation: 10,
    },
    movieTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    movieTitle: {
        color: Colors.BLACK,
        fontFamily: 'ExtraBold',
        fontSize: 18,
        width: setWidth(60),
    },
    ratingText: {
        marginLeft: 5,
        color: Colors.BLACK,
        fontFamily: 'ExtraBold',
        fontSize: 15,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    genreText: {
        color: Colors.LIGHT_GRAY,
        paddingHorizontal: 20,
        paddingTop: 5,
        fontFamily: 'ExtraBold',
        fontSize: 13,
    },
    overviewContainer: {
        backgroundColor: Colors.EXTRA_LIGHT_GRAY,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
    },
    overviewTitle: {
        color: Colors.BLACK,
        fontFamily: "Bold",
        fontSize: 18,
    },
    overviewText: {
        color: Colors.LIGHT_GRAY,
        paddingVertical: 5,
        fontFamily: "Bold",
        fontSize: 13,
        textAlign: "justify",
    },
    castTitle: {
        marginLeft: 20,
        color: Colors.BLACK,
        fontFamily: 'Bold',
        fontSize: 18,
    },
    castSubMenuContainer: {
        marginLeft: 20,
        flexDirection: "row",
        marginVertical: 5,
    },
    castSubMenuText: {
        marginRight: 10,
        color: Colors.BLACK,
        fontFamily: 'Bold',
        fontSize: 13,
    },
    extraListTitle: {
        marginLeft: 20,
        color: Colors.BLACK,
        fontFamily: 'Bold',
        fontSize: 18,
        marginVertical: 8,
    },
})

export default MovieScreen;