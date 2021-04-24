
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import validator from 'validator';

export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [formData, setFormData] = useState(defaultData());
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = () => {
        setErrors({});
        if (!formData.email || email === formData.email) {
            setErrors({ email: "El email no ha cambiado" });
        } else if (!validator.isEmail(formData.email)) {
            setErrors({ email: "El formato del email es invalido" });
        } else if (!formData.password) {
            setErrors({ password: "La contraseña no puede estar vacia." });
        } else {
            setIsLoading(true);
        }
    };

    const onChange = (e, type) => {
        const value = e.nativeEvent.text;
        setFormData({ ...formData, [type]: value });
        setErrors({});
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2",
                }}
                defaultValue={email || ""}
                onChange={e => onChange(e, "email")}
                errorMessage={errors.email}
            />

            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        color="#c2c2c2"
                        onPress={() => setShowPassword(!showPassword)} />
                }
                password={true}
                secureTextEntry={!showPassword}
                onChange={e => onChange(e, "password")}
                errorMessage={errors.password}
            />

            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

function defaultData() {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
    },
    btn: {
        backgroundColor: "#00cdf7",
    },
});