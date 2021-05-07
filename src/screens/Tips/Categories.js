import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import { map } from 'lodash'

import Loading from '../../components/Loading';
import Category from './Category';

import { finishLoading, startLoading } from '../../actions/ui'
import { settings } from '../../utils/api'

export default function Categories(props) {

    const dispatch = useDispatch()
    const { navigation } = props
    const { loading } = useSelector(state => state.ui)
    const [categories, setCategories] = useState([])

    useFocusEffect(
        useCallback(() => {
            (async () => {
                dispatch( startLoading() )

                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
        
                const request = new Request(`${settings.host}/api/categories`, options)
                const response = await fetch(request)
                const json = await response.json()

                if (response.ok) {
                    setCategories(json.data)
                }

                dispatch( finishLoading() )
            })()
        }, [])
    )

    return (
        <View style={{ paddingHorizontal: 20 }}>
            {
                map(categories, (category, index) => (
                    <Category key={index} category={category} navigation={navigation} />
                ))
            }
            
            {loading && (<Loading isVisible={loading} text="Cargando..." />) }
        </View>
    )
}
