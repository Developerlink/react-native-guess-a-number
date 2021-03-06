import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/colors";

export default function NumberContainer(props) {
  return (
    <View style={styles.container}>
      <Text style={props.style}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
})