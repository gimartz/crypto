import React from 'react';
import {View, StyleSheet,Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    backgroundColor: '#d9e0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const ScreenTopNav = ({navigation, showEllipse, title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
      }}>
      
         <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios" color='white'
                  size={20}
                   onPress={navigation.goBack}
                />
              </View>
              
            
            </View>
      {title ? <Text style={{fontSize: 18,marginLeft:-20,fontWeight:'bold'}}>{title}</Text> : <Text></Text>}
               
      {showEllipse ? <AntDesign name={'ellipsis1'} size={30} /> : <Text></Text>} 
    </View>
  );
}

export default ScreenTopNav;