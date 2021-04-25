import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Category(props) {

    const { navigation, category } = props;
    const { id, name } = category;

    const getInfo = () => {
        navigation.navigate('info', { category: id, name });
    }

    return (
        <TouchableOpacity onPress={getInfo} style={styles.category}>
            <View>
                <Text style={styles.categoryName}>{name.toUpperCase()}</Text>
                <View></View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    category: {
        borderLeftWidth: 15,
        borderLeftColor: '#00cdf7',
        borderBottomWidth: 1,
        borderBottomColor: '#252e3f',
        height: '33.3%',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    categoryName: {
        fontSize: 24,
        textAlign: 'left'
    }
})
