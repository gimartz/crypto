/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  State,
  FlingGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen');
import { EvilIcons } from '@expo/vector-icons';
// https://www.creative-flyers.com/templates/hip-hop-flyer-psd/
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Rating from './rating';
import ScreenTopNav from '../src/scenes/profile/screen';
  const BottomNavigationBar = () => {
    return (
      <View
        style={{
          height: 80,
          bottom: 0,
          zIndex: 100,marginTop:-10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
   <View style={style.TcardDetails}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                  hotel.name
                </Text>
                <Text style={{ color:'grey',fontSize: 12 }}>
                  hotel.location
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color='white' />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={15} color='orange' />
                <Icon name="star" size={15} color='orange' />
                <Icon name="star" size={15} color='orange' />
                <Icon name="star" size={15} color='orange' />
                <Icon name="star" size={15} color='grey' />
              </View>
              <Text style={{ fontSize: 10, color: 'grey' }}>
                365reviews
              </Text>
            </View>
          </View>
      
        <View
          style={{
            height: 60,
            backgroundColor: '#fff',
            flex: 1,width:50,
            borderRadius: 10,marginTop:110,
            justifyContent: 'center',
            alignItems: 'center',overflow:'hidden'
          }}>
          <Text style={{fontSize: 15, color: '#000', fontWeight: 'bold'}}>
            Start Lesson
          </Text>
        </View>
      </View>
    );
  };

const DATA = [
  {
    title: 'Category',
    location: 'Basics o html',
    date: 'Nov 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const OVERFLOW_HEIGHT = 90;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH / 0.7;

const OverflowItems = ({ scrollX, data }) => {
  const translateY = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={{ height: OVERFLOW_HEIGHT, overflow: 'hidden' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <Animated.View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
               
                  {item.location}
                </Text>
              
              </View>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function App(navigation,route) {
   const { ata } = route.params;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState(DATA);
 const [value, setValue] = React.useState(true);

  const setAnimatedIndex = React.useCallback((i) => {
    setIndex(i);
    scrollX.setValue(i);
  }, []);

  // interconnected animations aka reactive animations :D
  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });

  // React.useEffect(() => {
  //   if (index === data.length - VISIBLE_ITEMS - 2) {
  //     console.log('fetch more')
  //     const newData = [...data, ...data];

  //     setData(newData);
  //   }
  // }, [index]);

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            // setAnimatedIndex(0)
            return;
          }
          setAnimatedIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (index === 0) {
              // setAnimatedIndex(data.length - 1)
              return;
            }
            setAnimatedIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
             <ScreenTopNav
              navigation={navigation}
              showEllipse={true}
              title=" Category"
            />
          <OverflowItems scrollX={scrollXAnimated} data={data} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            inverted
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            CellRendererComponent={({ children, index, style, ...props }) => {
              const cellStyle = [
                style,

                // I want each item to have a higher zIndex than the previous one,
                // in reversed order due to the FlatList being inverted
                { zIndex: data.length - index },
              ];

              // OverflowableView for Android...
              return (
                <View style={cellStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              return (
              
                <Animated.View
                  style={{
                    position: 'absolute',
                    width: ITEM_WIDTH,
                    top: -ITEM_HEIGHT / 2,
                    borderRadius: 10,
                   
                    transform: [{ translateX }, { scale }],
                    opacity,
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT/1.2 }}
                  />                    
                  <BottomNavigationBar />
                </Animated.View>
              );
            }}
          />
             <Switch value={value} onChange={value => setValue(value)} />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#bead83',
  },
  title: {
    fontSize: 18,   color:'white',
 textTransform: 'uppercase',
  },
  location: {
    fontSize: 26, fontWeight: '900',
      color:'white',
    letterSpacing: -1,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: 'row',marginTop:10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const style = StyleSheet.create({
 

  TcardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: ITEM_WIDTH,
  },
 
});
