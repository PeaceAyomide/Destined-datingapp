import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const StartDating = () => {
    const floatAnim = useRef(new Animated.Value(0)).current;
    const navbtn = useNavigation();

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 10,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#33196B' }}>Online Dating App</Text>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#33196B',flexWrap: 'wrap' }}>Find your
            best match</Text>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#4735E1' }}> Wanna know how the app works? </Text>
            <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
                <Image source={require('../assets/StartDating.png')} style={{ width: 300, height: 400, resizeMode: 'contain' }} />
            </Animated.View>
            <TouchableOpacity onPress={() => navbtn.navigate('Login')}>
                <LinearGradient
                    colors={['#FA457E', '#7B49FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ paddingHorizontal: 26, paddingVertical: 15, borderRadius: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Start Dating</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default StartDating;