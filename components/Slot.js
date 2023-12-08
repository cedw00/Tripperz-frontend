import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

export default function Slot(props) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("SLOT => props.activity", props.activity);
  }, []);

  return (
    <View style={styles.cont}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.slotContainer}>
          <View style={styles.slotContent} title="Slot">
            <Text style={styles.text} title="Activity">
              {props.activity}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  slotContainer: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 600, // Largeur maximale du conteneur
    backgroundColor: "lightblue",
  },

  text: {
    color: "black",
    flexWrap: "wrap", // Permettre au texte de passer à la ligne
    wordWrap: "break-word", // Éviter de couper les mots en milieu de mot
    textAlign: "center",
  },
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 20,
    paddingVertical: 5,
    marginVertical: 8,
    backgroundColor: "black",
    borderWidth: 3, // Pour visualiser la zone du conteneur
    paddingHorizontal: "3%", // Ajouter un padding pour l'espace intérieur
    backgroundColor: "lightblue",
    borderRadius: "10%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
