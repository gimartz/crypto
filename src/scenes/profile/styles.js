import { StyleSheet } from 'react-native';
  import { colors, fonts } from './constants'; 
import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = percent => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(percent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = percent => {
  const screenHeight = Dimensions.get('window').height;
  const elemWidth = parseFloat(percent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemWidth) / 100);
};
export default StyleSheet.create({
  container: {
    flex: 1,backgroundColor: '#eef1fb',
  },
  contentContainer: {
    backgroundColor: '#eef1fb',
    flexGrow: 1,
  },
  profileContainer: {
    width: '100%',
 
    padding: 13,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeContainer: {
    width: '100%',
    padding: 13,
    backgroundColor: '#fff',borderRadius:20,paddingLeft:20,marginLeft:20,marginRight:20,paddingRight:20
  },
  avtar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  channelName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    color: '#212121',
    marginVertical: 5,  alignItems: 'center',
    textAlign: 'center',
  },
  channelMail: {
    color: '#606060',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#04abf2',
    width: '40%',
    height: 45,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
  },
  heading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#9c9c9c',
    paddingVertical: 10,
    marginHorizontal: 12,
  },
    headerBtn: {
    height: 40,
    width: 40,
    backgroundColor: '#bead83',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    
    flex: 2,
   fontFamily: fonts.regular,
   marginLeft:10,fontWeight:'bold',
    fontSize: 18,
    color: 'black',
    width: '80%',
  },opts:{
    flexDirection:'column', width:'70%'
  },options:{marginLeft:10,   color: colors.textGrey,
    flex: 2,
    fontFamily: fonts.regular,},
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    alignItems: 'center',
    marginVertical: 8.6,
  },
  card:{backgroundColor:'#d9e0f0',marginLeft:15,marginRight:15,marginBottom:10,marginTop:5,
borderRadius:20,paddingLeft:10,paddingRight:10
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
},
  rowInput: {
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  horizontalLine: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1.5,
    marginVertical: 10,
  },
  modalOption: {
    flexDirection: 'row',
    width: '95%',
    height: heightPercentageToDP('8'),
    alignSelf: 'center',
    borderRadius: 7,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#efefef',
    paddingHorizontal: 10,
  },
  modalText: {
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    marginHorizontal: 20,
  },
  modalContainer: {
    marginHorizontal: 11,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  darktitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  field: {
    fontSize: 15,
    textAlign: 'center'
  },
  darkfield: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  avatar: {
    margin: 30,
    alignSelf: "center",
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
  },
  deletebutton: {
    backgroundColor: '#dc143c',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  },
})
