import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [results, setResults] = useState({});
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  if (!dataIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataIsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setResults(null);
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (gameResults) => {
    setResults(gameResults);
    setUserNumber(0);
  };

  let content;

  if (results) {
    content = <GameOverScreen results={results} onRestart={startGameHandler} />;
  } else if (userNumber > 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else {
    content = <StartGameScreen onStartGame={startGameHandler} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
