import React ,{ useEffect,useRef , useState }from 'react';

import {
  ImageBackground,
  SafeAreaView,Pressable,
  View,
  Text,TouchableOpacity,
  StyleSheet,
  FlatList,
  Image, StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { firebase } from '../src/firebase/config'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {Modalize} from 'react-native-modalize'
import CourseList from '../screens/CourseList'
import getImgSource from '../utils/getImgSource.js';
 import {BottomModal, Button, Alert} from '../src/scenes/profile/Modules'
 import axios from 'axios';

 const {width} = Dimensions.get('screen');
const DetailsScreen = ({props,route,navigation}) => {
  const [token, setToken] = useState([]);
  const house = route.params.type;
  const user = route.params.user
  let id = house.id
alert
   const profileUpdate = () => {
    const data = {
      user: user,
      course: house.name,
      img: house.img,
    price:house.number,
    }
    const userRef = firebase.firestore().collection('coursefav')
    userRef.add(data).then((res) => {
    
  }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  })
  }
   useEffect(() => {
  firebase.firestore()
  .collection("Lessons").where('course','==',house.id)
  .get()
 .then((snapshot) => {
      let myData = [];
       let myDat=[]
        snapshot.docs.forEach(doc => {
        const data = {...doc.data()}
           
          
              myData.push({
            id: doc.id,
            name:  data.lessonName,
            number: data.course,img: data.lessonvid,
            detail: data.lessonetail,no:data.LessonTime
          });  
          
                   

          }); 
 //myData.filter((item) => item.number == house.id).map(({id, name, detail,img,no}) => ({id, name,detail,img,no}));
              setToken([...myData])

   // alert(JSON.stringify(myData)) 
     
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  })

 
  }, [house]);

    
 const Option = ({onPress, text}) => {
  return (
    <TouchableOpacity style={{height: 50}}
       onPress={onPress} >
  <View style={style.virtualTag}  >
            <Text style={{color: COLORS.white}}>{text}</Text>
          </View></TouchableOpacity>
  );
};
 const CourseContentList = ({content, index}) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#E4E7F4'}}>
          {'0' + (index + 1)}
        </Text>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <Text
            style={{
              fontSize: 15,
              color: '#A0A5BD',
              fontWeight: '500',
              marginBottom: 5,
            }}>
            {content.name}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {content.no}
          </Text>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
           backgroundColor: 'black',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="play-arrow" style={{fontSize: 25, color:'white'}} onPress={() =>navigation.navigate('watch',content)} />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <StatusBar hiddrn hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
      
          <ImageBackground style={style.backgroundImage}  source={getImgSource(house.img)}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} onPress={profileUpdate} />
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}  
          <Option
          text="Enroll" 
          onPress={() => navigation.navigate('pay',house)}
        />
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {house.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}> ₦{house.number}</Text>
              </View>
      
            </View>
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
            {house.location}
          </Text>

          {/* Facilities container */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={style.facility}>
           <MaterialCommunityIcons color='black' name="clock" size={18} />
                <Text style={style.facilityText}>5hrs</Text>
            </View>
            <View style={style.facility}>
             
             <MaterialCommunityIcons color='black' name="account-group" size={18} />
                    <Text style={style.facilityText}>{house.no} Students </Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>Certificate Included</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {house.detail}
          </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={token}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <CourseContentList index={index} content={item} />
          )}
        />
   
       
          {/* footer container */}
            
         <View style={style.footer}>
          
           
              {house.number == 0?( 
         <TouchableOpacity style={{height: 50}}
       onPress={() => navigation.navigate('watch',token)} >
            <View style={style.bookNowBtn} >
             <Text style={{color: COLORS.white}}>Start Course</Text>
            </View></TouchableOpacity>):(  <TouchableOpacity style={{height: 50}}
       onPress={() => navigation.navigate('pay',{amt:house.number})} >
            <View style={style.bookNowBtn} >
             <Text style={{color: COLORS.white}}>Enroll Now</Text>
            </View></TouchableOpacity>)}
             </View>   
                      {/* Interior list */}
       
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
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
  ratingTag: {
    height: 30,
    width: 65,
    backgroundColor: '#b71525',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
    bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
const styles = StyleSheet.create({
 

  modalContent: {
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 12,
  },
});
export default DetailsScreen;
