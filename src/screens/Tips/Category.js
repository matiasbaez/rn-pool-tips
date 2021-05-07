import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Badge, Button, Icon } from 'react-native-elements';
import { settings } from '../../utils/api';

export default function Category(props) {
    
    const { navigation, category } = props;
    const { id, name, tips_count, image } = category;
    const source = {uri: `${settings.host}/storage/category/${id}/${image}`};

    const getInfo = () => {
        navigation.navigate('info', { category: id, name });
    }

    return (
        <TouchableOpacity onPress={getInfo} style={styles.category}>
            <ImageBackground source={source} style={styles.image} imageStyle={{ borderRadius: 25 }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5, color: 'white' }}>Tareas</Text>
                    <Badge badgeStyle={styles.badge} value={<Text>{tips_count}</Text>} />
                </View>

                <Text style={styles.categoryName}>{name.toUpperCase()}</Text>

                <Button
                    buttonStyle={styles.button}
                    containerStyle={styles.btnContainer}
                    icon={<Icon type="material-community" name="chevron-right" />} />

            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    category: {
        height: '33.3%',
        justifyContent: 'center',
        paddingVertical: 10,
        width: '100%',
    },
    image: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
        resizeMode: 'cover',
    },
    badge: {
        backgroundColor: 'white'
    },
    categoryName: {
        color: 'white',
        fontSize: 24,
        textAlign: 'left'
    },
    btnContainer: {
        borderRadius: 20,
        padding: 0,
        width: 50,
        marginTop: 20
    },
    button: {
        backgroundColor: 'white',
        fontSize: 30,
        padding: 0,
        color: 'transparent'
        // width: 20
    },
})
