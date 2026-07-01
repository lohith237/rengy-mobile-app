import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../Theme'

const LoadingIndicator = ({size="large",color = colors.primary}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color}/>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export  {LoadingIndicator}