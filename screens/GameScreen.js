import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";
import { Ionicons } from "@expo/vector-icons";

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

const DUMMY_TRIES = [
  "14 - too low",
  "24 - too low",
  "84 - too high",
  "75 - too high",
  "34 - too low",
  "67 - too high",
  "57 - too high",
]

export default function GameScreen(props) {
  const [playerGuess, setPlayerGuess] = useState("");
  const [playerNumberOfTries, setPlayerNumberOfTries] = useState(0);
  const [playerResultMessage, setPlayerResultMessage] = useState();
  const [pastGuesses, setPastGuesses] = useState(DUMMY_TRIES);

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
      setPastGuesses((prevState) => [
        `${playerGuess} - too high`,
        ...prevState,
      ]);
    } else {
      setPlayerResultMessage("It is higher than that!");
      setPastGuesses((prevState) => [`${playerGuess} - too low`, ...prevState]);
    }
    setPlayerGuess("");
  };

  const computerGuessHandler = () => {
    if (playerResultMessage !== "That is correct!") return;
    const result = computerGuess(1, 100, props.userChoice);
    numberOfTries = 0;
    props.onGameOver({ playerNumberOfTries, computerNumberOfTries: result });
  };

  return (
    <ScrollView>
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
            {playerResultMessage}{" "}
            {playerResultMessage &&
              playerResultMessage === "That is correct!" && (
                <Ionicons
                  name="ios-happy-outline"
                  color="green"
                  size={24}
                />
              )}
            {playerResultMessage &&
              playerResultMessage !== "That is correct!" && (
                <Ionicons
                  name="ios-sad-outline"
                  color="red"
                  size={24}
                />
              )}
          </Text>
          <View style={styles.guessesContainer}>
            {pastGuesses.map((guess, index) => (
              <View key={index} style={styles.guessItem}>
                <Text style={{textAlign: "center"}}>{guess}</Text>
              </View>
            ))}
          </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  playerContainer: {
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nonPlayerContainer: {
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
    marginVertical: 10
  },
  playerResultTextSuccess: {
    textAlign: "center",
    color: "green",
    marginVertical: 10
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
  guessesContainer: {    
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: 40,
  },
  guessItem: {
    width: Dimensions.get("window").width / 3
  }
});
