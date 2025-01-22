import React, { useState, useEffect } from 'react'
// Icon Imports
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
// Component Imports
import Home from './screen/Home'
import Contact from './screen/Contact'
import Chat from './screen/Chat'
import Profile from './screen/Profile'


import { View, Text, TouchableOpacity, Platform } from 'react-native'

const Tab = () => {
  // State Management
  const [activeTab, setActiveTab] = React.useState('Home')
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* Top Header with Notification and Profile */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 59,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
      }}>
        {/* Logo Section */}
        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
        <AntDesign name="pluscircle" size={30} color="#FF2C6B" />
        <Text style={{ fontSize: 20, fontWeight: '500', color: '#33196B' }}>Add Story</Text>
         
         </View>
       
        {/* Notification and Profile Icons */}
        
        <View style={{ flexDirection: 'row', gap: 25, alignItems: 'center',  }}>
          <TouchableOpacity>
            <AntDesign name="search1" size={25} color="#4635E2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell" size={25} color="#4635E2" />
            {showNotification && (
              <View style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'red',
                position: 'absolute',
                top: -2,
                right: -2,
              }} />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
          <Ionicons name="settings" size={25} color="#4635E2" />
          </TouchableOpacity>
        </View>
         </View>

      {/* Main Content Area - Tab Screens */}
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Home Screen */}
        {activeTab === 'Home' && <Home />}
        {/* Service Screen */}
        {activeTab === 'Service' && <Contact />}
        {/* About Screen */}
        {activeTab === 'About' && <Chat />}
        {/* Profile Screen */}
        {activeTab === 'Profile' && <Profile />}
      </View>

      {/* Bottom Navigation Tabs */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: Platform.OS === 'android' ? 8 : 15,
        borderTopWidth: 1,
        borderTopColor: '#fff'
      }}>
        {/* Tab Buttons */}
        {['Home', 'Service', 'About', 'Profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              paddingVertical: Platform.OS === 'android' ? 12 : 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5
            }}
          >
            {/* Tab Icons */}
            {tab === 'Home' ? (
              // Home Tab - Cards Icon
              <MaterialCommunityIcons 
                name="cards" 
                size={35} 
                color={activeTab === tab ? '#8A52F3' : '#33196B'} 
              />
            ) : tab === 'Service' ? (
              // Service Tab - Dots Grid Icon
              <MaterialCommunityIcons 
                name="dots-grid" 
                size={35} 
                color={activeTab === tab ? '#8A52F3' : '#33196B'} 
              />
            ) : tab === 'About' ? (
              // About Tab - Chat Bubble Icon
              <Ionicons 
                name="chatbubble-ellipses" 
                size={35} 
                color={activeTab === tab ? '#8A52F3' : '#33196B'} 
              />
            ) : (
              // Profile Tab - Person Icon
              <Ionicons 
                name="person-sharp" 
                size={35} 
                color={activeTab === tab ? '#8A52F3' : '#33196B'} 
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Tab