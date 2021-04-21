
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Tips from '../screens/Tips/Tips';

const Stack = createStackNavigator();

export default function TipsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="info" component={Tips}
                options={{ title: "Sugerencias" }} />
        </Stack.Navigator>
    );
}