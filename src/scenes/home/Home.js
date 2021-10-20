import React, {useCallback, useEffect, useState } from 'react'
import { Text, View, ScrollView, StatusBar, useColorScheme , StyleSheet,Dimensions,TextInput,
  Image,TouchableOpacity,
  Pressable,SafeAreaView,ImageBackground,
  Animated,  } from 'react-native'
  import axios from 'axios';
import styles from './styles'
import { Svg } from 'react-native-svg'
import { firebase } from '../../firebase/config'
import { useTheme } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'expo-linear-gradient'
import COLORS from '../../../screens/constants/colors';
import { Progress } from 'react-sweet-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from '../../../screens/Carousel'
import { dummyData } from '../../../screens/ummy'
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;
import { useNavigation } from '@react-navigation/native';
import getImgSource from '../../../utils/getImgSource.js';

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
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
 
   TcardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
   Tcard: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  TcardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },TcardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  }, TpriceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

});





export default function Home(props) {

  const navigation = useNavigation();
  const userData = props.extraData
  const [token, setToken] = useState([]);
   const [search, setSearch] = useState([]);
  const scheme = useColorScheme()
 const categoryList = ['Popular', 'Recommended', 'Recent '];
   const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    firebase.firestore()
  .collection('Author')
  
  .get()
  .then(querySnapshot => {
    console.log('User exists: ',  querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
    firebase.firestore()
      .collection('courses')
             .get()
             .then((snapshot) => {
      let myData = [];
        snapshot.forEach((doc) => {
        const data = doc.data()
              myData.push({
            id: doc.id,
            name:  data.name,
            number: data.courseFee,img: data.img,
            detail: data.coursedesc,no:data.stu
          });  }); 
            setToken([...token, ...myData])
         // alert(JSON.stringify(token))
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  }) }, []);
const searchBooks = (text) => {
    if (text === '') {
      showMessage({
        message: 'Search query cannot be empty',
      });
      return;
    }

    props.navigation.navigate('add', {
      search: text,
    });
  };
   const TCard = ({hotel,index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
   
const onItemPress = useCallback(() => {
    navigation.navigate('DetailsScreen', {
     hotel: hotel,
  user: userData
    });
  }, [hotel]);
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
              onPress={() => props.navigation.navigate('DetailsScreen',{type: hotel,user:userData})}>

        <Animated.View style={{...style.Tcard, transform: [{scale}]}}>
          <Animated.View style={{...style.TcardOverLay, opacity}} />
          <View style={style.TpriceTag}>
            <Text
              style={{color: COLORS.primary, fontSize: 18, fontWeight: 'bold'}}>
              ₦{hotel.number}
            </Text>
          </View>
          <Image source={getImgSource(hotel.img)} style={style.TcardImage} />
          <View style={style.TcardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight:10}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  {hotel.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 12}}>
                1
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color='#bead83' />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{fontSize: 10, color: COLORS.grey}}>365reviews</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
 
  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={{}}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }  hidden />
        <View style={style.header}>
        <View>
          <Text style={{color: COLORS.white}}> </Text>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
          Hi, {userData.fullName} 👋
          </Text>
        </View>
        <TouchableOpacity
                       onPress={navigation.openDrawer}>
        <Image
          style={style.profileImage}
          source={getImgSource('https://i.ibb.co/cNr8HyG/97165e191052892894cb886b4a8c0971.gif')}
        /></TouchableOpacity>
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
              <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
          <TouchableOpacity>
             <TextInput placeholder="Search" onChangeText={(text) => setSearch(text)}
            value={search} />
           
            </TouchableOpacity>
          </View>

          <View style={style.sortBtn}>
            <Icon name="search" color={COLORS.white}  onPress={searchBooks} size={25} />
          </View>
        </View>
  <View style={{marginTop:20}}>
            <Carousel data = {dummyData}/>
        </View>
        {/* Render list options */}
        

               <View style={{
                   flexDirection:"row",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
               }}>
                   <View style={{width:"100%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>Recommended  Courses</Text>
                        <View style={{
                            height:4,
                            backgroundColor:"#dcd3bc",
                            width:115,
                            marginTop:-5
                        }}>

                        </View>

                   </View>
            
               </View>
  <View style={{marginBottom:150}}>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={token}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <TCard hotel={item}  index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        {/* Render categories */}
      </ScrollView>  
      </View> 
  )
}

