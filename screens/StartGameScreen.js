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

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState();
  const [bodyStyle, setBodyStyle] = useState();

  useEffect(()=>{
    const updateLayout = () => {
      setBodyStyle({
        flex: 1,
        padding: Dimensions.get("window").height < 500 ? 5 : 10,
        alignItems: "center",
      });
    }

    Dimensions.addEventListener('change', updateLayout);
    
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
      Alert.alert(
        "Screen has rotated",
        "Hopefully this triggers correctly...",
        [{ text: "Ok", style: "destructive", onPress: resetInputHandler }]
      );
    }
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
      <Card style={styles.summaryContainer}>
        <Text style={styles.confirmText}>You selected</Text>
        <NumberContainer>55{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          Start game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>

    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={30}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={bodyStyle}>
          <Text style={styles.title}>Start a new Game!</Text>
          <Card style={styles.inputContainer}>
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
  // body: {
  //   flex: 1,
  //   padding: Dimensions.get("window").height < 500 ? 5 : 10,
  //   alignItems: "center",
  // },
  title: {
    fontSize: 20,
    marginVertical: Dimensions.get("window").height < 500 ? 0 : 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    marginTop: Dimensions.get("window").height < 500 ? 5 : 20,
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
  summaryContainer: {
    marginTop:
      Dimensions.get("window").height < 500
        ? 5
        : Dimensions.get("window").height < 800
        ? 60
        : 80,
    alignItems: "center",
    paddingVertical: 
    Dimensions.get("window").height < 500
        ? 8
        : Dimensions.get("window").height < 800
        ? 20
        : 30
  },
  confirmText: {
    fontSize:
      Dimensions.get("window").height < 500
        ? 14
        : Dimensions.get("window").height < 800
        ? 20
        : 30,
  },
});
