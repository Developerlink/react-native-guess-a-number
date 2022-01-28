import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import { KeyboardAvoidingView } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function StartGameScreen(props) {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [titleStyle, setTitleStyle] = useState();
  const [inputContainerStyle, setInputContainerStyle] = useState();
  const [confirmTextStyle, setConfirmTextStyle] = useState();
  const [summaryContainerStyle, setSummaryContainerStyle] = useState();
  const [numberStyle, setNumberStyle] = useState();
  const [buttonSizeStyle, setButtonSizeStyle] = useState();
  const [buttonFontSizeStyle, setButtonFontSizeStyle] = useState();

  useEffect(() => {
    const updateLayout = () => {
      if (Dimensions.get("screen").height < 600) {
        setTitleStyle({
          marginVertical: 0,
        });
        setInputContainerStyle({
          marginTop: 5
        })
      } else {
        setTitleStyle({
          marginVertical: 10,
        });
        setInputContainerStyle({
          marginTop: 20
        })
      }

      setConfirmTextStyle({
        fontSize:
          Dimensions.get("window").height < 500
            ? 14
            : Dimensions.get("window").height < 800
            ? 20
            : 30,
      });
      setNumberStyle({
        fontSize:
          Dimensions.get("window").height < 500
            ? 16
            : Dimensions.get("window").height < 800
            ? 24
            : 32,
      });
      setSummaryContainerStyle({
        marginTop:
          Dimensions.get("screen").height < 500
            ? 5
            : Dimensions.get("screen").height < 700
            ? 30
            : 80,
        paddingVertical:
          Dimensions.get("screen").height < 500
            ? 8
            : Dimensions.get("screen").height < 800
            ? 20
            : 30,
      });
      setButtonSizeStyle({
        paddingVertical:
          Dimensions.get("screen").height < 500
            ? 8
            : Dimensions.get("screen").height < 800
            ? 12
            : 12,
      });
      setButtonFontSizeStyle({
        fontSize:
          Dimensions.get("screen").height < 500
            ? 16
            : Dimensions.get("screen").height < 800
            ? 20
            : 30,
      });
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    // Replace anything that is not a number with empty string like ',' or '.'
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); // * android
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "The value has to be a number between 1 and 99",
        [{ text: "Ok", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setSelectedNumber(parseInt(enteredValue));
    setConfirmed(true);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={{ ...styles.summaryContainer, ...summaryContainerStyle }}>
        <Text style={{ ...styles.confirmText, ...confirmTextStyle }}>
          You selected
        </Text>
        <NumberContainer style={{ ...styles.number, ...numberStyle }}>
          {selectedNumber}
        </NumberContainer>
        <MainButton
          buttonSize={{ ...styles.buttonSize, ...buttonSizeStyle }}
          buttonFontSize={{ ...styles.buttonFontSize, ...buttonFontSizeStyle }}
          onPress={() => props.onStartGame(selectedNumber)}
        >
          Start game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={30}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.body}>
            <Text style={{ ...styles.title, ...titleStyle }}>
              Start a new Game!
            </Text>
            <Card style={{...styles.inputContainer, ...inputContainerStyle}}>
              <BodyText>Select a number between 1 - 99</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad" // * ios
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.accent}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: Dimensions.get("window").height < 500 ? 5 : 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: Dimensions.get("screen").height < 600 ? 0 : 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    marginTop: Dimensions.get("screen").height < 500 ? 5 : 20,
    width: "80%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    //width: Dimensions.get("window").width / 3.5
    width: "40%",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  confirmText: {
    fontSize:
      Dimensions.get("window").height < 500
        ? 14
        : Dimensions.get("window").height < 800
        ? 20
        : 30,
  },
  summaryContainer: {
    alignItems: "center",
    marginTop:
      Dimensions.get("screen").height < 500
        ? 5
        : Dimensions.get("screen").height < 700
        ? 60
        : 80,
    paddingVertical:
      Dimensions.get("screen").height < 500
        ? 8
        : Dimensions.get("screen").height < 800
        ? 20
        : 30,
  },
  number: {
    color: Colors.accent,
    fontSize:
      Dimensions.get("window").height < 500
        ? 16
        : Dimensions.get("window").height < 800
        ? 24
        : 32,
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
