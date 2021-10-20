/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {useEffect, Component, Fragment} from 'react';
import { useRef , useState }from 'react';
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,Text,
} from 'react-native';
import remove from 'lodash/remove';
import {MaterialCommunityIcons} from '@expo/vector-icons';
// import components
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import EmptyState from '../../components/emptystate/EmptyState';
import {Heading6, SmallText} from '../../components/text/CustomText';
import { firebase } from '../../src/firebase/config'
// import colors
import Colors from '../../theme/colors';

//import sample data
import sample_data from '../../config/sample-data';

// Favorites Config
const isRTL = I18nManager.isRTL;
const EMPTY_STATE_ICON = 'star-outline';

// Favorites Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryColor,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    color: Colors.primaryText,
  },
  message: {
    paddingHorizontal: 48,
    paddingBottom: 32,
    fontSize: 14,
    textAlign: 'center',
  },
    paragraph: {
    // fontWeight: '400',
    
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
    color: 'black',
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    fontWeight: '700',
    textAlign: 'left',
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
  },
  bottomTextInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f1f1f1',
  },
});

// Favorites


 
export default function Favorites () {


 const [token, setToken] = useState([]);
  
    useEffect(() => {
  firebase.firestore()
  .collection("Coursefav")
  .get()
 .then((snapshot) => {
      let myData = [];
        snapshot.docs.forEach(doc => {
        const data = {...doc.data()}
           //alert(JSON.stringify(data))
            
              myData.push({
            id: doc.id,
            name:  data.lessonName,
            number: data.course,img: data.lessonvid,
            detail: data.lessonetail,no:data.LessonTime
          }); 
            
myData=        myData.filter((item) => item.number = `${house.id}` ).map(({id, name, detail,img,no}) => ({id, name,detail,img,no}));  }); 
setToken([...token, ...myData])
      }).catch((error) => {
          console.log("Error getting document:", error);
    alert(JSON.stringify(error))
  })

 
  }, []);

  
  const navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  const swipeoutOnPressRemove = item => () => {
    let {products} = this.state;
    const index = products.indexOf(item);

    products = remove(products, n => products.indexOf(n) !== index);

    this.setState({
      products,
    });
  };

  const onPressRemove = item => () => {
    let {quantity} = item;
    quantity -= 1;

    const {products} = this.state;
    const index = products.indexOf(item);

    if (quantity < 0) {
      return;
    }
    products[index].quantity = quantity;

    this.setState({
      products: [...products],
    });
  };

  const onPressAdd = item => () => {
    const {quantity} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

    this.setState({
      products: [...products],
    });
  };

 const keyExtractor = item => item.id.toString();

  const renderProductItem = ({item}) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={this.navigateTo('Product')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      imageUri={item.imageUri}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      swipeoutDisabled={false}
      swipeoutOnPressRemove={this.swipeoutOnPressRemove(item)}
      cartButton={true}
    />
  );

  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Favorites</Heading6>
        </View>

         {token.length === 0 ? 
          
           (
        
           <View style={{ }}>
    
       

    <Text style={{ color:'#bead83',fontWeight:'900', textTransform: 'uppercase',fontSize:20,marginLeft:10,marginBottom:30}}>Your Favorites List is Empty</Text>
<Text  style={{ color:'#bead83',fontWeight:'300',fontSize:20,marginLeft:30,
          marginTop:20}}>
    Save your favorite courses so you can always find it here and make order easier</Text>
  </View>
       
        ): (
          <Fragment>
            <FlatList
              data={token}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProductItem}
              contentContainerStyle={styles.productList}
            />

            <View style={styles.bottomTextInfo}>
              <View style={styles.info}>
                <SmallText>
                  {`Swipe ${isRTL ? 'right' : 'left'} to remove items`}
                </SmallText>
              </View>
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    );
  }

