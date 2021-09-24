import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Dimensions} from "react-native";
import Colors from "../constants/Colors";


const {height, width} = Dimensions.get('screen')

const setWidth = (w) => (width / 100) * w

const GenreCard = ({item, active, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: active ? Colors.ACTIVE : Colors.WHITE
            }}
            activeOpacity={0.5}
            onPress={() => onPress(item)}
        >
            <Text style={{...styles.genreName,  color: active ? Colors.WHITE : Colors.BLACK}}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Colors.WHITE,
        paddingVertical: 8,
        elevation: 3,
        marginVertical: 2,
        width: setWidth(40)
    },
    genreName: {
        fontSize: 13,
        color: Colors.ACTIVE,
        fontFamily: 'Bold'
    }
})

export default GenreCard;