import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const navbtn = useNavigation();

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    // Move to previous input if backspace is pressed
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#33196B' }}>
          Verify
        </Text>
        <Text style={{ textAlign: 'center', width: 300, color: '#33196B', fontSize: 14 }}>
          Enter the 4-digit code sent to your phone
        </Text>
        
        <View style={{ flexDirection: 'row', gap: 15, marginTop: 20 }}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: '#8A52F3',
                textAlign: 'center',
                fontSize: 20,
                color: '#33196B',
                fontWeight: '600'
              }}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              returnKeyType={index === 3 ? "done" : "next"}
              onSubmitEditing={() => {
                if (index < 3) {
                  inputRefs.current[index + 1].focus();
                } else {
                  Keyboard.dismiss();
                }
              }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={() => navbtn.navigate('ProfileDetail')} >
          <LinearGradient
            colors={['#FA457E', '#7B49FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 56, paddingVertical: 20, borderRadius: 30, marginTop: 20, marginBottom: 20  }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navbtn.navigate('ProfileDetail')}>
            <Text style={{ textAlign: 'center', width: 300, color: '#7B49FF', fontSize: 20, fontWeight: '600' }}>Resend OTP</Text>
        </TouchableOpacity>
       </View>
    </TouchableWithoutFeedback>
  )
}

export default OtpVerification