import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons'

import { StackRoutes } from './stackRoutes'
import { Favorites } from '../pages/favorites'

const Tag = createBottomTabNavigator()

export function Routes() {
  return (
    <Tag.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFF',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0
        }
      }}
    >
      <Tag.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" color="#000" size={size} />
            }
            return <Ionicons name="home-outline" color={color} size={size} />
          }
        }}
      />
      <Tag.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="heart" color="#FF4141" size={size} />
            }
            return <Ionicons name="heart-outline" color={color} size={size} />
          }
        }}
      />
    </Tag.Navigator>
  )
}
