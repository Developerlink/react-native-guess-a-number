import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

export default function GameOverScreen(props) {
  const [titleStyle, setTitleStyle] = useState();
  const [imageStyle, setImageStyle] = useState();
  const [resultsStyle, setResultsStyle] = useState();
  const [restartContainerStyle, setRestartContainerStyle] = useState();
  const [buttonSizeStyle, setButtonSizeStyle] = useState();
  const [buttonFontSizeStyle, setButtonFontSizeStyle] = useState();

  useEffect(() => {
    const updateLayout = () => {
      setTitleStyle({
        fontSize:
          Dimensions.get("screen").height < 500
            ? 18
            : Dimensions.get("screen").height < 800
            ? 28
            : 32,
        marginBottom:
          Dimensions.get("screen").height < 500
            ? 10
            : Dimensions.get("screen").height < 800
            ? 20
            : 30,
      });
      setImageStyle({
        width:
          Dimensions.get("screen").height < 500
            ? "50%"
            : Dimensions.get("screen").height < 800
            ? "60%"
            : "70%",
        marginBottom:
          Dimensions.get("screen").height < 500
            ? 10
            : Dimensions.get("screen").height < 800
            ? 20
            : 40,
      });
      setResultsStyle({
        marginBottom:
          Dimensions.get("screen").height < 500
            ? 0
            : Dimensions.get("screen").height < 800
            ? 10
            : 40,
      });
      setRestartContainerStyle({
        marginTop:
          Dimensions.get("screen").height < 400
            ? 5
            : Dimensions.get("screen").height < 500
            ? 30
            : 40,
      });
      setButtonSizeStyle({
        paddingVertical:
          Dimensions.get("window").height < 500
            ? 8
            : Dimensions.get("window").height < 800
            ? 12
            : 12,
      });
      setButtonFontSizeStyle({
        fontSize:
          Dimensions.get("window").height < 500
            ? 16
            : Dimensions.get("window").height < 800
            ? 20
            : 30,
      });
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
    <View style={styles.screen}>
      <Text style={{ ...styles.title, ...titleStyle }}>Game Over</Text>
      <Image
        fadeDuration={1000}
        style={{ ...styles.image, ...imageStyle }}
        source={require("../assets/success.png")}
        // uri images need a width and height set.
        //source={{uri: "data:image/png;base64,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"}}
        resizeMode="contain"
        />
      <Card style={{ ...styles.results, ...resultsStyle }}>
        <Text style={styles.resultText}>
          <Text style={styles.playerText}>Player's</Text> number of tries:{" "}
          <Text style={styles.playerText}>
            {props.results.playerNumberOfTries}
          </Text>
        </Text>
        <Text style={styles.resultText}>
          <Text style={styles.computerText}>Computer's</Text> number of tries:{" "}
          <Text style={styles.computerText}>
            {props.results.computerNumberOfTries}
          </Text>
        </Text>
      </Card>
      <View style={{ ...styles.restart, ...restartContainerStyle }}>
        <MainButton
          buttonSize={{ ...styles.buttonSize, ...buttonSizeStyle }}
          buttonFontSize={{ ...styles.buttonFontSize, ...buttonFontSizeStyle }}
          title="Play again"
          onPress={props.onRestart}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollScreen: {
    flex: 1
  },
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop:
      Dimensions.get("screen").height < 500
        ? 12
        : Dimensions.get("screen").height < 800
        ? 20
        : 30,
  },
  title: {
    fontSize:
      Dimensions.get("screen").height < 500
        ? 18
        : Dimensions.get("screen").height < 800
        ? 28
        : 32,
    marginBottom:
      Dimensions.get("screen").height < 500
        ? 10
        : Dimensions.get("screen").height < 800
        ? 20
        : 30,
    fontWeight: "bold",
    color: "green",
  },
  results: {
    width: "80%",
    marginBottom:
      Dimensions.get("screen").height < 500
        ? 0
        : Dimensions.get("screen").height < 800
        ? 10
        : 40,
  },
  image: {
    width:
      Dimensions.get("screen").height < 500
        ? "50%"
        : Dimensions.get("screen").height < 800
        ? "60%"
        : "70%",
    marginBottom:
      Dimensions.get("screen").height < 500
        ? 10
        : Dimensions.get("screen").height < 800
        ? 20
        : 40,
    height: "30%",
  },
  resultText: {
    fontSize: Dimensions.get("screen").height < 500 ? 16 : 20,
  },
  playerText: {
    color: Colors.accent,
  },
  computerText: {
    color: Colors.primary,
  },
  restart: {
    marginTop:
      Dimensions.get("screen").height < 400
        ? 5
        : Dimensions.get("screen").height < 500
        ? 30
        : 40,
  },
  buttonSize: {
    paddingVertical:
      Dimensions.get("window").height < 500
        ? 8
        : Dimensions.get("window").height < 800
        ? 12
        : 12,
  },
  buttonFontSize: {
    fontSize:
      Dimensions.get("window").height < 500
        ? 16
        : Dimensions.get("window").height < 800
        ? 20
        : 30,
  },
});
