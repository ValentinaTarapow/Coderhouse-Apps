import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const NameContainer = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{children}</Text>
    </View>
  )
}

export default NameContainer

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius:10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number:{
        color: Colors.accent,
        fontSize: 22
    }
})