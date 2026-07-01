import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Cart, Favourites, Home, Initializing,ProductDetails } from '../screens'
let Stack=createNativeStackNavigator()
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Initializing' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Initializing' component={Initializing}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='ProductDetails' component={ProductDetails}/>
        <Stack.Screen name='Cart' component={Cart}/>
        <Stack.Screen name='Favourites' component={Favourites}/>
    </Stack.Navigator>
  )
}

export  {StackNavigation}