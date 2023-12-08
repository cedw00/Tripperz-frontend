import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import ModalSlot from "./ModalSlot";

export default function Slot(props) {
  const activities = useSelector((state) => state.activ.value);
  const [modalVisible, setModalVisible] = useState(false);

  //const otherActivities = activities.filter((activ) => activ < activities[7]);
  //   const modalActivities = otherActivities.map((data, index) => {
  //     return <ModalSlot key={index} activity={data} />;
  //   });

  // INVERSE DATA FLOW MODALACTIVITY SWITCH
  const switchActivity = (name, modalActivity) => {
    console.log(`SWITCH : Switching ${name} with =>`, modalActivity);
  };

  // MAPPING MODALACTIVITY

  const modalActivities = activities.map((data, index) => {
    return (
      <ModalSlot
        key={index}
        modalActivity={data}
        switchActivity={switchActivity}
      />
    );
  });

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
              <Text style={styles.text} title="Switch title">
                SWITCH DEFAULT ACTIVITY
              </Text>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {modalActivities}
              </ScrollView>
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
            <Text style={styles.text} title="Activity" name={props.activity}>
              Going @ {props.activity}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "column", // Organiser les éléments en colonnes
    alignItems: "center", // Centrer les éléments horizontalement
    paddingVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderWidth: 3, // Pour visualiser la zone du conteneur
    paddingHorizontal: "3%", // Ajouter un padding pour l'espace intérieur
    backgroundColor: "lightblue",
    borderRadius: "10%",
  },
  modalView: {
    maxHeight: "80%",
    width: "85%",
    margin: 20,
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 35,
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
    marginTop: 15,
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
    maxHeight: "20%",
    maxWidth: "30%",
  },
});
