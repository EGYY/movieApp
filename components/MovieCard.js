import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from "react-native";
import Colors from "../constants/Colors";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {getImage, rateMovie} from "../services/MovieService";
import IMAGES from "../constants/Images";

const MovieCard = ({item, size, heartLess, onPress}) => {
    const [liked, setLiked] = useState(false)
    const [countVoted, setCountVoted] = useState(item.vote_count)

    useEffect(() => {
        if (liked) {
            setCountVoted(countVoted + 1)
            // rateMovie(item.id).then(res => alert(res.data.status_message))
        } else {
            setCountVoted(countVoted - 1)
        }
    }, [liked])


    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
            <ImageBackground
                imageStyle={{
                    borderRadius: 12,
                }}
                source={{uri: getImage(item.poster_path)}}
                style={{...styles.container, width: 230 * size, height: 340 * size}}>
                <View style={{...styles.imdbContainer, paddingVertical: 3 * size}}>
                    <Image
                        source={IMAGES.IMDB}
                        resizeMode="cover"
                        style={{...styles.imdbImage, height: 20 * size, width: 50 * size}}
                    />
                    <Text
                        style={{
                            ...styles.imdbRating,
                            marginRight: 5 * size,
                            fontSize: 14 * size,
                        }}
                    >
                        {item.vote_average}
                    </Text>
                </View>
                {
                    !heartLess ? (
                        <TouchableNativeFeedback onPress={() => setLiked(!liked)}>
                            <Ionicons name={liked ? 'heart' : 'heart-outline'}
                                      size={25}
                                      color={liked ? Colors.HEART : Colors.WHITE}
                                      style={{position: 'absolute', bottom: 10, left: 10}}
                            />
                        </TouchableNativeFeedback>
                    ) : null
                }

            </ImageBackground>
            <View>
                <View style={styles.flexCentered}>
                    <Text style={{...styles.movieTitle, width: 150 * size }} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.flexCentered}>
                        <AntDesign name="heart"
                                   color={Colors.HEART}
                                   size={17 * size}
                                   style={{marginRight: 5}}
                        />
                        <Text style={styles.movieSubtitle}>{countVoted}</Text>
                    </View>
                </View>
                <View style={{...styles.movieSubtitleContainer, width: 150 * size}}>
                    <Text style={styles.movieSubtitle} numberOfLines={size < 1 ? 2 : 3}>{item.overview}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ACTIVE,
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2
    },
    movieTitle: {
        fontFamily: 'ExtraBold',
        color: Colors.GRAY,
        paddingVertical: 2,
        marginTop: 5,
        width: 150,
    },
    movieSubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    movieSubtitle: {
        fontFamily: 'Regular',
        fontSize: 12
    },
    flexCentered: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imdbContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: Colors.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3,
    },
    imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius: 5,
    },
    imdbRating: {
        marginRight: 5,
        color: Colors.HEART,
        fontFamily: 'ExtraBold',
    },
})

MovieCard.defaultProps = {
    size: 1,
    heartLess: true
}

export default MovieCard;