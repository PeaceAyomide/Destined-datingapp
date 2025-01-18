import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import CountryPicker from 'react-native-country-picker-modal'

const Login = () => {
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navbtn = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#33196B'}}>
        Login
      </Text>
      <Text style={{textAlign: 'center', width: 300, color: '#33196B', fontSize: 14}}>
        Please enter your valid phone number. 
        We will send you a 4-digit code to verify
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#8A52F3', borderRadius: 18, padding: 15, width: 300 }}>
        <CountryPicker
          countryCode={countryCode || 'US'}
          withFilter
          withFlag
          withCountryNameButton={false}
          withCallingCode
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCountry(country);
          }}
        />
        <TextInput
          placeholder="Enter phone number"
          style={{ flex: 1, marginLeft: 10 }}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity onPress={() => navbtn.navigate('Login')} >
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
        <TouchableOpacity style={{ backgroundColor: '#2942C7', padding: 6, borderRadius: 50,  }}>
          <EvilIcon name="sc-facebook" size={39} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#DF4D5F', padding: 9, borderRadius: 50 }}>
          <AntIcon name="google" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login