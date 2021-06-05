
import React, { useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-easy-toast';

import { useSelector } from 'react-redux';

import RegisterForm from '../../components/Auth/RegisterForm';

export default function Register() {

    const toastRef = useRef();

    const navigation = useNavigation();
    const { logged } = useSelector(state => state.auth)

    if (logged) {
        navigation.replace('home')
        return;
    }

    return (
        <KeyboardAwareScrollView>
            <View>
                <Image 
                    source={require("../../../assets/icon.png")}
                    resizeMode="contain" 
                    style={styles.logo}/>

                <View style={styles.viewForm}>
                    <RegisterForm toastRef={toastRef} />
                </View>
            </View>

            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40
    }
});
