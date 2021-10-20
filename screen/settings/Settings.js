/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  Alert,
  I18nManager,
  Platform,Image,
  SafeAreaView,
  ScrollView,TouchableOpacity,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import { color } from 'react-native-reanimated';
import {getNotifications} from '../../components/notification-service';
import Text from '../../components/Text';
import ListItem from '../../components/ListItem';
import Header from './hea';
import Card from '../../components/Card';
// import components
import Avatar from '../../components/avatar/Avatar';
import Divider from '../../components/divider/Divider';
import Icon from '../../components/icon/Icon';
import {Heading6, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import { Ionicons, MaterialIcons ,MaterialCommunityIcons} from "@expo/vector-icons";
// import colors
import Colors from '../../theme/colors';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../../utils/auth-context';
// Settings Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const DIVIDER_MARGIN_LEFT = 60;
const ARROW_ICON = 'ios-arrow-forward';
const ADDRESS_ICON = IOS ? 'ios-pin' : 'md-pin';
const NOTIFICATION_OFF_ICON = IOS
  ? 'ios-notifications-off'
  : 'md-notifications-off';
const NOTIFICATION_ICON = IOS ? 'ios-notifications' : 'md-notifications';
const PAYMENT_ICON = IOS ? 'ios-card' : 'md-card';
const ORDERS_ICON = IOS ? 'ios-list' : 'md-list';
const TERMS_ICON = IOS ? 'ios-document' : 'md-document';
const ABOUT_ICON = IOS
  ? 'ios-information-circle-outline'
  : 'md-information-circle-outline';
const LOGOUT_ICON = IOS ? 'ios-log-out' : 'md-log-out';

// Settings Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
 row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
 
   
  
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
 
  mediumText: {
    fontWeight: '500',
  },
  setting: {
    height: 56,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 28,
    height: 28,
  },

  extraData: {
    textAlign: 'left',
  },
  logout: {color: Colors.primaryText},
});


// Settings Props
type Props = {
  icon: string,
  title: String,
  onPress: () => {},
  extraData: React.Node,
};

// Settings Components
const Setting = ({icon, title, onPress, extraData}: Props) => (
  <TouchableItem onPress={onPress}>
    <View>
      <View style={[styles.row, styles.setting]}>
        <View style={styles.leftSide}>
          {icon !== undefined && (
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={24} color={Colors.primaryColor} />
            </View>
          )}
          <Subtitle1 style={styles.mediumText}>{title}</Subtitle1>
        </View>

        <View style={isRTL && {transform: [{scaleX: -1}]}}>
          <Ionicons name={ARROW_ICON} size={16} color="rgba(0, 0, 0, 0.16)" />
        </View>
      </View>

      {extraData ? (
        <View style={styles.extraDataContainer}>{extraData}</View>
      ) : (
        <View />
      )}
    </View>
  </TouchableItem>
);

// Settings
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsOn: true,
    };
  }

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  toggleNotifications = value => {
    this.setState({
      notificationsOn: value,
    });
  };

  logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => {}},
      ],
      {cancelable: false},
    );
  };

  render() {
    const {notificationsOn} = this.state;


    return (
       <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" onPress={this.props.navigation.goBack} size={24} color="#52575D"></Ionicons>
                    <Ionicons name="md-ellipsis-vertical-outline" size={24} color="#52575D"></Ionicons>
                </View>

   <TouchableItem useForeground onPress={this.navigateTo('EditProfile')}>
            <View style={[styles.row, styles.profileContainer],{backgroundColor:Colors.primaryColor}}>
              <View style={[styles.profileCenter],{marginTop:10}}>
                <Avatar
                  imageUri={require('../../assets/img/profile.jpg')}
                  rounded
                  size={80}
                />
                <View style={styles.profileCenter}>
                  <Subtitle1 style={styles.name}>John Doe</Subtitle1>
                  <Subtitle2 style={styles.email}>
                  john.doe@example.com
                  </Subtitle2>
                </View>
              </View>
            </View>
          </TouchableItem>
          <Divider />

          <TouchableItem onPress={this.navigateTo('Notifications')}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  {notificationsOn ? (
                    <Ionicons
                      name="md-notifications"
                      size={24}
                      color={Colors.primaryColor}
                    />
                  ) : (
                    <Ionicons
                      name='md-notifications-off-sharp'
                      size={24}
                      color={Colors.primaryColor}
                    />
                  )}
                </View>
                <Subtitle1 style={styles.mediumText}>Notifications</Subtitle1>
              </View>

              {/*
                FIX: when android:supportsRtl="true" not added to AndroidManifest.xml
                <View style={isRTL && {transform: [{scaleX: -1}]}}> 
              */}
              <View>
                <Switch
                  trackColor={{
                    true: IOS && Colors.primaryColor,
                  }}
                  thumbColor={IOS ? Colors.onPrimaryColor : Colors.primaryColor}
                  onValueChange={this.toggleNotifications}
                  value={notificationsOn}
                />
              </View>
            </View>
          </TouchableItem>
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />


          <Setting
            onPress={this.navigateTo('DeliveryAddress')}
            icon="ios-wallet-sharp"
            title="Wallet"
            extraData={
              <View>
                <Subtitle2 style={styles.extraData}>
             add wallet address
                </Subtitle2>
              
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo('pay')}
            icon="card"
            title="Payment Method"
            extraData={
              <View>
                <Subtitle2 style={styles.extraData}>Visa MasterCard</Subtitle2>
                <Subtitle2 style={styles.extraData}>
                  xxxx xxxx xxxx 7654
                </Subtitle2>
              </View>
            }
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          <Setting
            onPress={this.navigateTo('Orders')}
            icon="cart-outline"
            title="My Orders"
          />
          <Divider type="inset" marginLeft={DIVIDER_MARGIN_LEFT} />

          

          
          <TouchableItem onPress={this.logout}>
            <View style={[styles.row, styles.setting]}>
              <View style={styles.leftSide}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={Colors.primaryColor}
                  />
                </View>
                <Subtitle1 style={[styles.logout, styles.mediumText]}>
                  Logout
                </Subtitle1>
              </View>
            </View>
          </TouchableItem>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
