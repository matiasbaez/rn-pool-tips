
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import LoginForm from '../../components/Auth/LoginForm';

export default function Login() {
    const toastRef = useRef();

    return (
        <KeyboardAwareScrollView>
            <ScrollView>
                <Image 
                    source={require("../../../assets/icon.png")}
                    resizeMode="contain" 
                    style={styles.logo}/>

                <View style={styles.viewContainer}>
                    <LoginForm toastRef={toastRef} />
                    <CreateAccount />
                </View>

                <Divider style={styles.divider} />

                <Toast ref={toastRef} />
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

function CreateAccount(props) {

    const navigation = useNavigation();

    return (
        <Text style={styles.registerText}>
            ¿No tienes una cuenta?
            <Text style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}> Registrate</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 140
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
    },
    registerText: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: '#252d3d', // '#00cdf7'
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: '#252d3d', // '#00cdf7'
        margin: 40
    }
});
