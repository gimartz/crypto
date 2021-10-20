import React,{ useEffect,useRef , useState } from 'react'
import {View,StyleSheet,Image,StatusBar,Dimensions, Text} from 'react-native'
import { Video } from 'expo-av'
import Chapters from '../screens/Chapters'
import getImgSource from '../utils/getImgSource.js';
import { firebase } from '../src/firebase/config'
const {width, height} = Dimensions.get("window");
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function VideoPage ({route,navigation}){
   const house = route.params 


    
        return(
      
           <View style={style.container}>
               <StatusBar backgroundColor="#f58084"/>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red}  />
              </View>
            </View>
          <Video
                source={{uri:house.img}}
                rate={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                useNativeControls
                style={style.video}
               /> 
        
         
      
               <Chapters
                    color="#fde6e6"
                    percent={0}
                    duration={house.no}
                    title={house.name}
                    num={1}
               />
    
               <Text style={{
                   fontFamily:"Medium",
                   textAlign:"justify",
                   color:"#345c74",
                   paddingLeft:42,
                   paddingRight:35
               }}>
                   {house.detail}
               </Text> 
  
               <View style={{
                   flexDirection:"row",
                   paddingVertical:5,
                   backgroundColor:"#f58084",
                   marginHorizontal:40,
                  
                   alignItems:"center",
                   borderRadius:10,
                   justifyContent:"center",
                   marginTop:20
               }}>
                   <Text style={{
                       color:"#FFF",
                       fontFamily:"Bold",
                       fontSize:15,
                       marginRight:50
                   }}>
                       Read more
                   </Text>
                   <Image source={require('../images/imag/a3.png')}/>
               </View>
           </View>
           
      
        )
    }

const style = StyleSheet.create({
    header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
    video:{
        width:width,
        height:height/3
    },
    container:{
        backgroundColor:"#fff",
        justifyContent:"center",height:height
    }
})