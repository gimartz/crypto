import React ,{ useEffect,useRef , useState }from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";
import { firebase } from '../src/firebase/config'


export default function RestaurantDetail({ route, navigation }) {
  const [token, setToken] = useState(['']);
  useEffect(() => {
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
 }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  })

 
  }, []);

  return (
    <View>
      <ViewCart navigation={navigation} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems foods={token} />
      
    </View>
  );
}
