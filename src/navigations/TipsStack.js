
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from '../screens/Tips/Categories';
import Tips from '../screens/Tips/Tips';

const Stack = createStackNavigator();

export default function TipsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="categories" component={Categories}
                options={{ title: "Informaciones" }} />

            <Stack.Screen name="info" component={Tips} />
        </Stack.Navigator>
    );
}