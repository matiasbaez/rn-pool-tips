
import React, { useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
// import Toast from 'react-native-easy-toast';

import RegisterForm from '../../components/Auth/RegisterForm';

export default function Register() {

    const toastRef = useRef();

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

            {/* <Toast ref={toastRef} position="center" opacity={0.9} /> */}
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
