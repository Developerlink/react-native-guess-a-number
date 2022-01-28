import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../constants/colors";

export default function MainButton(props) {
  return <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={{...styles.button, ...props.buttonSize}}>
          <Text style={{...styles.buttonText, ...props.buttonFontSize}}>{props.title || props.children}</Text>
      </View>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,        
        paddingHorizontal: 30,
        borderRadius: 35,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
    }
});
