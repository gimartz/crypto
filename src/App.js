import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

import store from './utils/store'
import './utils/ignore'
import { Provider } from 'react-redux'
import configureStore from "../redux/store";
// assets

// assets
import { imageAssets } from './theme/images'
import { fontAssets } from './theme/fonts'
import Router from './routes'


// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
 
  Text,
  Image
} from 'react-native';



const TOPIC = 'MyNews';


  
const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)
 
  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
 useEffect(() => {
    handleLoadAssets()
  }, [])
  // rendering
  

  if (!didLoad) return <View />
 
  return (
    <Provider store={store}>
    
      <Router />
  
     </Provider>
  )
}

export default App
