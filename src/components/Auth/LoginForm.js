
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Input, Icon, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import Loading from '../Loading';

import validator from 'validator';
import { startLogin } from '../../actions/auth';

export default function LoginForm(props) {

    const { toastRef } = props;
    const navigation = useNavigation();

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormData());
    const { email, password } = formData;

    const onSubmit = () => {

        if (isEmpty(email) || isEmpty(password)) {
            toastRef.current.show('Todos los campos son obligatorios');
        } else if (!validator.isEmail(email)) {
            toastRef.current.show('El formato del email es incorrecto');
        } else {
            // setLoading(true);
            dispatch( startLogin(email, password) )
        }
    }

    const onChange = (e, type) => {
        const value = e.nativeEvent.text;
        setFormData({ ...formData, [type]: value });
    }

    return (
        <View style={styles.formContainer}>
            <form style={{ width: "100%" }}>

                <Input
                    placeholder="Correo electronico"
                    containerStyle={styles.inputForm}
                    onChange={e => onChange(e, "email")}
                    rightIcon={
                        <Icon 
                            type="material-community"
                            name="at"
                            iconStyle={styles.iconRight} />
                    } />

                <Input
                    placeholder="Contraseña"
                    containerStyle={styles.inputForm}
                    password={true}
                    secureTextEntry={!showPassword}
                    onChange={e => onChange(e, "password")}
                    rightIcon={
                        <Icon 
                            type="material-community"
                            name={ showPassword ? "eye-off-outline" : "eye-outline" }
                            iconStyle={styles.iconRight}
                            onPress={() => setShowPassword(!showPassword) } />
                    } />

                <Button
                    title="Iniciar Sesión"
                    containerStyle={styles.btnLoginContainer}
                    buttonStyle={styles.btnLogin}
                    onPress={onSubmit} />
            </form>

            {/* <Loading isVisible={loading} text="Iniciando sesión..." /> */}
        </View>
    );
}

function defaultFormData() {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btnLoginContainer: {
        marginTop: 20,
        width: "95%",
    },
    btnLogin: {
        backgroundColor: "#2b313f"
    },
    iconRight: {
        color: "#c1c1c1"
    }
});
