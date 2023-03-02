import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Button,
    TextInput,
    View,
    Text,
    FlatList,
    Modal,
    Pressable,
} from "react-native";

export default function App() {

    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Dead to me',
            genre: 'Dramedy',
            watched: false
        },
        {
            id: 2,
            name: 'The last of us',
            genre: 'Apocalyptic',
            watched: true
        },
        {
            id: 3,
            name: 'Dexter',
            genre: 'Crime',
            watched: false
        },
        {
            id: 4,
            name: 'Catching murderers',
            genre: 'Crime',
            watched: true
        }
    ]);

    const [addModal, setAddModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [itemName, setItemName] = useState("");
    const [itemGenre, setItemGenre] = useState("");

    const onChangeItemName = (text) => {
        setItemName(text);
    };

    const onChangeItemGenre = (text) => {
        setItemGenre(text);
    };

    const openNewItemModal = () => {
        setAddModal(true);
    }

    const addItem = () => {
        setItems((oldArray) => [...oldArray, { id: Date.now(), name: itemName, genre: itemGenre, watched: false }]);
        setItemName("");
        setItemGenre("");
        setAddModal(!addModal);
    };

    const closeAddItem = () => {
        setAddModal(!addModal);
        setItemName("");
        setItemGenre("");
    }


    const openItem = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const onCancelModal = () => {
        setModalVisible(!modalVisible);
        setSelectedItem({});
    };

    const watchItem = (id) => {
        setModalVisible(!modalVisible);
        items.find(item => item.id === id).watched = true;
        setSelectedItem({});
    }

    const onDeleteBook = (id) => {
        setModalVisible(!modalVisible);
        setItems((oldArray) => oldArray.filter((item) => item.id !== id));
        setSelectedItem({});
    };

    return (
        // MAIN SCREEN
        <View style={styles.screen}>
            <Text style={styles.title}>On My Watch</Text>
            <Text style={styles.subtitle}>The movies and series tracker app</Text>
            <View style={styles.addItemInputContainer}>
                <Button title="Add new item" onPress={openNewItemModal} />
            </View>
            <FlatList
                style={styles.flatList}
                data={items}
                renderItem={(itemData) => (
                <Pressable
                    style={styles.itemContainer}
                    onPress={() => {
                    openItem(itemData.item);
                    }}
                >
                    <Text style={styles.itemName}>{itemData.item.name}</Text>
                    <Text style={styles.itemGenre}>{itemData.item.genre}</Text>
                    <Text style={itemData.item.watched ? styles.itemWatched : styles.itemWatching}>{itemData.item.watched ? "Watched" : "Watching"}</Text>
                </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.modalMainView}>
                <View style={styles.modalView}>
                    {/* Button close modal */}
                    <View style={styles.buttonClose}>
                    <Pressable
                        onPress={onCancelModal}
                    >
                        <Text style={[styles.button, styles.close]}>X</Text>
                    </Pressable>
                    </View>
                    {/* Movie/serie title */}
                    <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                    {/* Info */}
                    <View style={styles.modalBody}>
                    <Text style={styles.modalText}>
                        <Text>Genre: </Text>
                        <Text style={styles.modalBoldText}>{selectedItem?.genre}</Text>
                    </Text>
                    <Text style={styles.modalText}>
                        <Text>State: </Text>
                        <Text style={styles.modalBoldText}>{selectedItem.watched ? "Leído" : "Leyendo"}</Text>
                    </Text>
                    </View>
                    {/* Actions */}
                    <View style={styles.modalActions}>
                    <Pressable
                        style={[styles.button, styles.buttonCancel, selectedItem.watched && styles.disabledButton]}
                        onPress={() => {
                        watchItem(selectedItem.id);
                        }}
                        disabled={selectedItem.watched}
                    >
                        <Text style={[styles.textStyle, selectedItem.watched && styles.disabledButton]}>Watch</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonDelete]}
                        onPress={() => {
                        onDeleteBook(selectedItem.id);
                        }}
                    >
                        <Text style={styles.textStyle}>Delete</Text>
                    </Pressable>
                    </View>
                </View>
                </View>
            </Modal>

            <Modal animationType="fade" transparent={true} visible={addModal}>
                <View style={styles.modalMainView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Add new item</Text>
                    <View style={styles.addItemInputContainerModal}>
                    <TextInput
                        placeholder="Title"
                        style={styles.input}
                        onChangeText={onChangeItemName}
                        value={itemName}
                    />
                    <TextInput
                        placeholder="Genre"
                        style={styles.input}
                        onChangeText={onChangeItemGenre}
                        value={itemGenre}
                    />
                    </View>
                    <View style={styles.modalActions}>
                    <Pressable
                        style={[styles.button, styles.buttonDelete]}
                        onPress={() => closeAddItem()}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonAdd]}
                        onPress={() => {
                        addItem();
                        }}
                    >
                        <Text style={styles.textStyle}>Add</Text>
                    </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
        </View>
    );
}

    const styles = StyleSheet.create({
    screen: {
        paddingTop: 25,
        padding: 3,
        flex: 1,
        backgroundColor: "#DFB3F2"
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 35,
        color: "##3B0273",
        backgroundColor: "#9530D9",
        padding: 10
    },
    subtitle:{
        textAlign: 'center',
        width: '100%',
        fontSize: 20,
        color: '#3B0273',
        backgroundColor: "#9530D9",
        padding: 10
    },
    flatList: {
        borderTopColor: "#ccc",
        borderTopWidth: 1
    },
    addItemInputContainer: {
        margin: 15,
        justifyContent: "space-between",
        alignItems: "center",
    },
    addItemInputContainerModal: {
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        width: 200,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginTop: 10
    },
    itemContainer: {
        padding: 10,
        marginTop: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        backgroundColor:'white'
    },
    item: {
        padding: 10,
        textAlign: "start",
    },
    itemName: {
        fontSize: 20,
        fontWeight: "bold"
    },
    itemGenre: {
        fontSize: 15,
        color: "#999"
    },
    itemWatched: {
        fontSize: 15,
        color: "#1ab35e"
    },
    itemWatching: {
        fontSize: 15,
        color: "#2196f3"
    },
    modalMainView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalBody: {
        alignItems: "flex-start",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    modalBoldText: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        borderRadius: 10,
        padding: 10,
        width: '30%',
        textAlign: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonCancel: {
        backgroundColor: "#2196F3",
    },
    buttonAdd: {
        backgroundColor: "green",
    },
    disabledButton : {
        backgroundColor: "#ccc",
        color: "#c2c2c2",
    },
    buttonDelete: {
        backgroundColor: "#f44336",
    },
    buttonClose: {
        position: "absolute",
        right: 0,
        top: 10,
    },
    close: {
        backgroundColor: "#ccc",
    },
});