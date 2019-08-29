import React from 'react'
import App from './src/container/App'
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
