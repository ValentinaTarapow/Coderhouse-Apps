import { StyleSheet, TextInput, View, Button } from "react-native";
import React from "react";

const NewItemHeader = ({
    onChangeText,
    itemText,
    addItemToState,
    inputPlaceHolder
}) => {
    return (
        <View style={styles.addItemInputContainer}>
            <TextInput
                placeholder="Enter an item"
                style={styles.input}
                onChangeText={onChangeText}
                value={itemText}
            />
            <Button title="Add" onPress={addItemToState} />
        </View>
    );
};

export default NewItemHeader;

const styles = StyleSheet.create({
    addItemInputContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        width: 200,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
});