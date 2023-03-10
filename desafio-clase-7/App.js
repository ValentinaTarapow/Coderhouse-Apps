import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen';
import GameScreen from './src/screens/GameScreen';

SplashScreen.preventAutoHideAsync();


export default function App() {

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  React.useEffect(() =>{
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded])

  const [userName, setUserName] = React.useState();

  const startGameHandler = (selectedName) => {
    setUserName(selectedName);
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header title="A saludar" />
      {
        !userName
          ? <StartGameScreen onStartGame={startGameHandler} />
          : <GameScreen userOption={userName} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
