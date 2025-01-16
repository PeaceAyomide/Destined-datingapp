import React from 'react'
import { View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const Show = () => {
  return (
   <LinearGradient
   colors={['#FA457E', '#7B49FF']} // Gradient colors from FA457E to 7B49FF
 style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }} >
     <Image source={require('./assets/showlogo.png')}  />
 
   </LinearGradient>  
   )
}

export default Show