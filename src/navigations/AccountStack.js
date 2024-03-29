
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Account from '../screens/Account/Account';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="account" component={Account}
                options={{ title: "Mi Cuenta" }} />
        </Stack.Navigator>
    );
}