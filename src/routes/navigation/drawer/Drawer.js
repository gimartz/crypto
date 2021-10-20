import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import TabNavigator from '../tabs';
import Cources from '../../../../screens/Cources';
import { Text, View, ScrollView, StatusBar, useColorScheme , StyleSheet,Dimensions,TextInput,
  Image,TouchableOpacity,
  Pressable,SafeAreaView,ImageBackground,
  Animated,  } from 'react-native'
  import DetailsScreen from '../../../../screens/DetailsScreen';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Switch,
  TouchableRipple,
  
} from 'react-native-paper';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import{ AuthContext } from '../../../../components/context';
import HomeScree from '../../../../screens/HomeScree';
//import Switch from 'react-native-dark-mode-switch';
import { useNavigation } from '@react-navigation/native'
import Pay from '../../../../screens/pay'
import { HomeNavigator, PayNavigator } from '../stacks'
import Details from '../../../../screens/list';
import {
  
    DrawerItem
} from '@react-navigation/drawer';import Cart from '../../../../screen/cart/Cart';
import Notifications from '../../../../screen/notifications/Notifications';
import Xd from '../../../../screens/Xd'
import Homee from "../../../../screens/Home";
import Settings from '../../../../screen/settings/Settings'
import VideoPage  from '../../../../screens/VideoPage';
const Drawer = createDrawerNavigator()

function DrawerContent(props) {
 const paperTheme = useTheme();
  
  const userData = props.extraData
    const  toggleTheme = React.useContext(AuthContext);

  //  const navigation = useNavigation()

 
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent}
      >
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>{userData.fullName}</Title>
         
          <View style={styles.row}>
         
          </View>
        </View>
       
          <DrawerItem
           inactiveTintColor="white"
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
             onPress={() => {props.navigation.navigate('Home')}}
          />
          <DrawerItem
            inactiveTintColor="white"
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="television-play" color={color} size={size} />
            )}
            label="Videos"
            onPress={() => {props.navigation.navigate('RestaurantDetail')}}
          /> 
             <DrawerItem
              inactiveTintColor="white"
            icon={({ color, size }) => (
              <MaterialIcons name="notifications-none" color={color} size={size} />
            )}
            label="Notifications"
            onPress={() =>{props.navigation.navigate('Welcome')}}
          />
             <DrawerItem
              inactiveTintColor="white"
            icon={({ color, size }) => (
              <MaterialIcons name="my-library-books" color={color} size={size} />
            )}
            label="Courses"
             onPress={() => {props.navigation.navigate('move')}}
          />

          <DrawerItem
           inactiveTintColor="white"
            icon={({ color, size }) => (
              <MaterialIcons
                name="settings"
                color={color}
                size={size}
              />
            )}
            label="Settings"
             onPress={() =>{props.navigation.navigate('Profile')}}
          />
                           <TouchableRipple onPress={() => {toggleTheme}}>

                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch  value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
     
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator= (props) => {
   const user = props.user
    const paperTheme = useTheme();
  const navigationProps = props.navigationProps
  const  toggleTheme = React.useContext(AuthContext);
   return (
  <Drawer.Navigator initialRouteName="Home"  drawerContent={props => <DrawerContent {...props} extraData={user}/>}
   screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 350,
          backgroundColor: '#b71525',
        },
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
      
        drawerItemStyle: {backgroundColor: null},
        sceneContainerStyle: {
          backgroundColor: '#b71525',
        },
      }}
   >
    <Drawer.Screen name="Home"  options={{headerShown: false}} >
      {props => <TabNavigator user={user} navigationProps={navigationProps} />}
    </Drawer.Screen>
  
    <Drawer.Screen name="MyCourses" component={HomeScree}  options={{headerShown: false}} />
         <Drawer.Screen
        name="DetailsScreen" component={DetailsScreen}
          options={{headerShown: false}}
       />  
          <Drawer.Screen
        name="Details" component={Details}
          options={{headerShown: false}}
       /> 
           <Drawer.Screen
          name="Welcome"
          component={Notifications}
      
          options={{headerShown: false}}
        /> 
            <Drawer.Screen
          name="move"
          component={Xd}
      
          options={{headerShown: false}}
        /> 
         <Drawer.Screen
          name="watch"
          component={VideoPage}
      
          options={{headerShown: false}}
        /> 


         <Drawer.Screen
          name="set"
          component={Settings}
      
          options={{headerShown: false}}
        />
            <Drawer.Screen
          name="Cources"
          component={Cources}
      
          options={{headerShown: false}}
        />
           
  </Drawer.Navigator>

)}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,backgroundColor:'#b71525'
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',color:'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
export default DrawerNavigator
