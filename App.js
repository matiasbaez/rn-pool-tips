import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux'

import Navigation from './src/navigations/Navigation'

import { oneSignalSetup } from './src/utils/oneSignal';
import { store } from './src/store/store'

export default function App() {

  // const dispatch = useDispatch();
  // const state = useSelector(state => state)

  useEffect(() => {
    // oneSignalSetup(dispatch);
  }, [])

  return (
    <Provider store={ store }>
      <Navigation />
    </Provider>
  );
}

