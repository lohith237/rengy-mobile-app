import React, { useEffect } from 'react'
import { LoadingIndicator } from '../../components'
const Initializing = ({navigation}) => {
    useEffect(()=>{
      setTimeout(()=>{
          navigation.replace("Home")
      },1500)
    },[navigation])
  return (
      <LoadingIndicator/>
  )
}
export  {Initializing}