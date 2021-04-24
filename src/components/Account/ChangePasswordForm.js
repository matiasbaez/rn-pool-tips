
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { size } from 'lodash';

export default function ChangePasswordForm(props) {
    const { setShowModal, toastRef } = props;
    const [formData, setFormData] = useState(defaultData());
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmit = () => {
        setErrors({});

        if (!formData.password || !formData.newPassword || !formData.repeatNewPassword) {
            setErrors({
                password: !formData.password ? "El campo es obligatorio" : "",
                newPassword: !formData.newPassword ? "El campo es obligatorio" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "El campo es obligatorio" : "",
            });
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            setErrors({
                newPassword: "Las contraseñas no coinciden",
                repeatNewPassword: "Las contraseñas no coinciden",
            });
        } else if (size(formData.password) < 6) {
            setErrors({
                newPassword: "Debe tener al menos 6 caracteres",
                repeatNewPassword: "Debe tener al menos 6 caracteres"
            });
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
                placeholder="Contraseña"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                password={true}
                secureTextEntry={!showPassword}
                onChange={e => onChange(e, "password")}
                errorMessage={errors.password}
            />

            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: showNewPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowNewPassword(!showNewPassword)
                }}
                password={true}
                secureTextEntry={!showNewPassword}
                onChange={e => onChange(e, "newPassword")}
                errorMessage={errors.newPassword}
            />

            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showRepeatPassword ? "eye-off-outline" : "eye-outline" }
                        color="#c2c2c2"
                        onPress={() => setShowRepeatPassword(!showRepeatPassword) } />
                }
                password={true}
                secureTextEntry={!showRepeatPassword}
                onChange={e => onChange(e, "repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            />

            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />

            <Text>{errors.other}</Text>
        </View>
    );
}

function defaultData() {
    return {
        password: "",
        newPassword: "",
        repeatNewPassword: "",
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