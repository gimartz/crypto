import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
} from "react-native";
import COLORS from "./Colors";
import FONTS from "./Fonts";
import IMAGES from "./Images";
import { Ionicons } from "@expo/vector-icons";
import { getPoster, getLanguage } from "./MovieService";
import {Button ,Divider}from 'react-native-paper'
const MovieCard = ({
  title,
  poster,
  language,
  voteAverage,
  voteCount,
  size,
  heartLess,
  onPress,navigation
}) => {
  const [liked, setLiked] = useState(false);
  const [voteCountValue, setVoteCountValue] = useState(voteCount);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{ ...styles.container, width: 270 * size, height: 400 * size }}
        imageStyle={{ borderRadius: 22 }}
        source={{ uri: 'https://i.ibb.co/P41x3T5/5796445.jpg"' }}
      >
        
        {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountValue(
                liked ? voteCountValue - 1 : voteCountValue + 1
              );
            }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={25 * size}
              color={liked ? COLORS.HEART : COLORS.WHITE}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            />
          </TouchableNativeFeedback>
        ) : null}
         <View style={{marginTop:200, backgroundColor:'white',width:270,height:200,borderRadius:22}}>
        <Text
          style={{ color:'#bead83',fontWeight:'300',fontSize:20,marginLeft:30,
          marginTop:20}}
         
        >
          {title}
        </Text>
         <Divider style={{height:4,paddingLeft:20,}}/>
         

      
        </View>
         <View
          style={{
          height:32,backgroundColor:'#bead83',borderRadius:35,
            flex: 1,width:150,
           marginTop:-40,marginLeft:50,marginBottom:-30,
            justifyContent: 'center',
            alignItems: 'center', 
          }}>
          <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
            Start Lesson
          </Text>     
        </View>
      </ImageBackground>
      <View>
 
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
 
});

MovieCard.defaultProps = {
  size: 1,
  heartLess: true,
};

export default MovieCard;
