import React from 'react';
import { SafeAreaView,ImageBackground
  ,View,TouchableOpacity,
  StatusBar,
  Text,
  TextInput,
  FlatList,Button,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,  Animated, } from 'react-native';
import { useTheme } from '@react-navigation/native';
import hotels from './constants/hotels';import LinearGradient from 'expo-linear-gradient'
import COLORS from './constants/colors';import { Progress } from 'react-sweet-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from './Carousel'
import { dummyData } from './ummy'
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

import houses from '../../consts/houses';import {MaterialCommunityIcons} from '@expo/vector-icons';
const HomeScreen = ({navigation}) => {
 
  const categoryList = ['Popular', 'Recommended', 'Recent '];
   const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
 

   const TCard = ({hotel, index}) => {
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
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', hotel)}>
        <Animated.View style={{...style.Tcard, transform: [{scale}]}}>
          <Animated.View style={{...style.TcardOverLay, opacity}} />
          <View style={style.TpriceTag}>
            <Text
              style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
              ${hotel.price}
            </Text>
          </View>
          <Image source={hotel.image} style={style.TcardImage} />
          <View style={style.TcardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  {hotel.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 12}}>
                  {hotel.location}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
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
       
       <ImageBackground
            source={require('../../assetss/back.jpg')}
            style={[styles.fixed, styles.containter, {zIndex: -1}]}
           >
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={style.header}>
        <View>
          <Text style={{color: COLORS.white}}>Hi, Chinny</Text>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
           Explore
          </Text>
        </View>
        <TouchableOpacity
                       onPress={navigation.openDrawer}>
        <Image
          style={style.profileImage}
          source={require('../../assetss/person.jpg')}
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
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Learn something new" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>
  <View style={{marginTop:20}}>
            <Carousel data = {dummyData}/>
        </View>
        {/* Render list options */}
          <Text style={{fontSize:20,marginLeft:30,fontWeight:'bold'}} >
             Featured Courses
            </Text>
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
            data={hotels}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <TCard hotel={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        {/* Render categories */}
      </ScrollView>  
         </ImageBackground>  
    );
};



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
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
 
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
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
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});
export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
