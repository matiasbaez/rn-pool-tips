import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-native-elements';
import { size } from 'lodash';

import { finishLoading, startLoading } from '../../actions/ui';
import { settings } from '../../utils/api';

export default function Tips(props) {

    const dispatch = useDispatch()

    const { navigation, route } = props;
    const { category, name } = route.params;
    const [ tips, setTips ] = useState([])
    const { loading } = useSelector(state => state.ui)

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [])

    useFocusEffect(
        useCallback(() => {
            (async () => {
                dispatch( startLoading() )

                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
        
                const request = new Request(`${settings.host}/api/tips?category=${category}`, options)
                const response = await fetch(request)
                const json = await response.json()

                if (response.ok) {
                    setTips(json.data)
                }

                dispatch( finishLoading() )
            })()
        }, [])
    )

    return (
        <View>
            {size(tips) > 0 ? (
                <FlatList
                    data={tips}
                    renderItem={(tip) => <Tip tip={tip} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList isLoading={loading} />} />
            ) : (
                <View style={styles.tipsLoader}>
                    <ActivityIndicator color="#00cdf7" size="large" />
                    <Text>Cargando recomendaciones</Text>
                </View>
            )}
        </View>
    )
}

function Tip(props) {
    const { tip, navigation } = props;
    const { id, title, description } = tip.item;

    return (
        <TouchableOpacity >

            <View style={styles.tipView}>
                <Badge
                    badgeStyle={styles.badgeStyle}
                    status="primary"
                    value={<Text>{tip.index + 1}</Text>} />

                <View>
                    <Text style={styles.tipTitle}>{title}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

function FooterList(props) {
    const { isLoading } = props;

    if (isLoading) {
        return (
            <View style={styles.recomendationLoader}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <View style={styles.notFoundRecomendations}>
                <Text>No quedan recomendaciones por cargar</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    recomendationLoader: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    badgeStyle: {
        backgroundColor: '#00cdf7',
        marginRight: 5
    },
    tipView: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    tipTitle: {
        fontWeight: "bold"
    },
    tipDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
    },
    notFoundRecomendations: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    }
});
