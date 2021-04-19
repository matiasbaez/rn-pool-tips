import React from 'react'
import { Redirect } from 'react-router-dom'
import { createStackNavigator } from '@react-navigation/stack';

import { PropTypes } from 'prop-types';

const Stack = createStackNavigator();

export default function PrivateStack({
    isLogged,
    component: Component,
    ...rest
}) {

    return (
        <Stack.Screen
            { ...rest }
            component={ (props) => (
                (isLogged)
                ? <Component {...props} />
                : <Redirect to="/login" />
            ) } />
    )
}

PrivateRoute.propTypes = {
    name:       PropTypes.string.isRequired,
    isLogged:   PropTypes.bool.isRequired,
    component:  PropTypes.func.isRequired
}
