import React from 'react';
import Colors from "../constants/Colors";
import {View, Image, Text, StyleSheet} from "react-native";
import {getImage} from "../services/MovieService";
import IMAGES from '../constants/Images'

const CastCard = ({ originalName, image, characterName }) => {
    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: getImage(image) } : IMAGES.NO_IMAGE}
                resizeMode={image ? "cover" : "contain"}
                style={styles.image}
            />
            <Text style={styles.originalName} numberOfLines={2}>
                {originalName}
            </Text>
            <Text style={styles.characterName} numberOfLines={2}>
                {characterName}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 120,
        width: 80,
        borderRadius: 10,
    },
    originalName: {
        width: 80,
        color: Colors.BLACK,
        fontFamily: 'Bold',
        fontSize: 12,
    },
    characterName: {
        width: 80,
        color: Colors.LIGHT_GRAY,
        fontFamily: 'Bold',
        fontSize: 10,
    },
});

export default CastCard;