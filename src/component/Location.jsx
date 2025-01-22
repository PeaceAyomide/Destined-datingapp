import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, Linking, Platform, AppState, KeyboardAvoidingView } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import * as Location from 'expo-location'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const LocationComponent = () => {
  // State variables to manage different aspects of the component
  const [address, setAddress] = React.useState('') // Stores the main selected location address
  const [searchText, setSearchText] = React.useState('') // Stores what user types in search box
  const [suggestions, setSuggestions] = React.useState([]) // Stores location suggestions while typing
  const [isLocationSet, setIsLocationSet] = React.useState(false)
  const navbtn = useNavigation();

  // Function to open device settings when location permission is needed
  const openSettings = () => {
    Platform.OS === 'ios' 
      ? Linking.openURL('app-settings:') // For iOS devices
      : Location.enableLocationAsync() // For Android devices
  }

  // Function to get user's current location - only called when user taps the button
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Please enable location access in settings.',
          [
            { text: 'Open Settings', onPress: openSettings },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        return;
      }

      setAddress('Getting location...');
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const { latitude, longitude } = location.coords;
      const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
      
      if (result) {
        const formattedAddress = `${result.street || ''} ${result.city || ''} ${result.region || ''}`.trim();
        setAddress(formattedAddress);
        setIsLocationSet(true);
      }
    } catch (error) {
      setAddress('');
      setIsLocationSet(false);
      Alert.alert(
        'Location Error',
        'Could not fetch location. Please check your settings.',
        [
          { text: 'Open Settings', onPress: openSettings },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    }
  };

  // Function to get location suggestions as user types
  const getSuggestions = async (text) => {
    setSearchText(text) // Update search input text
    
    // Clear suggestions if search box is empty
    if (!text.trim()) {
      setSuggestions([])
      return
    }

    try {
      // Search for locations matching the text
      const results = await Location.geocodeAsync(text)
      if (results && results.length > 0) {
        // Convert up to 5 results into readable addresses
        const suggestedAddresses = await Promise.all(
          results.slice(0, 5).map(async ({ latitude, longitude }) => {
            const [result] = await Location.reverseGeocodeAsync({ latitude, longitude })
            if (result) {
              return {
                address: `${result.street || ''} ${result.city || ''} ${result.region || ''}`.trim(),
                coords: { latitude, longitude }
              }
            }
            return null
          })
        )
        setSuggestions(suggestedAddresses.filter(Boolean)) // Update suggestions list
      } else {
        setSuggestions([]) // Clear suggestions if no results
      }
    } catch (error) {
      setSuggestions([]) // Clear suggestions if error occurs
    }
  }

  // Function to handle when user selects a suggestion
  const selectSuggestion = (suggestion) => {
    setAddress(suggestion.address) // Update main address with selected suggestion
    setSearchText('') // Clear search box
    setSuggestions([]) // Clear suggestions list
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Handle keyboard differently per platform
      style={{flex: 1}}
    >
      {/* Back button positioned at the top */}
      <View style={{
        position: 'absolute',
        top: 50, // Adjust this value based on your device's status bar height
        left: 20,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
      }}>
        <TouchableOpacity hitSlop={40} onPress={() => navbtn.goBack()}>
          <FontAwesomeIcon name="arrow-left" size={24} color="#4635E2" />
        </TouchableOpacity>
      </View>

      <View style={{flex:1, justifyContent:'center', alignItems:'center', gap:20}}>
        {/* Title and description section */}
        <Text style={{fontSize: 30, fontWeight: '600', color: '#33196B'}}>Location</Text>
        <Text style={{fontSize: 12, fontWeight: '500', color: '#645290', width: '80%',textAlign:'center'}}>
          Let the app locate you to provide best searched results around you
        </Text>

        {/* Main location display button - shows current/selected location */}
        <TouchableOpacity 
          onPress={getCurrentLocation}
          activeOpacity={0.7}
          disabled={address === 'Getting location...'}
          style={{ 
            position: 'relative', 
            width: '80%',
            zIndex: 1,
            opacity: address === 'Getting location...' ? 0.7 : 1
          }}
        >
          <View style={{
            position: 'relative',
            width: '100%',
          }}>
            <TextInput
              placeholder='Location'
              placeholderTextColor={'#33196B'}
              value={address}
              editable={false}
              pointerEvents="none"
              style={{
                borderWidth: 1,
                borderColor: '#8A52F3',
                width: '100%',
                padding: 13,
                borderRadius: 20,
                paddingRight: 50,
              }}
            />
            <View 
              style={{
                position: 'absolute',
                right: 20,
                top: 12,
                pointerEvents: 'none'
              }}
            >
              <AntIcon name="enviromento" size={24} color="#8A52F3" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Search location section with suggestions dropdown */}
        <View style={{ 
          position: 'relative', 
          width: '80%',
          zIndex: 2,
        }}>
          <View style={{
            position: 'relative',
            width: '100%',
          }}>
            <TextInput
              placeholder='Search New Location'
              placeholderTextColor={'#33196B'}
              value={searchText}
              onChangeText={getSuggestions}
              style={{
                borderWidth: 1,
                borderColor: '#8A52F3',
                width: '100%',
                padding: 13,
                borderRadius: 20,
                paddingRight: 50,
                color: '#33196B',
              }}
            />
            <TouchableOpacity 
              onPress={() => searchText && getSuggestions(searchText)}
              style={{
                position: 'absolute',
                right: 20,
                top: 12,
              }}
            >
              <AntIcon name="search1" size={24} color="#8A52F3" />
            </TouchableOpacity>
          </View>

          {suggestions.length > 0 && (
            <View style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              zIndex: 3,
            }}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectSuggestion(suggestion)}
                  style={{
                    padding: 15,
                    borderBottomWidth: index < suggestions.length - 1 ? 1 : 0,
                    borderBottomColor: '#eee',
                  }}
                >
                  <Text style={{ color: '#33196B' }}>{suggestion.address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Continue button - only visible when location is selected */}
        <TouchableOpacity 
          style={{ opacity: address && address !== 'Getting location...' ? 1 : 0 }}
          disabled={!address || address === 'Getting location...'}
          onPress={() => navbtn.navigate('Tab')}
        >
          <LinearGradient
            colors={['#FA457E', '#7B49FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 26, paddingVertical: 15, borderRadius: 20, marginTop: 20}}
          >
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LocationComponent