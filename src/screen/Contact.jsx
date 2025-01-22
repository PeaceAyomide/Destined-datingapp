import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, Animated } from 'react-native'

const Contact = () => {
  // ================ DATA SECTION ================
  // Status circle data - defines the 8 circles at the top
  const statusData = [
    { id: 1, name: 'Your Story', color: '#FF9F9F' },  // Soft red
    { id: 2, name: 'John', color: '#94B3FD' },        // Soft blue
    { id: 3, name: 'Sarah', color: '#B983FF' },       // Soft purple
    { id: 4, name: 'Mike', color: '#99FEDD' },        // Mint green
    { id: 5, name: 'Emma', color: '#FFC7C7' },        // Light pink
    { id: 6, name: 'Alex', color: '#87CEEB' },        // Sky blue
    { id: 7, name: 'Lisa', color: '#FFB4B4' },        // Coral
    { id: 8, name: 'Tom', color: '#B5F1CC' },         // Light green
  ]

  // User cards data - defines the grid of cards below
  const userCards = [
    { id: 1, name: 'John', age: 28, distance: '1.5 km away', color: '#94B3FD', isOnline: true, isNewDater: false, hasLikedYou: true },
    { id: 2, name: 'Sarah', age: 33, distance: '1.5 km away', color: '#B983FF', isOnline: false, isNewDater: true, hasLikedYou: false },
    { id: 3, name: 'Mike', age: 25, distance: '2.0 km away', color: '#99FEDD', isOnline: true, isNewDater: true, hasLikedYou: false },
    { id: 4, name: 'Emma', age: 30, distance: '3.2 km away', color: '#FFC7C7', isOnline: false, isNewDater: false, hasLikedYou: true },
    { id: 5, name: 'Alex', age: 27, distance: '1.8 km away', color: '#87CEEB', isOnline: true, isNewDater: false, hasLikedYou: false },
    { id: 6, name: 'Lisa', age: 29, distance: '2.5 km away', color: '#FFB4B4', isOnline: false, isNewDater: true, hasLikedYou: true },
    { id: 7, name: 'Tom', age: 31, distance: '1.2 km away', color: '#B5F1CC', isOnline: true, isNewDater: false, hasLikedYou: false },
  ]

  // Calculate card width for 2 columns with proper spacing
  const windowWidth = Dimensions.get('window').width
  const cardWidth = (windowWidth - 45) / 2 // 45 = padding (15) * 3

  const [activeTab, setActiveTab] = useState('All');

  // Filter cards based on active tab
  const filteredCards = userCards.filter(card => {
    switch(activeTab) {
      case 'Online':
        return card.isOnline;
      case 'New Daters':
        return card.isNewDater;
      case 'Liked You':
        return card.hasLikedYou;
      default:
        return true; // 'All' tab shows everything
    }
  });

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const renderStatusItem = (item) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <AnimatedTouchable 
        key={item.id}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          { 
            marginRight: 15, 
            alignItems: 'center',
            transform: [{ scale }]
          }
        ]}
      >
        <View style={{
          width: 68,
          height: 68,
          borderRadius: 34,
          borderWidth: 2,
          borderColor: '#e95950',
          padding: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: item.color,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>
              {item.name[0]}
            </Text>
          </View>
        </View>
        <Text style={{
          marginTop: 5,
          fontSize: 12,
          color: '#262626',
          textAlign: 'center',
        }}>
          {item.name}
        </Text>
      </AnimatedTouchable>
    );
  };

  const renderCard = (user) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.95,  // Slightly less scale reduction for larger cards
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <AnimatedTouchable 
        key={user.id}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          {
            width: cardWidth,
            height: cardWidth * 1.2,
            marginBottom: 15,
            transform: [{ scale }]
          }
        ]}
      >
        <View style={{
          flex: 1,
          backgroundColor: user.color,
          borderRadius: 20,
          padding: 15,
          justifyContent: 'flex-end',
          position: 'relative',
        }}>
          {/* Online status dot */}
          {user.id % 2 === 1 && (
            <View style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#4CD080',
              position: 'absolute',
              top: 15,
              right: 15,
            }} />
          )}
          
          {/* User name and age */}
          <Text style={{ 
            color: '#fff', 
            fontSize: 16, 
            fontWeight: '600' 
          }}>
            {user.name}, {user.age}
          </Text>
          
          {/* Distance information */}
          <Text style={{ 
            color: '#fff', 
            fontSize: 12, 
            opacity: 0.8,
            marginTop: 5
          }}>
            {user.distance}
          </Text>
        </View>
      </AnimatedTouchable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* ================ SECTION 1: STATUS CIRCLES ================
          This section creates the horizontal scrollable status circles at the top */}
      <View style={{ marginBottom: 3 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ padding: 15 }}
        >
          {statusData.map(renderStatusItem)}
        </ScrollView>
      </View>

      {/* ================ SECTION 2: CATEGORY TABS ================
          Horizontal scrollable tabs for filtering */}
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 33,  // Use consistent gap instead of flex
        paddingHorizontal: 15,
        height: 40,
      
      }}>
        {['All', 'Online', 'New Daters', 'Liked You'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
          >
            <Text style={{ 
              color: activeTab === tab ? '#FF4B91' : '#666', 
              borderBottomWidth: activeTab === tab ? 2 : 0, 
              borderBottomColor: '#FF4B91', 
              paddingBottom: 5,
              textAlign: 'center',  // Center text within its container
              fontSize: 16,
              fontWeight: '600'
            }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================ SECTION 3: USER CARDS GRID ================
          Scrollable grid of user cards, 2 columns */}
      <ScrollView style={{ padding: 15 }}>
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between'
        }}>
          {filteredCards.map(renderCard)}
        </View>
      </ScrollView>
    </View>
  )
}

export default Contact