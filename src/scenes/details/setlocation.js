import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar,Pressable,
  ScrollView,Picker,  Image,
 TouchableOpacity, StyleSheet,useColorScheme } from 'react-native'
import styles from './styles';
import ScreenTopNav from '../profile/screen';
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import Constants from 'expo-constants'
import { Button,TextInput } from 'react-native-paper';




export default function Location({ route, navigation }) {
  const [fullName, setFullName] = useState('')
  const [progress, setProgress] = useState('')
  const [avatar, setAvatar] = useState('')
  const customStyle = fullName ? styles.customText : {colors:'white'};
  const [choosenLabel, setChoosenLabel] = useState('Native');
  const [choosenIndex, setChoosenIndex] = useState('2');
  let [userPass, setUserPass] = useState('');
   const userData =route.params.userData
  //
  
  const scheme = useColorScheme()
 useEffect(() => {
    setAvatar(userData.avatar)
    setFullName(userData.fullName)
  },[])
 const ImageChoiceAndUpload = async () => {
    try {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert("Permission is required for use.");
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          const actions = [];
          actions.push({ resize: { width: 300 } });
          const manipulatorResult = await ImageManipulator.manipulateAsync(
            result.uri,
            actions,
            {
              compress: 0.4,
            },
          );
          const localUri = await fetch(manipulatorResult.uri);
          const localBlob = await localUri.blob();
          const filename = userData.id + new Date().getTime()
          const storageRef = firebase.storage().ref().child(`avatar/${userData.id}/` + filename);
          const putTask = storageRef.put(localBlob);
          putTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(parseInt(progress) + '%')
          }, (error) => {
            console.log(error);
            alert("Upload failed.");
          }, () => {
            putTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              setProgress('')
              setAvatar(downloadURL)
            })
          })
        }
    } catch (e) {
        console.log('error',e.message);
        alert("The size may be too much.");
    }
  }
   const profileUpdate = () => {
    const data = {
      id: userData.id,
      email: userData.email,
      fullName: fullName,
      avatar: avatar,
      location:choosenLabel,
    }
  
    const userRef = firebase.firestore().collection('users').doc(userData.id)
    userRef.update(data)
    navigation.goBack()
  }
 
  return (
         
   
    <View style={{flex: 1,backgroundColor:'#f2f2f2'}}>
    
        <View style={{alignContent:'center',marginLeft:100}}>
            <Avatar
              size="xlarge"
              rounded
              title="CM"
              onPress={ImageChoiceAndUpload}
              source={{ uri: "https://i.ibb.co/cNr8HyG/97165e191052892894cb886b4a8c0971.gif" }}
            >
                <Avatar.Accessory size={23} />
              </Avatar></View><View style={{marginTop:100}}>
                 <TextInput
                 theme={{ colors: { primary: "black" ,backgroundColor:'white',marginTop:20} }}
          style={{width:320,marginLeft:10,borderRadius:20}}
        selectionColor='white'
        mode='outlined' label='Full Name'
   onChangeText={(text) => setFullName(text)}
          value={fullName}
        
        />
        <Text   style={{ color:'black',fontWeight:'300',fontSize:20,marginLeft:15,
          marginTop:20}}>Location:</Text>
        <Picker
          selectedValue={choosenLabel} style={{Color:'red',marginLeft:10,marginTop:20}}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}>
        
          <Picker.Item label="Abia" value="Abia" />
          <Picker.Item label="Adamawa" value="Adamawa" />
          <Picker.Item label="Akwa Ibom" value="Akwa Ibom" />
          <Picker.Item label="Anambra" value="Anambra" />
          <Picker.Item label="Bauchi" value="Bauchi" />
          <Picker.Item label="Bayelsa" value="Bayelsa" />
          <Picker.Item label="Benue" value="Benue" />
          <Picker.Item label="Borno" value="Borno" />
          <Picker.Item label="Cross River" value="Cross River" />
          <Picker.Item label="Delta" value="Delta" />
          <Picker.Item label="Ebonyi" value="Ebonyi" />
            <Picker.Item label="Edo" value="Edo" />
          <Picker.Item label="Ekiti" value="Ekiti" />
          <Picker.Item label="Enugu" value="Enugu" />
          <Picker.Item label="FCT - Abuja" value="FCT - Abuja" />
          <Picker.Item label="Gombe" value="Gombe" />
            <Picker.Item label="Imo" value="Imo" />
          <Picker.Item label="Jigawa" value="Jigawa" />
          <Picker.Item label="Kano" value="Kano" />
          <Picker.Item label="Katsina" value="Katsina" />
          <Picker.Item label="Kebbi" value="Kebbi" />
            <Picker.Item label="Kogi" value="Kogi" />
          <Picker.Item label="Kwara" value="Kwara" />
          <Picker.Item label="Lagos" value="Lagos" />
          <Picker.Item label="Nasarawa" value="Nasarawa" />
          <Picker.Item label="Niger" value="Niger" />
            <Picker.Item label="Ogun" value="Ogun" />
          <Picker.Item label="Ondo" value="Ondo" />
          <Picker.Item label="Oyo" value="Oyo" />
          <Picker.Item label="Plateau" value="Plateau" />
          <Picker.Item label="Rivers" value="Rivers" />
        </Picker>
        {/*Text to show selected picker value*/}
        <Button style={{width:320,marginLeft:20,marginTop:20}} mode="contained" 
         theme={{ colors: { primary: "black" ,backgroundColor:'white',marginTop:20} }}
        onPress={() => console.log('Pressed')}>
    Update Profile
  </Button>
        </View>
     
    </View>
  )
}