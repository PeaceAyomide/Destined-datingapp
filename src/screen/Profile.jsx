import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Profile = () => {
  // Profile data
  const profileData = {
    name: 'Peace Ayomide',
    age: 24,
    location: 'Akure, Nigeria',
    color: '#FF9F9F',  // Using the same color scheme as your app
  };

  // Profile options
  const options = [
    { id: 1, title: 'Edit Profile', icon: 'edit' },
    { id: 2, title: 'Notifications', icon: 'bells' },
    { id: 3, title: 'Privacy', icon: 'lock' },
    { id: 4, title: 'Help & Support', icon: 'questioncircleo' },
    { id: 5, title: 'About', icon: 'infocirlceo' },
    { id: 6, title: 'Logout', icon: 'logout' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Profile Header */}
      <View style={{ padding: 20, alignItems: 'center' }}>
        {/* Profile Picture */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: profileData.color,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
        }}>
          <Text style={{ 
            color: '#fff', 
            fontSize: 40, 
            fontWeight: '600' 
          }}>
            {profileData.name[0]}
          </Text>
        </View>

        {/* Profile Info */}
        <Text style={{ 
          fontSize: 24, 
          fontWeight: '700', 
          color: '#33196B',
          marginBottom: 5,
        }}>
          {profileData.name}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#666',
          marginBottom: 5,
        }}>
          {profileData.age} years old
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: '#666',
          marginBottom: 20,
        }}>
          {profileData.location}
        </Text>

        {/* Stats Row */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          width: '100%',
          paddingVertical: 20,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#33196B' }}>254</Text>
            <Text style={{ color: '#666' }}>Matches</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#33196B' }}>146</Text>
            <Text style={{ color: '#666' }}>Likes</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#33196B' }}>85</Text>
            <Text style={{ color: '#666' }}>Friends</Text>
          </View>
        </View>
      </View>

      {/* Options List */}
      <View style={{ padding: 20 }}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
          >
            <AntDesign 
              name={option.icon} 
              size={24} 
              color={option.title === 'Logout' ? '#FF4B91' : '#33196B'}
              style={{ marginRight: 15 }}
            />
            <Text style={{ 
              flex: 1,
              fontSize: 16,
              color: option.title === 'Logout' ? '#FF4B91' : '#33196B',
            }}>
              {option.title}
            </Text>
            <AntDesign name="right" size={16} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;