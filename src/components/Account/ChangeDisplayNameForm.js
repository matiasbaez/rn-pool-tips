import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/auth';

export default function ChangeDisplayName(props) {
    const { name, setShowModal, toastRef, setReloadUserInfo } = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useSelector(state => state.auth);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = () => {
        setError(null);
        if (!newDisplayName) {
            setError("El nombre no puede estar vacio.");
        } else if (name === newDisplayName) {
            setError("El nombre no puede ser igual al actual.");
        } else {
            setIsLoading(true);
            dispatch( updateUser(auth, {name: newDisplayName}) )
            toastRef.current.show('Nombre actualizado correctamente')
            setShowModal(false);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.view}>
            <Input
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2",
                }}
                defaultValue={name || ""}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Guardar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
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
        backgroundColor: '#252d3d', // '#00cdf7',
    },
});