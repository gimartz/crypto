/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  I18nManager,
  Keyboard,
  StatusBar,Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
// import colors
import { Ionicons, MaterialIcons ,MaterialCommunityIcons} from "@expo/vector-icons";
import Swiper from 'react-native-swiper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();
// import components
import Divider from '../../components/divider/Divider';
import {Heading6} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import SafeAreaView from '../../components/SafeAreaView';
import SimpleProductCard from '../../components/cards/SimpleProductCard';
import COLORS from '../../consts/colors';
// import colors
import Colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import sample data
import sample_data from '../../config/sample-data';

// Search Config
const isRTL = I18nManager.isRTL;
const FILTER_ICON = 'filter-variant';
const SEARCH_ICON = 'magnify';

// Search Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: '700',
    textAlign: 'left',
  },

 
  filtersList: {
    paddingVertical: 8,
    paddingRight: isRTL ? 0 : 16,
    paddingLeft: isRTL ? 16 : 0,
  },
  filterItemContainer: {
    marginRight: isRTL ? 16 : 0,
    marginLeft: isRTL ? 0 : 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(35, 47, 52, 0.08)',
    overflow: 'hidden',
  },
  filterItem: {flex: 1, justifyContent: 'center'},
  filterName: {
    top: -1,
    fontWeight: '700',
    color: 'rgb(35, 47, 52)',
    paddingHorizontal: 16,
  },

});
const style = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

});
// Search
// Search
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: sample_data.filters,
      offers: sample_data.offers,
      dessert: sample_data.dessert,
      blockchain: sample_data.blockchain,
      pasta: sample_data.pasta,
      pizza: sample_data.pizza,
      salad: sample_data.salad,
      soup: sample_data.soup,
    };
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;

    Keyboard.dismiss();

    navigation.navigate(screen);
  };

  handleFilterPress = item => () => {
    const {filters} = this.state;
    const index = filters.indexOf(item);
    const filtersActiveIndex = filters.findIndex(e => e.picked === true);
    let scrollByIndex;

    if (filtersActiveIndex !== index) {
      filters[filtersActiveIndex].picked = false;
      filters[index].picked = true;

      this.setState(
        {
          filters: [...filters],
        },
        () => {
          this.filtersList.scrollToIndex({animated: true, index: index});

          if (isRTL) {
            scrollByIndex = -(index - filtersActiveIndex);
          } else {
            scrollByIndex = index - filtersActiveIndex;
          }

          this.productSwiper.scrollBy(scrollByIndex, true);
        },
      );
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderFilterItem = ({item, index}) => (
    <View style={styles.filterItemContainer}>
      <TouchableItem
        onPress={this.handleFilterPress(item)}
        style={[
          styles.filterItem,
          item.picked && {backgroundColor: Colors.primaryColor},
        ]}>
        <Text
          style={[
            styles.filterName,
            item.picked && {color: Colors.onPrimaryColor},
          ]}>
          {item.name}
        </Text>
      </TouchableItem>
    </View>
  );


  renderProductItem = ({item, index}) => (
    <SimpleProductCard
      key={index}
      onPress={this.navigateTo('Product')}
      activeOpacity={0.7}
      imageUri='https://picsum.photos/400'
      title={item.name}
      price={item.price}
      rating={item.rating}
      description={item.description}
    />
   
    );

 

  renderSeparator = () => <Divider />;

  onIndexChanged = index => {
    const {filters} = this.state;
    const filtersLength = filters.length - 1;
    const filtersActiveIndex = filters.findIndex(e => e.picked === true);

    if (filtersActiveIndex !== index) {
      filters[filtersActiveIndex].picked = false;

      if (isRTL) {
        filters[filtersLength - index].picked = true;
      } else {
        filters[index].picked = true;
      }

      this.setState(
        {
          filters: [...filters],
        },
        () => {
          if (isRTL) {
            this.filtersList.scrollToIndex({
              animated: true,
              index: filtersLength - index,
            });
          } else {
            this.filtersList.scrollToIndex({animated: true, index: index});
          }
        },
      );
    }
  };

  render() {
    const {
      filters,
      offers,
      dessert,
      blockchain,
      pasta,
      pizza,
      salad,
      soup,
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Search</Heading6>
        </View>
 <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <TextInput placeholder="Learn something new"
              returnKeyType="search"
            maxLength={50}
           />
          </View>

          <View style={style.sortBtn}>
          <TouchableItem onPress={()=>{}}>
            <Ionicons name="tune" color={COLORS.white} size={25} />
             </TouchableItem>
          </View>
        </View>
  

        <View>
          <FlatList
            ref={r => (this.filtersList = r)}
            data={filters}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderFilterItem}
            horizontal
            alwaysBounceHorizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>

        <Swiper
          ref={r => (this.productSwiper = r)}
          index={isRTL ? filters.length - 1 : 0}
          onIndexChanged={this.onIndexChanged}
          loop={false}
          showsPagination={false}>
          {/* OFFERS SLIDE */}
          <FlatList
            data={offers}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem} numColumns={3}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {/* DESSERT SLIDE */}
          <FlatList
            data={dessert}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem} numColumns={3}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {/* GRILL SLIDE */}
          <FlatList
            data={blockchain}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {/* PASTA SLIDE */}
          <FlatList
            data={pasta}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {/* PIZZA SLIDE */}
          <FlatList
            data={pizza}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {/* SLALD SLIDE */}
          <FlatList
            data={salad}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
          />

          {/* SOUP SLIDE */}
          <FlatList
            data={soup}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </Swiper>
      </SafeAreaView>
    );
  }
}
