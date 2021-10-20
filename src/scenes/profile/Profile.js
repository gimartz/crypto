import React, { useEffect, useState } from 'react'
import { StyleSheet,Text, View, Image,TouchableOpacity, StatusBar, TextInput,ScrollView,Pressable, useColorScheme } from 'react-native'
import styles from './styles'
import { firebase } from '../../firebase/config'
import { Restart } from 'fiction-expo-restart'
import { Avatar } from 'react-native-elements'
import Dialog from "react-native-dialog"
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, Button, BottomModal} from './Modules';
import ScreenTopNav from './screen';
import SvgEdit from './icons/Svg.Edit';
import SvgPlus from './icons/Svg.Plus';
import { colors,  fonts,gStyle, images } from './constants';
import TouchLineItem from './TouchLineItem';
import SvgBell from './icons/Svg.Bell';
import SvgCheck from './icons/Svg.Check';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#d9e0f0',
    width: '100%'
  },
  containerAccounts: {
    alignItems: 'center',
    backgroundColor: '#d9e0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop:  40,
    width: '100%'
  },
  containerUser: {
    alignItems: 'center',
    marginHorizontal: 10,borderRadius:20,
  },
  avatar: {
    height: 64,
    marginBottom: 6,
    resizeMode: 'contain',
    width: 64
  },
  username: {
    color: colors.inactiveGrey,
    fontSize: 12,
    fontFamily: fonts.medium
  },
  usernameActive: {
    color: colors.white,
    fontFamily: fonts.bold
  },
  containerPlus: {
    alignItems: 'center',
    backgroundColor: colors.moreAddProfileBg,
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginBottom: 4,
    width: 64
  },
  containerManage: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 24
  },
  manageText: {
    color: colors.inactiveGrey,
    fontFamily: fonts.medium,
    marginLeft: 4
  }
});


const Option = ({onPress, text, type,icon}) => {
  return (
    <Pressable style={styles.optionContainer} onPress={onPress}> 
    <View style={styles.headerBtn}>
      <Icon name={icon} color="#d9e0f0" size={20} /></View>
      <View style={styles.opts}>
      <Text style={styles.option}>{text}</Text>
      <Text style={styles.options}>{type}</Text></View>
      <Icon name="chevron-forward-outline" color="#eef1fb" size={27} />
    </Pressable>
  );
};
export default function Profile(props) {
  const navigation = useNavigation();
  const userData = props.extraData
  const scheme = useColorScheme()
  const [choosenValue, setChoosenValue] = useState(2);
  const [visible, setVisible] = useState(false)
  const [spinner, setSpinner] = useState(false)
const [deleteModal, setDeleteModal] = useState(false);
  const [monetizationModal, setMonetizationModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [infoAlert, setInfoAlert] = useState(false);
  const goDetail = () => {
    props.navigation.navigate('Detail', { userData: userData })
  }
  const LoDetail = () => {
    props.navigation.navigate('locate', { userData: userData })
  }

  const signOut = () => {
    firebase.auth().signOut()
    Restart()
  }

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const accountDelete = async () => {
    setSpinner(true)
    const collectionRef = firebase.firestore()
    await collectionRef.collection('tokens').doc(userData.id).delete()
    await collectionRef.collection('users').doc(userData.id).delete()
    const user = firebase.auth().currentUser
    user.delete().then(function() {
      setSpinner(false)
      firebase.auth().signOut()
    }).catch(function(error) {
      setSpinner(false)
      console.log(error)
    });
  }
  const HeaderAccounts = ({ navigation }) => (
  <View style={style.container}>
    <View style={style.containerAccounts}>
      <View style={style.containerUser}>
        <Image source={{ uri: userData.avatar }}style={style.avatar} />
        <Text style={[style.username, style.usernameActive]}>{userData.fullName}</Text>
      </View>
    </View>

    <TouchableOpacity
      activeOpacity={0.7}
   onPress={goDetail}
      style={style.containerManage}
    >
      <SvgEdit active={false} size={18} />
      <Text style={style.manageText}>Edit Profile</Text>
    </TouchableOpacity>
  </View>
);

  
  return (
   
    <View style={{
    flex: 1,backgroundColor: 'white',}}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ flex: 1, width: '100%' }}>
      <ScreenTopNav
              navigation={navigation}
              showEllipse={false}
              title="Settings"
            />
        <View style={styles.main}>
     <HeaderAccounts/>
          </View> 
             <Card style={styles.card}>
         <Option
          text="Email" type={userData.email}
          icon="mail-unread"
          
        />
   <Option
          text="Password" type='change password'
          icon="person-sharp"
          onPress={() => props.navigation.navigate('reset')}
        />
          <Option
          text="Location" type='change location'
          icon="location"
          onPress={LoDetail}
        />
      </Card>
      
      
      
       
          <Card style={styles.card}>
         <Option
          text="Earning" type='link wallet'
          icon="wallet-outline"
          onPress={() => props.navigation.navigate('Earnings')}
        />
   <Option
          text="Purchases"
          icon="cart-outline"
          onPress={() => props.navigation.navigate('OrderCompleted')}
        />
     
      
       <Option
          text="Sign out"
          icon="log-in-outline"
         onPress={signOut}
        />
   </Card>
      </ScrollView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={accountDelete}  />
      </Dialog.Container>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    
    </View>
  
  )
}