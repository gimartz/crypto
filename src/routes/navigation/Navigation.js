import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { firebase } from '../../firebase/config'
import { colors } from '../../theme'
import { NavigationContainer } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import { useColorScheme } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
// import DrawerNavigator from './drawer'
import { 
 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import { AuthContext } from './context';
import {Provider as ProductProvider} from '../../../context/product/ProductContext';
import {Provider as CartProvider} from '../../../context/cart/CartContext';
import {Provider as OrdersProvider} from '../../../context/orders/OrdersContext';
import { AsyncStorage } from "react-native";
import DrawerNavigator from './drawer'
import { LoginNavigator } from './stacks'
import TabNavigator from './tabs'
import CartContext from "./cartContext";
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default class App extends React.Component {
  state = {
    cartItems: [],
    isLoadingComplete: false,
  };
  componentDidMount() {
    let val = AsyncStorage.getItem("@bdStoreItems");
    val
      .then(res => this.setState({ cartItems: JSON.parse(res) }))
      .catch(err => console.error(err));
  }
  /**
   * addItemToCart - adding item to cart
   * based on some conditions we are adding item dynamically
   */
  addItemToCart = item => {
    this.setState(state => {
      let exist = false;
      if (state.cartItems === null) {
        state.cartItems = [];
      }
      const newState = state.cartItems.map(currItem => {
        if (currItem.id === item.id) {
          exist = true;
          return {
            ...currItem,
            quantity: item.quantity,
          };
        } else {
          return currItem;
        }
      });
      if (exist) {
        try {
          AsyncStorage.setItem("@bdStoreItems", JSON.stringify(newState));
          return {
            cartItems: newState,
          };
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          AsyncStorage.setItem(
            "@bdStoreItems",
            JSON.stringify([...state.cartItems, item])
          );
        } catch (e) {
          console.error(e);
        }
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    });
    try {
      AsyncStorage.setItem(
        "@bdStoreItems",
        JSON.stringify(this.state.cartItems)
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * removeItemFromCart - removing item from cart based on it's id
   */
  removeItemFromCart = id => {
    let _cart = [...this.state.cartItems];
    let _findIndex = _cart.findIndex(item => item.id === id);
    _cart.splice(_findIndex, 1);
    this.setState({ cartItems: _cart }, () => {
      AsyncStorage.setItem(
        "@bdStoreItems",
        JSON.stringify(this.state.cartItems)
      );
    });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addItemToCart: this.addItemToCart,
          removeItemFromCart: this.removeItemFromCart,
        }}
      >
        <AppContainer />
      </CartContext.Provider>
    );
  }
}

 function AppContainer() {
     const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

   const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
const authContext = React.useMemo(() => ({ toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const scheme = useColorScheme()

  const navigationProps = {
    headerTintColor: 'white',
    headerStyle: { 
      backgroundColor: scheme === 'dark' ? colors.dark : colors.darkPurple
    },
    headerTitleStyle: { fontSize: 18 },
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .onSnapshot(function(document) {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
      } else {
        setLoading(false)
      }
    });
  }, []);

   (async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    await firebase.firestore().collection("tokens").doc(user.id).set({ token: token.data, email: user.id })
  })();

  if (loading) {
    return (
      <></>
    )
  }
 
  return(
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
     <ProductProvider>
          <CartProvider>
            <OrdersProvider>
      { user ? (
        <DrawerNavigator user={user} navigationProps={navigationProps}/>
        ) : (
        <LoginNavigator navigationProps={navigationProps}/>
      )}
            </OrdersProvider>
          </CartProvider>
        </ProductProvider>
     
    </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  )
}
