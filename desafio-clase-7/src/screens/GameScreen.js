import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NameContainer from '../components/NameContainer';
import Card from '../components/Card';

const GameScreen = ({userOption}) => {

  const handleChau = () => {
    console.log('Chau ',userOption)
  }

  return (
    <View style={styles.screen}>
      <Text>Hola {userOption}</Text>
      <Card style={styles.buttonContainer}>
        <Button title='Decir chau' onPress={handleChau}/>
      </Card>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
})