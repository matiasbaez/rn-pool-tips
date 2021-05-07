import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, View } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import Wave from 'react-native-waveview';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const pickerOptions = {
    today       : 'Hoy',
    yesterday   : 'Ayer',
    week        : 'Esta semana',
    lastMonth   : 'Ultimo mes',
    custom      : 'Personalizada',
}

const phWheelColor = [
    '#e92300',
    '#f96d3a',
    '#fbb718',
    '#fff001',
    '#cae701',
    '#8fd300',
    '#4cbf00',
    '#00aa01',
    '#00b774',
    '#00c9cb',
    '#019bd9',
    '#006ae4',
    '#3a5bdc',
    '#6a4bd5',
    '#5b3aad',
]

const info = 'En general, un agua con un pH < 7 se considera ácido y con un pH > 7 se considera básica o alcalina. El rango normal de pH en agua superficial es de 6,5 a 8,5.'

export default function Home() {

    const [selectedOptionText, setSelectedOptionText] = useState('Hoy');
    const [selectedOption, setSelectedOption] = useState('today');
    const pickerRef = useRef()

    const [spinValue] = useState(new Animated.Value(0));
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useFocusEffect(
        useCallback(() => {
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance
                }
            ).start()
        }, [spin])
    )

    const changePicker = (itemValue, itemIndex) => {
        setSelectedOption(itemValue)
        setSelectedOptionText(pickerOptions[itemValue])
    }

    const showDropdown = () => {
        
    }

    return (
        <View>
            <View style={styles.pickerContainer}>
                <View onPress={showDropdown} style={styles.pickerText}>
                    <Text>{selectedOptionText}: Estado de la piscina</Text> 
                    <Icon
                        type="material-community"
                        name="unfold-more-horizontal" />
                </View>

                <Picker
                    mode="dropdown"
                    style={{ position: 'absolute', top: 0, width: 1000, height: 1000 }}
                    itemStyle={styles.picker}
                    selectedValue={selectedOption}
                    onValueChange={changePicker}>
                    <Picker.Item label="Hoy" value="today" />
                    <Picker.Item label="Ayer" value="yesterday" />
                    <Picker.Item label="Esta semana" value="week" />
                    <Picker.Item label="Ultimo mes" value="lastMonth" />
                    <Picker.Item label="Personalizada" value="custom" />
                </Picker>
            </View>

            <View style={styles.pHContainer}>
                <Animated.Image
                    style={{...styles.pHImage, transform: [{rotate: spin}] }}
                    source={require('../../assets/images/ph-wheel.png')} />

                <FadeInView style={styles.pHFadeContainer}>
                    <View style={styles.pHTextContainer}>
                        <Text style={styles.pHText}>pH</Text>
                        <Text style={styles.pHValue}>14</Text>
                    </View>
                </FadeInView>
            </View>

            <View style={styles.pHInfoContainer}>
                <FadeInView duration={5000} style={styles.pHFadeInfoContainer}>
                    <Icon style={styles.pHInfoIcon} type="material-community" name="menu-up" color="#f96d3a" />
                    <Text style={styles.pHInfoText}>{info}</Text>
                </FadeInView>
            </View>

            <View style={styles.waveContainer}>
                <Wave
                    style={styles.wave}
                    H={100}
                    waveParams={[
                        {A: 20, T: windowWidth * 5, fill: '#62c2ff'},
                        {A: 15, T: windowWidth * 5, fill: '#0087dc'},
                        {A: 10, T: windowWidth * 5, fill: '#1aa7ff'},
                    ]}
                    animated={true}
                />
                <FadeInView style={styles.animatedView}>
                    <Text style={styles.waveText}>Cloro: 30 ppm (mg/l)</Text>
                </FadeInView>
            </View>
        </View>
    )
}

const FadeInView = (props) => {
    const opacity = new Animated.Value(0)
    const { duration = 5000 } = props
  
    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });
    
    const animatedStyles = [
        {
            opacity,
            ...props.style
        }
    ]

    useEffect(() => {
      Animated.timing(
        opacity,
        {
            toValue: 1,
            duration,
            easing: Easing.in(Easing.bounce),
            useNativeDriver: true
        }
      ).start();
    }, [])
  
    return (
      <Animated.View style={animatedStyles}>
        {props.children}
      </Animated.View>
    );
  }

const styles = StyleSheet.create({
    pickerContainer: {
        padding: 10,
        alignContent: 'flex-end',
        position: 'relative',
    },
    picker: {
        margin: 0,
        padding: 0,
        textAlign: 'right',
        width: '75%',
        display: 'none'
    },
    pickerText: {
        flexDirection: 'row',
    },
    pHContainer: {
        padding: 10,
        alignItems: 'center',
        position: 'relative'
    },
    pHImage: {
        width: 360,
        height: 360,
    },
    pHFadeContainer: {
        position: 'absolute',
        top: '40%',
    },
    pHTextContainer: {
        width: 60
    },
    pHText: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 0,
        margin: 0
    },
    pHValue: {
        fontSize: 25,
        textAlign: 'right',
        padding: 0,
        margin: 0
    },
    pHInfoContainer: {
        marginVertical: 10,
        padding: 10,
        position: 'relative',
    },
    pHFadeInfoContainer: {
        backgroundColor: phWheelColor[parseInt(Math.random() * 14)],
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    pHInfoIcon: {
        position: 'absolute',
        // top: -20
        right: 0,
        backgroundColor: 'red',
        marginHorizontal: 'auto'
    },
    pHInfoText: {
        color: 'white',
        textAlign: 'justify',
        padding: 0
    },
    waveContainer: {
        // flex: 1,
        marginVertical: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
    },
    wave: {
        width: windowWidth,
        aspectRatio: 1,
        height: 120,
    },
    animatedView: {
        position: 'absolute',
        top: '25%'
    },
    waveText: {
        color: 'white',
        fontSize: 30,
    },
})
