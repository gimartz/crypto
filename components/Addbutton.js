import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated } from "react-native";
import {FontAwesome, FontAwesome5, Feather } from "@expo/vector-icons";

export default class AddButton extends React.Component {
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);

    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.95,
                duration: 200
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0
            })
        ]).start();
    }

    render() {
        const thermometerX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        });

        const thermometerY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const timeX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        });

        const timeY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -150]
        });

        const pulseX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        });

        const pulseY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        });

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };

        return (
            <View style={{ position: "absolute", alignItems: "center" }}>
             
              
               
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#7F58FF">
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome name="play-circle-o" size={24} color="#FFF" />
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#b71525",
        position: "absolute",
        marginTop: -30,
        shadowColor: "#b71525",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48, marginTop: -40,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#b71525"
    }
});
