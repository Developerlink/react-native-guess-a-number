import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 80,
        paddingVertical: 10,
        backgroundColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        color: "black",
        fontSize: 30,
        fontFamily: "open-sans-bold"
    }
});
