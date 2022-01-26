import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Card from "../components/Card";

export default function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.gameOverText}>Game Over</Text>
      <Image
        style={styles.image}
        source={require("../assets/success.png")}
        resizeMode="contain"
      />
      <Card style={styles.results}>
        <Text>
          Player's number of tries: {props.results.playerNumberOfTries}
        </Text>
        <Text>
          Computer's number of tries: {props.results.computerNumberOfTries}
        </Text>
      </Card>
      <View style={styles.restart}>
        <Button title="Play again" onPress={props.onRestart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  gameOverText: {
    fontSize: 30,
    marginBottom: 50,
    fontWeight: "bold",
    color: "green",
  },
  results: {
    width: "80%",
  },
  restart: {
    marginTop: 40,
  },
  image: {
    width: "80%",
    height: 200,
    marginBottom: 40,
  },
});
