
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-easy-toast';

import Loading from '../../components/Loading';
import UserInfo from '../../components/Account/UserInfo';
import AccountOptions from '../../components/Account/AccountOptions';
import { getUser, startLogout } from '../../actions/auth';

export default function UserLogged() {

    const toastRef = useRef();

    const dispatch = useDispatch()
    const { user:userInfo, access_token } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [realoadUserInfo, setReloadUserInfo] = useState(false);

    useEffect(() => {
        (async () => {
            dispatch( getUser(access_token) )
        })();
        setReloadUserInfo(false);
    }, [realoadUserInfo])

    const logout = () => {
        dispatch( startLogout(access_token) )
    }

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <UserInfo
                userInfo={userInfo}
                toastRef={toastRef}
                setLoading={setLoading}
                setLoadingText={setLoadingText} />}

            {userInfo && <AccountOptions
                userInfo={userInfo}
                toastRef={toastRef}
                setReloadUserInfo={setReloadUserInfo} />}

            <Button
                title="Cerrar sessión"
                titleStyle={styles.btnCloseSessionText}
                buttonStyle={styles.btnCloseSession}
                onPress={logout} />

            {loading && (<Loading isVisible={loading} text={loadingText} />) }
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: "#00e680"
    }
});
