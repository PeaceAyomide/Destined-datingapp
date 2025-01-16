import React, { useEffect } from 'react'
import { View, Text, Image, Animated, TouchableOpacity, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons' 

const GetStarted = () => {
    const rotateValue = new Animated.Value(0);
    const fadeAnim = new Animated.Value(0);   // For opacity animation

    useEffect(() => {
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    

    // Start fade-in animation after 3 seconds
    const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, 3000); // 3-second delay before starting fade-in

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
}, []);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
            <Animated.Image 
                    source={require('../assets/getstartedbg.png')}
                    style={{ width: 300, height: 400, resizeMode: 'contain',  transform: [{ rotate }] }} 
                />
                <Image 
                    source={require('../assets/getmainlogo.png')}
                    style={{ width: 100, resizeMode: 'contain', position:'absolute' }} />
                
    
                    <Animated.View
                    style={{
                        opacity: fadeAnim, // Bind opacity to animation
                        alignItems: 'center',
                    
                        position: 'absolute',
                        bottom: 90,
                    }}
                >
                    
    <Pressable style={{
                flexDirection: 'row',
                gap: 5,
        
    }}>           
                <Text style={{ fontSize: 13, textAlign: 'center',  
               color: '#CC3263', 
                fontWeight:'700'}}>Get Started</Text>
                <Icon name="arrow-forward" size={18} color="#CC3263" />
                </Pressable> 
          </Animated.View>
           
          </View>
    )
}

export default GetStarted