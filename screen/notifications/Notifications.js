// Import React in our code
import React, { useState } from "react";

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,Image,
  Text,
  TouchableOpacity,
} from "react-native";

import inAppMessaging from "@react-native-firebase/in-app-messaging";

const Notifications = () => {
  const [
    canReceiveMessage,
    setCanReceiveMessage,
  ] = useState(true);

  const allowToReceiveMessage = async (isAllowed) => {
    setCanReceiveMessage(isAllowed);
    // Allow/Disallow user to receive messages
    await inAppMessaging().setMessagesDisplaySuppressed(
      isAllowed
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
    Notifications
      </Text>
        <View style={styles.ontainer}>
        <Image
          source={{
            uri:
              'https://i.ibb.co/v4fwqJV/Messages.gif',
          }}
          //borderRadius will help to make Round Shape
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2
          }}
        />
       
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.simpleText}>
          User Can Receive Message :{" "}
          {canReceiveMessage ? "Yes" : "No"}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() =>
            allowToReceiveMessage(!canReceiveMessage)
          }
        >
          <Text style={styles.buttonTextStyle}>
            {canReceiveMessage
              ? "Disable Receiving Message"
              : "Enable Receiving Message"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerHeading}>
       Get Real time updates here
      </Text>
     
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 35,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  simpleText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#b71525",
    padding: 10,
    width: "100%",
    marginTop: 16,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  ontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0dcdc',
  },
});