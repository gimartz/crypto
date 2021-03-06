import React, {useState, useEffect} from 'react';
import { firebase } from '../../src/firebase/config'
// import all the components we are going to use
import {
  SafeAreaView,
  Text, Keyboard,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SimpleProductCard from '../../components/cards/SimpleProductCard';
import { useNavigation } from '@react-navigation/native'; 
const Search  = (props) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
   

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
           setMasterDataSource([...masterDataSource, ...myData])
           setFilteredDataSource([...filteredDataSource, ...myData])
         // alert(JSON.stringify(token))
      }).catch((error) => {
          console.log("Error getting document:", error);
 }) }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.detail
          ? item.name.toLowerCase()
          : ''.toUpperCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
       
    
  const ItemView = ({item, index}) => {
  return (
  
        <SimpleProductCard
      key={index}
     onPress={() => props.navigation.navigate('DetailsScreen',item)}
      activeOpacity={0.7}
      imageUri={item.img}
      title={item.name}
      price={item.number}
      rating={item.rating}
      description={item.detail}
    />)
  };
 

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.name);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        {filteredDataSource.length == 0 ? 
          
           (
        
            <View style={{ }}>
    
       

    <Text style={{ color:'#bead83',fontWeight:'900', textTransform: 'uppercase',fontSize:20,marginLeft:10,marginBottom:30}}>No results found for {search}</Text>

  </View>):
(       <FlatList
          data={filteredDataSource}
           keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
       
        )
        }
      </View>
    </SafeAreaView>
  );
};
//  keyExtractor={(item, index) => index.toString()
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
});

export default Search ;