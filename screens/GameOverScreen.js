import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
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
            height: Dimensions.get("screen").height * 0.3
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

  const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.screen}>
              <Text style={{ ...styles.title, ...titleStyle }}>Game Over</Text>
        <Image
          fadeDuration={1000}
          style={{ ...styles.image, ...imageStyle }}
          source={require("../assets/success.png")}
          // uri images need a width and height set.
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
            buttonFontSize={{
              ...styles.buttonFontSize,
              ...buttonFontSizeStyle,
            }}
            title="Play again"
            onPress={props.onRestart}
          />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  screen: {
    flexGrow: 1,
    alignItems: "center",
    marginTop:
      Dimensions.get("screen").height < 500
        ? 0
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
        height: Dimensions.get("screen").height * 0.3
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
    marginBottom: 5
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
