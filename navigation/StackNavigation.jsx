import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Initializing } from '../screens'
let Stack=createNativeStackNavigator()
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Initializing' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Initializing' component={Initializing}/>
        <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
  )
}

export  {StackNavigation}