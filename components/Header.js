import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
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
    height:
      Dimensions.get("screen").height < 500
        ? 50
        : Dimensions.get("screen").height < 800
        ? 70
        : 80,
        paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: Dimensions.get("screen").height < 500
        ? 16
        : Dimensions.get("screen").height < 800
        ? 24
        : 32,
    fontFamily: "open-sans-bold",
  },
});
