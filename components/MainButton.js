import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../constants/colors";

export default function MainButton(props) {
  return <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={{...styles.button, ...props.style}}>
          <Text style={{...styles.buttonText, ...props.style}}>{props.title || props.children}</Text>
      </View>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 
        Dimensions.get("window").height < 500
        ? 8
        : Dimensions.get("window").height < 800
        ? 12
        : 12,
        paddingHorizontal: 30,
        borderRadius: 35,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
        fontSize: 
        Dimensions.get("window").height < 500
        ? 16
        : Dimensions.get("window").height < 800
        ? 20
        : 30
    }
});
