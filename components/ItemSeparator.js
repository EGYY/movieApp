import React from 'react';
import {View} from "react-native";

const ItemSeparator = ({width, height}) => {
    return (
        <View style={{width, height}}/>
    );
};

ItemSeparator.defaultProps = {
    width: 0,
    height: 0
}

export default ItemSeparator;