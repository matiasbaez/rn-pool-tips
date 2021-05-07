import React, { useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Icon } from 'react-native-elements';
import { map, size } from 'lodash';

import Panel from '../../components/Panel';

import { finishLoading, startLoading } from '../../actions/ui';
import { settings } from '../../utils/api';

export default function Tips(props) {

    const dispatch = useDispatch()

    const { navigation, route } = props;
    const { category, name } = route.params;
    const [ renderComponent, setRenderComponent ] = useState(null)
    
    const [ isVisible, setIsVisible ] = useState(false)
    const [ date, setDate ] = useState(new Date());
    const [ time, setTime ] = useState(new Date());
    const [ mode, setMode ] = useState('date');
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

    const showDatePicker = () => {
        setMode('date')
        setIsVisible(true)
    }

    const showTimePicker = () => {
        setMode('time');
        setIsVisible(true)
    }

    const onChangeDatepicker = (event, selectedDate) => {
        const currentDate = selectedDate;

        if (currentDate) {
            if (mode == 'date') {
                setDate(currentDate)
                showTimePicker()
            } else {
                setTime(currentDate)
                setIsVisible(false)
            }
        } else {
            setIsVisible(false)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {size(tips) > 0 ?
                    map(tips, (tip, index) => (
                        <Panel
                            key={index}
                            title={tip.title}
                            description={tip.description}
                            withReminder={tip.withReminder}
                            setIsVisible={setIsVisible}
                            showDatePicker={showDatePicker} />

                    ))
                : (
                    <View style={styles.tipsLoader}>
                        <ActivityIndicator color="#00cdf7" size="large" />
                        <Text>Cargando recomendaciones</Text>
                    </View>
                )}

                {isVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        timeZoneOffsetInMinutes={0}
                        onChange={onChangeDatepicker} />
                )}
            </ScrollView>
        </SafeAreaView>
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
                    <Icon type="material-community" />
                </View>
            </View>

        </TouchableOpacity>
    )
}

function FooterList(props) {
    const { isLoading } = props;

    if (isLoading) {
        return (
            <View style={styles.tipsLoader}>
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
    tipsLoader: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    badgeStyle: {
        backgroundColor: '#252d3d', // '#00cdf7'
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
