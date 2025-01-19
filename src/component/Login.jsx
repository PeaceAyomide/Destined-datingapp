import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import CountryPicker from 'react-native-country-picker-modal'


// Wrapper component with modern props handling
const CustomCountryPicker = ({ 
  countryCode = 'US',
  onSelect,
  withFilter = true,
  withFlag = true,
  withCountryNameButton = false,
  withCallingCode = true
}) => {
  return (
    <CountryPicker
      countryCode={countryCode}
      onSelect={onSelect}
      withFilter={withFilter}
      withFlag={withFlag}
      withCountryNameButton={withCountryNameButton}
      withCallingCode={withCallingCode}
    />
  );
};

const Login = () => {
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [callingCode, setCallingCode] = useState('1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navbtn = useNavigation();

  const handlePhoneNumberChange = (text) => {
    // Remove any non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    setPhoneNumber(limited);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#33196B'}}>
          Login
        </Text>
        <Text style={{textAlign: 'center', width: 300, color: '#33196B', fontSize: 14}}>
          Please enter your valid phone number. 
          We will send you a 4-digit code to verify
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#8A52F3', borderRadius: 18, padding: 15, width: 300 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomCountryPicker
              countryCode={countryCode}
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCountry(country);
                setCallingCode(country.callingCode[0]);
              }}
            />
            <Text style={{ marginHorizontal: 5, color: '#33196B' }}>+{callingCode}</Text>
          </View>
          <TextInput
            placeholder="Enter phone number"
            style={{ flex: 1, marginLeft: 10 }}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            maxLength={10}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <TouchableOpacity onPress={() => navbtn.navigate('OtpVerification')} >
          <LinearGradient
            colors={['#FA457E', '#7B49FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 26, paddingVertical: 15, borderRadius: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Start Dating</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: '500', color: '#33196B', textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
          OR
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#33196B', textAlign: 'center' }}>
          Login using
        </Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity style={{ backgroundColor: '#2942C7', padding: 6, borderRadius: 50,  }} onPress={() => navbtn.navigate('OtpVerification')}>
            <EvilIcon name="sc-facebook" size={39} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#DF4D5F', padding: 9, borderRadius: 50 }} onPress={() => navbtn.navigate('OtpVerification')}>
            <AntIcon name="google" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login