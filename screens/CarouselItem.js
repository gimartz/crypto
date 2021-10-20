import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window')
import {Button }from 'react-native-paper'

const CarouselItem = ({ item }) => {
  const navigation = useNavigation();
    return (
        <View style={{  flex: 1,
        width: width - 30,
        height: height / 4,
        backgroundColor: item.color,
        margin: 10,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,}}>
            <Image style={styles.image} source={{ uri: item.url }} />
             
            <View style={styles.textView}>
              <Text style={styles.itemDescription}>{item.cat}</Text>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Button style={{width:'40%',height:30,backgroundColor:'white',}} labelStyle={{color:'black'}} contentStyle={{borderRadius:15,}}uppercase={false} mode="contained" onPress={() =>  navigation.navigate('Cources')}>
 Enroll now
  </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
 

    textView: {
        
        bottom: 10,
        margin: 10,marginTop:-130,
        left: 5,
    },
    image: {
        width: width/1.4,
        height: height / 4,
        borderRadius: 30,marginLeft:100
    },
  
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem