import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

// Get screen dimensions for calculations
const SCREEN_WIDTH = Dimensions.get('window').width
// Define swipe threshold (25% of screen width)
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25

// Sample data for cards with more muted colors
const DUMMY_DATA = [
  { 
    id: 1, 
    name: 'Anna Mcconaughey',
    distance: '1.5 km away',
    avatar: 'https://yourdefaultavatar.url',
    color: '#FF8A66' // Muted orange
  },
  { 
    id: 2, 
    name: 'Sarah Johnson',
    distance: '2.3 km away',
    avatar: 'https://yourdefaultavatar.url',
    color: '#88C999' // Muted sage green
  },
  { 
    id: 3, 
    name: 'Emily Parker',
    distance: '3.1 km away',
    avatar: 'https://yourdefaultavatar.url',
    color: '#668AFF' // Muted blue
  },
  { 
    id: 4, 
    name: 'Rachel Green',
    distance: '0.8 km away',
    avatar: 'https://yourdefaultavatar.url',
    color: '#FF66B2' // Muted pink
  },
  { 
    id: 5, 
    name: 'Lisa Thompson',
    distance: '1.7 km away',
    avatar: 'https://yourdefaultavatar.url',
    color: '#B266FF' // Muted purple
  },
]

const Home = () => {
  // Track current card index
  const [currentIndex, setCurrentIndex] = useState(0)
  // Animated values for card movement
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  // Handle left swipe action
  const handleSwipeLeft = () => {
    console.log('Swiped Left (Unlike)')
    nextCard()
  }

  // Handle right swipe action
  const handleSwipeRight = () => {
    console.log('Swiped Right (Like)')
    nextCard()
  }

  // Move to next card with infinite loop
  const nextCard = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === DUMMY_DATA.length - 1 ? 0 : prevIndex + 1
    )
    translateX.value = 0
    translateY.value = 0
  }

  // Handle card gesture events (drag/swipe)
  const gestureHandler = useAnimatedGestureHandler({
    // Store initial position when gesture starts
    onStart: (_, context) => {
      context.startX = translateX.value
      context.startY = translateY.value
    },
    // Update position while dragging
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX
      translateY.value = context.startY + event.translationY
    },
    // Handle gesture end (swipe or return)
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withSpring(Math.sign(event.translationX) * SCREEN_WIDTH * 1.5)
        translateY.value = withSpring(0)
        if (event.translationX > 0) {
          runOnJS(handleSwipeRight)()
        } else {
          runOnJS(handleSwipeLeft)()
        }
      } else {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    },
  })

  // Animated styles for current card (rotation and position)
  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      [30, 0, -30]
    )

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` }
      ]
    }
  })

  // Animated styles for next card (scaling)
  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, SCREEN_WIDTH],
      [0.9, 1]
    )

    return {
      transform: [{ scale }]
    }
  })

  const renderCard = (data, isNext = false) => {
    return (
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: data.color,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'flex-end', // Align content to bottom
      }}>
        {/* User Info Container */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          gap: 15
        }}>
          {/* Avatar */}
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#8A52F3', // Purple avatar background
          }} />
          
          {/* Name and Distance */}
          <View>
            <Text style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '600',
              marginBottom: 4
            }}>
              {data.name}
            </Text>
            <Text style={{
              color: '#fff',
              fontSize: 14,
              opacity: 0.8
            }}>
              {data.distance}
            </Text>
          </View>
        </View>

        {/* Dots Indicator */}
        <View style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 15
        }}>
          {[...Array(5)].map((_, i) => (
            <View 
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === 0 ? '#fff' : 'rgba(255,255,255,0.5)'
              }}
            />
          ))}
        </View>
      </View>
    )
  }

  if (currentIndex >= DUMMY_DATA.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: '#33196B' }}>No more cards!</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Stack of Cards */}
      <View style={{ width: '90%', height: '70%', alignItems: 'center' }}>
        {/* Next Card */}
        <Animated.View style={[{
          width: '90%',
          height: '100%',
          position: 'absolute',
          borderRadius: 20,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          zIndex: 1,
        }, nextCardStyle]}>
          {renderCard(DUMMY_DATA[(currentIndex + 1) % DUMMY_DATA.length], true)}
        </Animated.View>

        {/* Current Card */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[{
            width: '90%',
            height: '100%',
            position: 'absolute',
            borderRadius: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 2,
          }, cardStyle]}>
            {renderCard(DUMMY_DATA[currentIndex])}
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Action Buttons */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        marginTop: 20
      }}>
        {/* Unlike Button */}
        <TouchableOpacity 
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            overflow: 'hidden',  // Important for gradient
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          onPress={() => {
            translateX.value = withSpring(-SCREEN_WIDTH * 1.5)
            runOnJS(handleSwipeLeft)()
          }}
        >
          <LinearGradient
            colors={['#FF7D95', '#EF3349']}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AntDesign name="dislike1" size={30} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Like Button */}
        <TouchableOpacity 
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            overflow: 'hidden',  // Important for gradient
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          onPress={() => {
            translateX.value = withSpring(SCREEN_WIDTH * 1.5)
            runOnJS(handleSwipeRight)()
          }}
        >
          <LinearGradient
            colors={['#34F07F', '#10AA7C']}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AntDesign name="like1" size={30} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Love Button */}
        <TouchableOpacity 
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            overflow: 'hidden',  // Important for gradient
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          onPress={() => {
            translateX.value = withSpring(SCREEN_WIDTH * 1.5)
            runOnJS(handleSwipeRight)()
          }}
        >
          <LinearGradient
            colors={['#FFBC7D', '#EF5533']}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AntDesign name="heart" size={30} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home