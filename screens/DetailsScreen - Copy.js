import React ,{ useEffect,useRef , useState }from 'react';
import PaystackWebView from 'react-native-paystack-popup';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,TouchableOpacity,
  StyleSheet,
  FlatList,
  Image, StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { firebase } from '../src/firebase/config'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {Modalize} from 'react-native-modalize'
import CourseList from '../screens/CourseList'
import getImgSource from '../utils/getImgSource.js';
 import {BottomModal, Button, Alert} from '../src/scenes/profile/Modules'
 const {width} = Dimensions.get('screen');
const DetailsScreen = ({navigation, route}) => {
   
  const [cardModal, setCardModal] = useState(false);
   const [showPayment, setShowPayment] = React.useState(false);
    const ref = useRef(null);
   const modalDismiss = () => {
    setCardModal(false);
  };
     const [token, setToken] = useState([]);
  const house = route.params;
  useEffect(() => {
    firebase.firestore()
      .collection('lesson')
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
          myData.forEach(obj => {
        Object.entries(obj).forEach(([number, id]) => {
            alert(JSON.stringify(`${number} ${id}`));
        });})
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  }) }, []);
  const InteriorCard = ({interior}) => {
    return <Image source={interior} style={style.interiorImage} />;
  };
 const CourseContentList = ({content, index}) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#E4E7F4'}}>
          {'0' + (index + 1)}
        </Text>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <Text
            style={{
              fontSize: 15,
              color: '#A0A5BD',
              fontWeight: '500',
              marginBottom: 5,
            }}>
            {content.time}
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {content.title}
          </Text>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#49CC96',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="play-arrow" style={{fontSize: 25, color: '#fff'}} />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <StatusBar hiddrn hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
      
          <ImageBackground style={style.backgroundImage}  source={getImgSource(house.img)}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} />
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          <View style={style.virtualTag}  onPress={navigation.navigate('Course')}>
            <Text style={{color: COLORS.white}}>Review </Text>
          </View>
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {house.name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}> ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
            {house.location}
          </Text>

          {/* Facilities container */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={style.facility}>
           <MaterialCommunityIcons color='red' name="clock" size={18} />
                <Text style={style.facilityText}>5hrs</Text>
            </View>
            <View style={style.facility}>
             
             <MaterialCommunityIcons color='red' name="account-group" size={18} />
                    <Text style={style.facilityText}>{house.no} Students </Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>Certificate Included</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {house.detail}
          </Text>

          {/* Interior list */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={token.courseContent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <CourseContentList index={index} content={item} />
          )}
        />
          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text
                style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>
             ₦{house.number}
              </Text>
              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
                Total Price
              </Text>
            </View>
             {!showPayment && 
            <TouchableOpacity
         onPress={()=>{
        setShowPayment(true)}}>
            <View style={style.bookNowBtn} >
              <Text style={{color: COLORS.white}}>Enroll Now</Text>
            </View></TouchableOpacity>}
          </View>
          <BottomModal dismiss={modalDismiss} isVisible={cardModal}>
        <View style={styles.modalContent}>
          {showPayment && <PaystackWebView
 
        ref={ref} 
        
        onError={() => {
 
          setShowPayment(false);
 
          alert("Failed...")
 
        }}
 
        metadata={{ custom_fields: [{ display_name: " Checkout" }] }}
 
        onDismissed={() => {
 
          ref.current.reload(); //reload if dismissed.
 
        }}
 
        onSuccess={(response) => { 
        
          setShowPayment(false);
        
          alert(`Transaction successful: ${response.reference}`) 
        
        }}
        
        paystackKey={"pk_live_3d25244b1da570843fd316853513e8d59a5f59cb"} customerEmail={'userData.email'}
        amount={house.number} />}
 
           </View>
      </BottomModal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});
const styles = StyleSheet.create({
 

  modalContent: {
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 12,
  },
});
export default DetailsScreen;
