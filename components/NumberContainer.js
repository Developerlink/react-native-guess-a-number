import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/colors";

export default function NumberContainer(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
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
    number: {
        color: Colors.accent,
        fontSize: 
        Dimensions.get("window").height < 500
        ? 16
        : Dimensions.get("window").height < 800
        ? 24
        : 32
    }
})