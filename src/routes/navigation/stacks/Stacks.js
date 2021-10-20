import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../../scenes/login'
import Registration from '../../../scenes/registration'
import Home from '../../../scenes/home'
import Profile from '../../../scenes/profile'
import Detail from '../../../scenes/details'
import Location from '../../../scenes/details/location'
import OnboardingScreen from '../../../../screens/OnBoardScreen';
import RestaurantDetail from "../../../../screens/RestaurantDetail";
import Homee from "../../../../screens/Home";
import OrderCompleted from "../../../../screens/OrderCompleted";
import DetailsScree from '../../../../screens/DetailsScree';
// ------------------------------------
// Constants
// ------------------------------------
import Reset from '../../../scenes/registration/reset'
import App from '../../../../screens/DetailsScree';
import Pay from '../../../../screens/pay'
import Author from '../../../../screens/Authors';
const Stack = createStackNavigator()

// ------------------------------------
// Navigators
// ------------------------------------

export const LoginNavigator = (props) => {
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
    <Stack.Screen
              name="OnboardingScreen"  options={{headerShown: false}}
              component={OnboardingScreen}
            />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
      />
    </Stack.Navigator>
  )
}


export const HomeNavigator = (props) => {
  const user = props.user
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="screen" screenOptions={navigationProps}>
      <Stack.Screen name="Home"options={{ headerShown: false}} >
        {props => <Home {...props} extraData={user}  options={{ headerShown: false}}/>}
      </Stack.Screen>
 <Stack.Screen name="Homee" component={Homee}  options={{ headerShown: false}}  />
          <Stack.Screen name="RestaurantDetail" options={{ headerShown: false}} component={RestaurantDetail} />
          <Stack.Screen name="locate"options={{ headerShown: false}} component={OrderCompleted} />
<Stack.Screen name="OrderCompleted"options={{ headerShown: false}} component={Location} />
             <Stack.Screen name="category" options={{ headerShown: false}}>
        {props => <App {...props} extraData={user}options={{ headerShown: false}} />}
      </Stack.Screen>
        <Stack.Screen name="pay">
        {props => <Pay {...props} extraData={user} options={{ headerShown: false}} />}</Stack.Screen>
         <Stack.Screen name="lesson">
        {props => <Author {...props} extraData={user}options={{ headerShown: false}} />}
      </Stack.Screen>
       
    </Stack.Navigator>
  )
}

export const ProfileNavigator = (props) => {
  const user = props.user
  const navigationProps = props.navigationProps
  return (
    <Stack.Navigator headerMode="none" screenOptions={navigationProps}>
      <Stack.Screen name="Profile" options={{headerShown: false}}> 
        {props => <Profile {...props} extraData={user}  options={{ headerShown: false}}/>}
      </Stack.Screen>
      <Stack.Screen name="Detail" options={{headerShown: false}}>
        {props => <Detail {...props} extraData={user} />}
      </Stack.Screen>
       <Stack.Screen name="reset" component={Reset} options={{headerShown: false}} />
       
    </Stack.Navigator>
  )
}
