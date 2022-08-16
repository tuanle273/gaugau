import * as React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import GirlScreen from './GirlScreen';
import BoyScreen from './BoyScreen';
const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Ky" 
      options={{tabBarIcon: () => <Text>🐰</Text>}}
      component={GirlScreen} />
      <Tab.Screen name="Cua" 
      options={{tabBarIcon: () => <Text>🦀</Text>}}
      component={BoyScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen
