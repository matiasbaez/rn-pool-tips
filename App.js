import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Navigation from './src/navigations/Navigation'

import { oneSignalSetup } from './src/utils/oneSignal';

export default function App() {

  const dispatch = useDispatch();
  // const state = useSelector(state => state)

  useEffect(() => {
    oneSignalSetup(dispatch);
  }, [])

  return (
    <Navigation />
  );
}

