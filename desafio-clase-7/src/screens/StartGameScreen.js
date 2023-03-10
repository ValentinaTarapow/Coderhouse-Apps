import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import Card from '../components/Card'
import COLORS from '../constants/Colors'
import Input from '../components/Input'
import NameContainer from '../components/NameContainer'
import { titleStyle } from '../constants/TextStyles'


const StartGameScreen = ({ onStartGame }) => {

  const [enteredValue, setEnteredValue] = React.useState('')
  const [confirmed, setConfirmed] = React.useState(false)
  const [selectedName, setSelectedName] = React.useState()

  const nameInputHandler = inputText => {
    setEnteredValue(inputText, '')
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenName = enteredValue
    if (typeof chosenName !== 'string') {
      return
    }
    setConfirmed(true)
    setSelectedName(chosenName)
    setEnteredValue('')
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.container}>
        <Text style={styles.title}>Comenzar Juego</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.inputDectiptionText}>Ingrese su nombre</Text>
          <Input style={styles.input}
            blurOnSubmit
            autoCorrect={false}
            maxLength={10}
            value={enteredValue}
            onChangeText={nameInputHandler}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button title="Limpiar" onPress={resetInputHandler} color={COLORS.cancel} />
            </View>
            <View style={styles.button}>
              <Button title="Confirmar" onPress={confirmInputHandler} color={COLORS.accept} />
            </View>
          </View>
        </Card>
        {confirmed &&
          <Card style={styles.selectedNameContainer}>
            <Text>Tu nombre</Text>
            <NameContainer>{selectedName}</NameContainer>
            <Button title="Iniciar Juego" onPress={()=>{
              onStartGame(selectedName)
            }} color={COLORS.primary}/>
          </Card>
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default StartGameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    ...titleStyle,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    padding: 20,
    alignItems: 'center'
  },
  inputDectiptionText: {
    textAlign: 'center'
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  selectedNameContainer:{
    marginTop: 20,
    width: 200,
    maxWidth: '80%',
    padding:10,
    alignItems: 'center',
  },
})