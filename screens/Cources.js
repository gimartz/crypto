import React from 'react'
import {
    View,
    Text,Button,
    Image,
    TouchableOpacity,
    ImageBackground} from 'react-native'
import {Modalize} from 'react-native-modalize'
import CourseList from '../screens/CourseList'
import { COLORS, SIZES, icons, FONTS } from './constants/index';
export default class Cources extends React.Component{
   navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
   
  };
     renderFooter() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: SIZES.padding,
                    right: SIZES.padding,
                    flexDirection: 'row',
                    height: 70,
                    backgroundColor: COLORS.white,
                    borderRadius: 35
                }}
            >              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            source={icons.dashboard}
                            style={{
                                tintColor: COLORS.gray,
                                width: 25,
                                height: 25,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 50,
                            borderRadius: 10,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={() => console.log("Add on clicked")}
                    >
                        <Image
                            source={icons.plus}
                            style={{
                                tintColor: COLORS.white,
                                height: 20,
                                width: 20
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() =>  this.navigateTo("Cart")}
                    >
                        <Image
                            source={icons.user}
                            style={{
                                tintColor: COLORS.gray,
                                width: 25,
                                height: 25
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
  

  
    render(){
     
        return(
            <ImageBackground
                source={require('../images/imag/cat.png')}
                style={{width:"100%",height:"100%"}}
            >
                <View style={{
                    flexDirection:"row",
                    width:"100%",
                    paddingHorizontal:20
                }}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("Home")}
                        style={{
                            paddingHorizontal:10,
                            paddingVertical:13,
                            borderRadius:10,
                            marginTop:30,
                            backgroundColor:"#8bbcdb"
                        }}
                    >
                        <Image
                            source={require('../images/imag/a1.png')}
                            style={{width:20,height:15}}
                        />
                    </TouchableOpacity>
                    <View style={{
                        paddingHorizontal:10,
                        paddingVertical:13,
                        borderRadius:10,
                        marginTop:30,
                        backgroundColor:"#8bbcdb",
                        marginLeft:240
                    }}> 
                            <Image
                                source={require('../images/imag/hum.png')}
                                style={{height:15,width:20}}
                            />
                    </View>
                </View>
                <Text style={{
                    color:"#FFF",
                    fontSize:35,
                    fontFamily:"Bold",
                    width:200,
                    alignSelf:"center",
                    textAlign:"center",
                    marginTop:34
                    
                    }}>
                  Trading Techniques
                </Text>

                <Modalize
                    handleStyle={{
                        marginTop:30,
                        backgroundColor:"#e9e9e9",
                        width:80
                    }}
                    modalStyle={{
                        borderTopLeftRadius:60,
                        borderTopRightRadius:60
                    }}
                    alwaysOpen={500}
                    scrollViewProps={{showsVerticalScrollIndicator:false}}
                >
                    <View style={{marginTop:40}}>
                            <CourseList
                                onPress={()=>this.props.navigation.navigate("Xd")}
                                img={require('../images/imag/xd.png')}
                                title="Adobe XD Prototyping"
                                bg="#fdddf3"
                            />
                             <CourseList
                                img={require('../images/imag/sketch.png')}
                                title="Sketch shortcuts and tricks"
                                bg="#fef8e3"
                            />
                             <CourseList
                                img={require('../images/imag/ae.png')}
                                title="UI Motion Design in After Effects"
                                bg="#fcf2ff"
                            />
                             <CourseList
                                img={require('../images/imag/f.png')}
                                title="Figma Essentials"
                                bg="#fff0ee"
                            />
                             <CourseList
                                img={require('../images/imag/ps.png')}
                                title="Adobe Photoshop. Retouching"
                                bg="#fdddf3"
                            />
                             <CourseList
                                img={require('../images/imag/sketch.png')}
                                title="Sketch shortcuts and tricks"
                                bg="#fef8e3"
                            />
                         
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          
            {this.renderFooter()}
        </View>
    
                    </View>
                </Modalize>
            </ImageBackground>
        )
    }
}