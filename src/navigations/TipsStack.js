
import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from '../screens/Tips/Categories';
import Tips from '../screens/Tips/Tips';

const Stack = createStackNavigator();

export default function TipsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="categories" component={Categories}
                options={{ header: (props) => <Header title="Informaciones" /> }} />

            <Stack.Screen name="info" component={Tips} />
        </Stack.Navigator>
    );
}

function Header({ title }) {
    return (
        <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>{title}</Text>
        </View>
    )
}