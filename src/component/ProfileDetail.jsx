import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert, TextInput, TouchableWithoutFeedback, Keyboard, Platform, Modal } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileDetail = () => {
  // State to store the image URI - initially set to a placeholder image
  // When user selects a new image, this state will update with the local URI of that image
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);

  // Function to handle image selection
  const pickImage = async () => {
    try {
      // First, ask for permission to access the device's photo library
      // This is required by iOS and newer Android versions for privacy
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      // If user denied permission, show an alert and exit the function
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // Launch the image picker with these options:
      // - mediaTypes: Only allow images (no videos)
      // - allowsEditing: Show the image editor for cropping
      // - aspect: Force a square aspect ratio (1:1)
      // - quality: Maximum quality (1)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // If user successfully picked an image (didn't cancel)
      // Update our image state with the selected image's URI
      // result.assets[0].uri contains the local path to the selected image
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      // If anything goes wrong during the process, show an alert
      Alert.alert('Error picking image', error.message);
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate && event.type !== 'dismissed') {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      setDisplayDate(formattedDate);
    }
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
    Keyboard.dismiss();
  };

  const handleDonePress = () => {
    setShowPicker(false);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderModal(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <Text style={{fontSize: 30, fontWeight: '600', color: '#33196B'}}>Profile Details</Text>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#645290'}}>Fill up the following details</Text>
        <View style={{ position: 'relative', marginBottom: 20,marginTop: 20 }}>
          <Image
            source={{ uri: image }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 75,
              borderWidth: 2,
              borderColor: '#8A52F3',
            }}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderRadius: 20,
              overflow: 'hidden'
            }}
          >
            <LinearGradient
              colors={['#FA457E', '#7B49FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                padding: 8,
              }}
            >
              <AntIcon name="camerao" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#645290"
          style={{
            width: 300,
            height: 55,
            borderWidth: 2,
            borderColor: '#8A52F3',
            borderRadius: 25,
            paddingHorizontal: 20,
            fontSize: 16,
            color: '#33196B',
            marginBottom: 15
          }}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#645290"
          style={{
            width: 300,
            height: 55,
            borderWidth: 2,
            borderColor: '#8A52F3',
            borderRadius: 25,
            paddingHorizontal: 20,
            fontSize: 16,
            color: '#33196B',
            marginBottom: 15
          }}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <View style={{ position: 'relative', width: 300 }}>
          <TextInput
            placeholder="DOB"
            placeholderTextColor="#645290"
            style={{
              width: '100%',
              height: 55,
              borderWidth: 2,
              borderColor: '#8A52F3',
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingRight: 50,
              fontSize: 16,
              color: '#33196B',
              marginBottom: 15
            }}
            value={displayDate}
            editable={false}
          />
          <TouchableOpacity 
            onPress={showDatepicker}
            style={{
              position: 'absolute',
              right: 20,
              top: 15,
            }}
          >
            <AntIcon name="calendar" size={24} color="#8A52F3" />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showPicker}
            onRequestClose={() => setShowPicker(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableWithoutFeedback>
                  <View style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    width: '90%',
                    maxWidth: 400,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 20,
                      paddingHorizontal: 10,
                    }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#33196B',
                      }}>Select Date of Birth</Text>
                      <TouchableOpacity onPress={handleDonePress}>
                        <Text style={{
                          fontSize: 16,
                          color: '#8A52F3',
                          fontWeight: '600',
                        }}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                      onChange={onDateChange}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 0, 1)}
                      textColor="#33196B"
                      style={{ backgroundColor: 'white' }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <View style={{ position: 'relative', width: 300 }}>
          <TextInput
            placeholder="Gender"
            placeholderTextColor="#645290"
            style={{
              width: '100%',
              height: 55,
              borderWidth: 2,
              borderColor: '#8A52F3',
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingRight: 50,
              fontSize: 16,
              color: '#33196B',
              marginBottom: 15
            }}
            value={gender}
            editable={false}
          />
          <TouchableOpacity 
            onPress={() => setShowGenderModal(true)}
            style={{
              position: 'absolute',
              right: 20,
              top: 15,
            }}
          >
            <AntIcon name="caretdown" size={24} color="#8A52F3" />
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={showGenderModal}
            onRequestClose={() => setShowGenderModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowGenderModal(false)}>
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableWithoutFeedback>
                  <View style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    width: '90%',
                    maxWidth: 400,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 20,
                      paddingHorizontal: 10,
                    }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#33196B',
                      }}>Select Gender</Text>
                      <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                        <Text style={{
                          fontSize: 16,
                          color: '#8A52F3',
                          fontWeight: '600',
                        }}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{
                      gap: 15,
                    }}>
                      <TouchableOpacity
                        onPress={() => handleGenderSelect('Male')}
                        style={{
                          padding: 15,
                          borderRadius: 12,
                          backgroundColor: gender === 'Male' ? '#8A52F3' : '#F5F5F5',
                        }}
                      >
                        <Text style={{
                          fontSize: 16,
                          color: gender === 'Male' ? 'white' : '#33196B',
                          textAlign: 'center',
                          fontWeight: '500',
                        }}>Male</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleGenderSelect('Female')}
                        style={{
                          padding: 15,
                          borderRadius: 12,
                          backgroundColor: gender === 'Female' ? '#8A52F3' : '#F5F5F5',
                        }}
                      >
                        <Text style={{
                          fontSize: 16,
                          color: gender === 'Female' ? 'white' : '#33196B',
                          textAlign: 'center',
                          fontWeight: '500',
                        }}>Female</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <TouchableOpacity onPress={() => navbtn.navigate('OtpVerification')} >
          <LinearGradient
            colors={['#FA457E', '#7B49FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 26, paddingVertical: 15, borderRadius: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProfileDetail