import React, { useEffect, useState }  from 'react';
import { firebase } from '../src/firebase/config'
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import { Progress } from 'react-sweet-progress';
import {Button }from 'react-native-paper'
import ProgressCircle from 'react-native-progress-circle'
const Author = ({navigation,route}) => {

const   navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
   
  }
  const [token, setToken] = useState([]);
  const house = route.params;
   useEffect(() => {
  firebase.firestore()
  .collection("Lessons")
  .get()
 .then((snapshot) => {
      let myData = [];
        snapshot.docs.forEach(doc => {
        const data = {...doc.data()}
           //alert(JSON.stringify(data))
            
              myData.push({
            id: doc.id,
            name:  data.lessonName,
            number: data.course,img: data.lessonvid,
            detail: data.lessonetail,no:data.LessonTime
          });  }); 
            
myData=        myData.filter((item) => item.number == house.id).map(({id, name, detail,img,no}) => ({id, name,detail,img,no}));
setToken([...token, ...myData])
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  })

 
  }, []);
  const TopHotelCard = ({hotel}) => {
    return (
      <>
      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={hotel.img} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{hotel.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {hotel.location}
          </Text>
        </View><View onPress={() =>  navigation.navigate('Videopage', hotel)} style={{flexDirection: 'column',marginTop:-30,marginLeft:100}}>
          <ProgressCircle
                    percent={0}
                    radius={17}
                    borderWidth={1.5}
                    color="#f58084"
                    shadowColor="#FFF"
                    bgColor="#fff2f2"
               >
                           <Image
                        source={require('../images/imag/pl.png')}
                   />
               </ProgressCircle>       </View>
                               
      </View>
         
      </>

    );
  };



  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
    
      <View style={style.header}>
        <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
           Instructors
          </Text>
       
           <TouchableOpacity
                       onPress={navigation.openDrawer}>
        <Image
          style={style.profileImage}
          source={require('../assetss/person.jpg')}
        /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
 

    
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.grey}}>
            Instructors
          </Text>
          <Text style={{color: COLORS.grey}}>Show all</Text>
        </View>
        <FlatList
          data={token}
          
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,marginLeft:-20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => <TopHotelCard hotel={item} />}
        />

        {/* Render Card */}
      
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  topHotelCard: {
    height: 260,
    width: 150,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,marginBottom:10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 180,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
export default Author;
