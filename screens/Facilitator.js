import React from 'react';
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

import {Feather} from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';

//Sample Data
import {data, profile, popular} from '' 

import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('screen');
import houses from '../consts/houses';
import { Progress } from 'react-sweet-progress';

const Profiler = ({navigation}) => {
 const {width,height} = Dimensions.get('window')
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
      <View style={style.header}>
        <View>
          <Text style={{color: COLORS.grey}}>Hi, Chinny</Text>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
           My  Facilitators
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require('../assetss/person.jpg')}
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
     
        </View>

        {/* Render list options */}
        
    <View style={{marginLeft:-20,marginTop:20}}>
    <FlatList 
      showsHorizontalScrollIndicator={false}
      horizontal

      data={data} numRows={2}
      keyExtractor={item => item.id}
      style={{paddingHorizontal: 30}}
      renderItem={({item}) => {
        return(
          <View>
          <View>
          <TouchableScale 
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          onPress={() => navigation.navigate('ProfScreen', {data: item})}
          >

          <SharedElement id={`item.${item.id}.photo`}>
              <Image
              source={{uri: item.image}} 
              style={{width: width - 90, height: height - 450, borderRadius: 14, marginRight: 30}}
              resizeMode="cover"
              />
            </SharedElement>
            



            <SharedElement id={`item.${item.id}.text`} style={{width:width - 90, position: 'absolute', bottom: 90, left: 10, paddingHorizontal: 10}}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', lineHeight: 28}}>{item.title}</Text>
            </SharedElement>




            <View style={{flexDirection: 'row', alignItems: 'center',position: 'absolute', bottom: 20, left: 20,}}>  

              <SharedElement id={`item.${item.id}.profilePic`}>
                <Image
                source={{uri: item.profilePic}} 
                style={{width: 50, height: 50, borderRadius: 10, marginRight: 14}}
                resizeMode="cover"
                />
              </SharedElement>

              <View>
                <SharedElement id={`item.${item.id}.username`}>
                  <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{item.username}</Text>
                </SharedElement>
                <SharedElement id={`item.${item.id}.readtime`}>
                  <Text style={{color: 'white', fontSize: 14,}}>{item.readtime} read</Text>
                </SharedElement>
              </View>

            </View>

          </TouchableScale>
          </View>
    
          </View>
        )
      }}
      />
    </View>

    {/* SHARED BLOGS END */}
      

      {/* POPULAR STARRT */}
     
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 30}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Popular</Text>
        <Text style={{fontWeight: 'bold', color: 'orange'}}>Show All</Text>
      </View>

      <FlatList 
      data={popular}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return(
          <View style={{flexDirection: 'row', paddingBottom: 30,paddingLeft: 30, alignItems: 'center'}}>

            <View style={{marginRight: 30}}>
              <Image source={{uri: item.image}} style={{width: 100,height: 100, borderRadius: 10}} />
            </View>

            <View style={{width: '60%'}}>

              <Text style={{color: 'orange', fontWeight: 'bold',marginBottom: 4 }}>{item.topic}</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold',marginBottom: 10}}>{item.title}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center', opacity: 0.4}}>

                <View style={{flexDirection: 'row', marginRight: 16, alignItems: 'center'}}>
                  <Feather name='book-open' size={14} color='#000' />
                  <Text style={{marginHorizontal: 4, fontSize: 12}}>{item.readtime} Read</Text>
                </View>

                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                  <Feather name='thumbs-up' size={14} color='#000' />
                  <Text style={{marginHorizontal: 4, fontSize: 12}}>{item.likes} Likes</Text>
                </View>

              </View>
          
            </View>

          </View>
        )
      }}
      />
      </ScrollView>
    </SafeAreaView>
    );
}


        {/* Render categories */}
      
        {/* Render Card */}
      
     
  

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
});
export default Profiler;
