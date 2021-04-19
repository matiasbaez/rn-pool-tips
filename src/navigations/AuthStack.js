
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen name="login" component={Login} 
                options={{ title: "Iniciar Sesión", headerShown: false }} />

            <Stack.Screen name="register" component={Register} 
                options={{ title: "Registro" }} />
        </Stack.Navigator>
    );
}