
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { startUploadImage } from '../../actions/auth';
import { settings } from '../../utils/api';

export default function UserInfo(props) {

    const {
        userInfo: { id, name, email, image },
        setLoadingText,
        setLoading,
        toastRef
    } = props;

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const getProfilePicture = () => {
        return `${settings.host}/storage/user/${id}/${image}`;
    }

    const changeAvatar = async () => {
        const { status } = await Camera.requestPermissionsAsync();

        if (status == "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (result.cancelled) {
                toastRef.current.show('No se ha seleccionado ninguna imagen');
            } else {
                uploadImage(result.uri)
                // .then(() => {
                //     toastRef.current.show('Imagen subida correctamente');
                // })
                // .catch(() => {
                //     setLoading(false);
                //     toastRef.current.show('Error al actualizar la imagen');
                // });
            }
        }
    }

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando imagen");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();

        // UPLOAD
        dispatch( startUploadImage(auth, blob) )

        // setLoadingText("");
        setLoading(false);
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                containerStyle={styles.userInfoAvatar}
                source={image ? {uri: getProfilePicture()} : require("../../../assets/images/default-avatar.jpg")} >
                    <Avatar.Accessory size={22} onPress={changeAvatar} />
                </Avatar>

            <View>
                <Text style={styles.name}>{name ? name : 'Anónimo'}</Text>
                <Text style={styles.email}>{email ? email : 'Social login' }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    name: {
        fontWeight: "bold",
        paddingBottom: 5
    }
});
