import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

let numberOfTries = 0;

const computerGuess = (min, max, correctNumber) => {
  numberOfTries += 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNumb = Math.floor(Math.random() * (max - min)) + min;
  if (randNumb === correctNumber) {
    return numberOfTries;
  } else if (randNumb > correctNumber) {
      return computerGuess(min, randNumb, correctNumber);
  } else {
      return computerGuess(randNumb, max, correctNumber);
  }
};

export default function GameScreen(props) {
  const [playerGuess, setPlayerGuess] = useState("");
  const [playerNumberOfTries, setPlayerNumberOfTries] = useState(0);
  const [playerResultMessage, setPlayerResultMessage] = useState();

  const inputPlayerGuessChanged = (inputText) => {
    setPlayerGuess(inputText.replace(/[^0-9]/g, ""));
  };

  const userGuessHandler = () => {
    const chosenNumber = parseInt(playerGuess);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "The value has to be a number between 1 and 99",
        [{ text: "Ok", style: "destructive" }]
      );
      return;
    }
    setPlayerNumberOfTries((prevState) => prevState + 1);
    if (chosenNumber === props.userChoice) {
      setPlayerResultMessage("That is correct!");
    } else if (chosenNumber > props.userChoice) {
      setPlayerResultMessage("It is lower than that!");
    } else {
      setPlayerResultMessage("It is higher than that!");
    }
  };

  const computerGuessHandler = () => {
    if (playerResultMessage !== "That is correct!") return;
    const result = computerGuess(1, 100, props.userChoice);
    numberOfTries = 0;
    props.onGameOver({playerNumberOfTries, computerNumberOfTries: result})
  };

  return (
    <View style={styles.screen}>
      <View style={styles.playerContainer}>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad" // * ios
          maxLength={2}
          onChangeText={inputPlayerGuessChanged}
          value={playerGuess}
          onSubmitEditing={userGuessHandler}
          autoFocus
        />
        <View style={styles.guessButton}>
          <Button title="Guess" onPress={userGuessHandler} />
        </View>
        <Text
          style={
            playerResultMessage === "That is correct!"
              ? styles.playerResultTextSuccess
              : styles.playerResultTextFail
          }
        >
          {playerResultMessage}
        </Text>
      </View>
      <View style={styles.nonPlayerContainer}>
        <View style={styles.computerTryButton}>
          <Button
            title="Let the computer try!"
            onPress={computerGuessHandler}
          />
        </View>        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  playerContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nonPlayerContainer: {
    flex: 2,
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: Colors.secondary,
    width: "80%",
    alignItems: "center",
  },
  input: {
    fontSize: 50,
    height: 50,
    marginBottom: 20,
    textAlign: "center",
    width: 80,
  },
  guessButton: {
    width: 100,
  },
  playerResultTextFail: {
    textAlign: "center",
    color: "red",
  },
  playerResultTextSuccess: {
    textAlign: "center",
    color: "green",
  },
  computerTryButton: {
    width: "60%",
  },
  buttonContainer: {
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
