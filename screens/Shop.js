import React, { useEffect, useState }  from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import hotels from './constants/hotels';
import { Progress } from 'react-sweet-progress';
import {Button }from 'react-native-paper'
import { firebase } from '../src/firebase/config'
import getImgSource from '../utils/getImgSource.js';
import CartIcon from '../component/shop/CartIconComponent';
import {Context as CartContext} from '../context/cart/CartContext';
const Shop = ({navigation}) => {
const textPrimaryColor = 'red';
const   navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
   
  }
    const [token, setToken] = useState([]);
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
            detail: data.coursedesc
          });  });
            setToken(myData)
         // alert(JSON.stringify(myData))
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  }) }, []);
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
        <Image style={style.topHotelCardImage} source={getImgSource(hotel.img)} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{hotel.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {hotels.location}
          </Text>
        </View><View style={{flexDirection: 'column',marginTop:-30,marginLeft:100}}>
         <Text style={{fontSize: 10, color: COLORS.grey}}> ₦{hotel.number}</Text>
                           </View>
                                <View style={{flexDirection: 'row',marginTop:15}}>
        
                       <Button color='#b71525' icon="cart" mode="contained" onPress={() =>  navigation.navigate('ProfScreen', hotels)}>
 Add to Cart
  </Button>
               
            </View>
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
           Courses
          </Text>
      
        <CartIcon
              navigation={navigation}
              color={textPrimaryColor}
              style={styles.cart}
            /> 
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Learn something new" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

    
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.grey}}>
            Courses
          </Text>
          <Text style={{color: COLORS.grey}}>Show all</Text>
        </View>
        <FlatList
          data={token}
          
          showsHorizontalScrollIndicator={false} numColumns={2}
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
};
const styles = StyleSheet.create({
  cart: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
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
export default Shop;
