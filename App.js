import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Show from './src/Show';
import StartDating from './src/component/StartDating'
import GetStarted from './src/component/GetStarted'
import Tab from './src/Tab'

const Stack = createStackNavigator();

const App = () => {

  const [isShowVisible, setIsShowVisible] = useState(true);

  useEffect(() => {
    // Set timeout to switch after 4 seconds
    const timer = setTimeout(() => {
      setIsShowVisible(false);
    }, 4000); // 4000ms = 4 seconds

    return () => clearTimeout(timer); // Clear timer on cleanup
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Show">
        {isShowVisible ? (
          // Display Show component first
          <Stack.Screen name="Show" options={{ headerShown: false }} component={Show} />
        ) : (
          // After 4 seconds, show the main content (GetStarted or Tab)
          <Stack.Screen name="GetStarted" options={{ headerShown: false }} component={GetStarted} />
        )}
        <Stack.Screen name="Tab" options={{ headerShown: false }} component={Tab} />
        <Stack.Screen name="StartDating" options={{ headerShown: false }} component={StartDating} />
      </Stack.Navigator>
    
        </NavigationContainer>
  )
}

export default App