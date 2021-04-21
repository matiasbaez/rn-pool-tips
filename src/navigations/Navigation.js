import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

import HomeStack from './HomeStack';
import AccountStack from './AccountStack';
import AuthStack from './AuthStack';
import TipsStack from './TipsStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {

    const { logged } = useSelector(state => state.auth);

    return (
        <NavigationContainer>
            { logged ? (
                    <Tab.Navigator
                        tabBarOptions={{
                            inactiveTintColor: '#646464',
                            activeTintColor: '#2b313f'
                        }}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ color }) => screenOptions(route, color)
                        })}>

                        <Tab.Screen name="home" component={HomeStack}
                            options={{ title: 'Estado' }} />

                        <Tab.Screen name="info" component={TipsStack}
                            options={{ title: 'Sugerencias' }} />
        
                        <Tab.Screen name="account" component={AccountStack}
                            options={{ title: 'Perfil' }} />
                        
                    </Tab.Navigator>
            ) : (
                <AuthStack />
            ) }
        </NavigationContainer>
    );
}

function screenOptions(route, color) {
    let iconName;
    switch (route.name) {
        case 'home':
            iconName = 'pool';
            break;

        case 'info':
            iconName = 'information-outline';
            break;

        case 'account':
            iconName = 'home-outline';
            break;

        default:
            iconName = 'home-outline';
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={22} color={color}></Icon>
    );
}
