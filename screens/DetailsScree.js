import React ,{ useEffect,useRef , useState }from 'react';
  
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,TouchableOpacity,
  StyleSheet,Animated,
  FlatList,
  Image, StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
 import axios from 'axios';import ItemSeparator from "./ItemSeparator";
 const {width} = Dimensions.get('screen');
// You can import from local files
import { firebase } from '../src/firebase/config'
import MovieCard from "./MovieCard"
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
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
                 
                />
              </View>
              
            
            </View>
      {title ? <Text style={{fontSize: 18}}>{title}</Text> : <Text></Text>}
               
      {showEllipse ? <AntDesign name={'ellipsis1'} size={30} /> : <Text></Text>} 
    </View>
  );
};
export default function App({route,navigation}) {
const [nowPlayingMovies, setNowPlayingMovies] = useState({});
const house =route.params
const [token, setToken] = useState(['']);
  useEffect(() => {
  firebase.firestore()
  .collection("Lessons")
  .get()
 .then((snapshot) => {
      let myData = [];
        snapshot.docs.forEach(doc => {
        const data = {...doc.data()}
           
          
              myData.push({
            id: doc.id,
            name:  data.lessonName,
            number: data.course,img: data.lessonvid,
            detail: data.lessonetail,no:data.LessonTime
          });  }); 
            
myData=        myData.filter((item) => item.number == '2').map(({id, name, detail,img,no}) => ({id, name,detail,img,no}));
setToken([...myData])
   //alert(JSON.stringify(myData))
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  })

 
  }, []);

  return (
    <View style={styles.container}>
    <StatusBar hidden />
        <ScreenTopNav
              navigation={navigation}
              showEllipse={false}
              title=""
               onPress={navigation.goBack}
            />
      <Text style={{ color:'#bead83',fontWeight:'900', textTransform: 'uppercase',fontSize:20,marginLeft:10,marginBottom:30}}>lessons</Text>
  

         {token.length == 0 ? 
          
           (
        
            <View style={{ }}>
    
       

    <Text style={{ color:'#bead83',fontWeight:'900', textTransform: 'uppercase',fontSize:20,marginLeft:10,marginBottom:30}}>Your Favorites List is Empty</Text>
<Text  style={{ color:'#bead83',fontWeight:'300',fontSize:20,marginLeft:30,
          marginTop:20}}>
    Save your favorite courses so you can always find it here and make order easier</Text>
  </View>
        ):(
      <FlatList
          data={token}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.name}
              language={item.name}
              voteAverage={item.name}
              voteCount={item.detail}
              poster={item.img}
              heartLess={false}
             onPress={() =>navigation.navigate('watch',item)}
            />
          )}
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#eef1fb',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
