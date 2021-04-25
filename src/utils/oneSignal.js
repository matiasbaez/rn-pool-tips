
import OneSignal from 'react-native-onesignal';

import { deviceState } from '../actions/onesignal';

export const oneSignalSetup = async (dispatch) => {

    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('da75f998-b004-48a9-81af-5b42a352c94b');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //     console.log('Prompt response:', response);
    // });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
        console.log('OneSignal: notification will show in foreground:', notifReceivedEvent);
        let notif = notifReceivedEvent.getNotification();
        console.log('notification: ', notif);

        // const button1 = {
        //     text: 'Cancel',
        //     onPress: () => { notifReceivedEvent.complete(); },
        //     style: 'cancel'
        // };

        // const button2 = { text: 'Complete', onPress: () => { notifReceivedEvent.complete(notif); }};

        // Alert.alert('Complete notification?', 'Test', [ button1, button2], { cancelable: true });
    });

    OneSignal.setNotificationOpenedHandler(notification => {
        console.log('OneSignal: notification opened:', notification);
    });

    OneSignal.setInAppMessageClickHandler(event => {
        console.log('OneSignal IAM clicked:', event);
    });

    OneSignal.addEmailSubscriptionObserver((event) => {
        console.log('OneSignal: email subscription changed: ', event);
    });

    OneSignal.addSubscriptionObserver(event => {
        console.log('OneSignal: subscription changed:', event);
        // this.setState({ isSubscribed: event.to.isSubscribed})
    });

    OneSignal.addPermissionObserver(event => {
        console.log('OneSignal: permission changed:', event);
    });

    const state = await OneSignal.getDeviceState();
    console.log('deviceState: ', state.isSubscribed);

    // dispatch( deviceState(state.isSubscribed) )
}
