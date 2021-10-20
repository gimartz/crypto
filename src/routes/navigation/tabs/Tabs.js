import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../../theme'
import Colors from '../../../../theme/colors';

import { Platform, StyleSheet } from 'react-native';
import {Text , ActivityIndicator } from 'react-native';
// stack navigators
import { HomeNavigator, ProfileNavigator } from '../stacks'
import {MaterialCommunityIcons} from '@expo/vector-icons'
// import Search screen
import Search from '../../../../screen/search/Search';

// import Favorites screen
import Cources from '../../../../screens/Cources';
import Shop from '../../../../screens/Shop';
// import Cart screen
import Cart from '../../../../screen/cart/Cart';
import AddButton from "../../../../components/Addbutton";
// import Settings screen
import CartIcon from '../../../../component/shop/CartIconComponent';
import LeftIcon from '../../../../component/icons/LeftIcon';
import FriesOddIcon from '../../../../component/icons/FriesOddIcon';
import FavoritesScreen from '../../../../screen/favorites/Favorites'
const Tab = createBottomTabNavigator()
const textPrimaryColor = 'black'
const TabNavigator = (props) => {
  const user = props.user
  const navigationProps = props.navigationProps
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <FontIcon
                  name="home"
                  color={focused ? colors.lightPurple : colors.gray}
                  size={20}
                  solid
                />
              )
            case 'Profile':
            return (
              <FontIcon
                name="user"
                color={focused ? colors.lightPurple : colors.gray}
                size={20}
                solid
              />
            )
            default:
              return <View />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.lightPurple,
        inactiveTintColor: colors.gray,
      }}
      initialRouteName="Home"
      swipeEnabled={true}
    >
      <Tab.Screen
        name="Home" options={{ headerShown: false}}
        children={()=> <HomeNavigator user={user} navigationProps={navigationProps}  />}
      />
          <Tab.Screen
          name="favor"
          component={FavoritesScreen}
          options={{  headerShown: false,
            tabBarLabel: 'Wishlist',tabBarColor: '#b71525',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book-account" color={color} size={28} />
            ),
          }}
           /><Tab.Screen
          name = {null}
          component={Shop}
       
              options={({navigation}) => ({
                headerShown: false,
            tabBarLabel: '',tabBarActiveTintColor: '#b71525',
            tabBarIcon: ({ color }) => (
              <AddButton />
            ),
         
          headerRight: () => (
            <CartIcon
              navigation={navigation}
              color={textPrimaryColor}
              style={styles.cart}
            />
          ),
          headerRightContainerStyle: styles.rightIcon,
      
        })}
             />
              
           <Tab.Screen
          name="add"
          component={Search}
          options={{ headerShown: false,
            tabBarLabel: 'Courses',tabBarColor: '#b71525',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book-search" color={color} size={28} />
            ),
          }}
           />
         
      <Tab.Screen
        name="Account"
        children={()=> <ProfileNavigator user={user} navigationProps={navigationProps}/>}
         options={{ headerShown: false,
            tabBarLabel: 'My Account',tabBarColor: '#b71525',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="card-account-details-star-outline" color={color} size={28} />
            ),}}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

  rightIcon: {
    marginRight: 30,
  },

  cart: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigator
