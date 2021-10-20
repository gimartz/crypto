import React , { useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';import {Button }from 'react-native-paper'
const {width} = Dimensions.get('screen');
import houses from '../consts/houses';
import SegmentedControlTab from 'react-native-segmented-control-tab';
//Import SegmentedControlTab
import { Progress } from 'react-sweet-progress';
import hotels from './constants/hotels';
import getImgSource from '../utils/getImgSource.js';
  class HomeScree extends React.Component {
    navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
   
  }
    constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      //Default selected Tab Index for single select SegmentedControlTab
      selectedIndices: [0],
      //Default selected Tab Indexes for multi select SegmentedControlTab
      customStyleIndex: 0,
      //Default selected Tab Indexes for cusatom SegmentedControlTab
    };
  }

  handleSingleIndexSelect = (index: number) => {
    //handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index }));
  };

  handleMultipleIndexSelect = (index: number) => {
    //handle tab selection for multi Tab Selection SegmentedControlTab
    const { selectedIndices } = this.State
    if (selectedIndices.includes(index)) {
      //if included in the selected array then remove
      this.setState(prevState => ({
        ...prevState,
        selectedIndices: selectedIndices.filter(i => i !== index),
      }));
    } else {
      //if not included in the selected array then add
      this.setState(prevState => ({
        ...prevState,
        selectedIndices: [...selectedIndices, index],
      }));
    }
  };

handleCustomIndexSelect = (index: number) => {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
  };

  TopHotelCard = ({hotel}) => {
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
        <Image style={style.topHotelCardImage} source={hotel.image} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{hotel.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {hotel.location}
          </Text>
        </View><View style={{flexDirection: 'column',marginTop:-30,marginLeft:100}}>
         <Text style={{fontSize: 10, color: COLORS.grey}}> {hotel.price}</Text>
                           </View>
                                <View style={{flexDirection: 'row',marginTop:15}}>
        
                       <Button color='#b71525' icon="bookmark" mode="contained" onPress={() =>  this.navigateTo('Cources', hotel)}>
 continue 
  </Button>
               
            </View>
      </View>
         
      </>

    );
  };


  render() {
    const { selectedIndex, selectedIndices, customStyleIndex } = this.state;
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
                  onPress={this.navigateTo.goBack}
                />
              </View>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
          My Courses
          </Text>
           <TouchableOpacity
                       onPress={this.props.navigation.openDrawer}>
        <Image
          style={style.profileImage}
          source={getImgSource('https://i.ibb.co/cNr8HyG/97165e191052892894cb886b4a8c0971.gif')}
        /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Input and sort button container */}
        

           <SegmentedControlTab
          values={['ALL', 'STUDYING','SAVED']}
          selectedIndex={selectedIndex}
          tabStyle={styles.tabStyle} tabTextStyle	   = { styles.tabTextStyle }
          activeTabStyle={styles.activeTabStyle}
          tabsContainerStyle = { styles.tabContainerStyle } 
          onTabPress={this.handleSingleIndexSelect}
        />
        <FlatList
          data={hotels}
          
          showsHorizontalScrollIndicator={false} numColumns={2}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 50,marginLeft:-20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => <this.TopHotelCard hotel={item} />}
        />

        {/* Render Card */}
      
      </ScrollView>
    </SafeAreaView>
  );
}
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

const styles = StyleSheet.create({

  tabStyle: {
    borderColor: '#eef1fb',
    		borderLeftRadius:20,borderTopRightRadius:10,
		fontSize: 18,
	
  },
  activeTabStyle: {
    backgroundColor: '#0073B2',
    borderLeftRadius: 1, 
	
		shadowOpacity: 0.5, shadowRadius: 1, shadowOffset: {width: 0, height: 0}
  },
  
	tabContainerStyle: {	// the tab container
		backgroundColor: 'transparent',
		width: '100%', height: '6%',
		borderRadius: 10,
	},
 	tabTextStyle: { 	// text of the unselected tab
		color: '#818181',
		fontSize: 14
	},

});

export default HomeScree;
