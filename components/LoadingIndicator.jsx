import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const LoadingIndicator = ({size="large",color = '#007AFF',}) => {
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