import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  switchMorningActivity,
  switchAfternoonActivity,
  updateActivString,
  updateActivToSwitch,
  switchingActivity,
  updateActivList
} from "../reducers/activ";
import ModalSlot from "./ModalSlot";

export default function Slot(props) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activ.value);
  const thisMorning = useSelector((state) => state.activ.morningActiv);
  const thisAfternoon = useSelector((state) => state.activ.afternoonActiv);
  const activToChange = useSelector((state) => state.activ.activToSwitch);
  const tempActivSwitch = useSelector((state) => state.activ.tempActivString);
  const [modalVisible, setModalVisible] = useState(false);
  const [slotActivity, setSlotActivity] = useState(props.activity);
  const tempActivities = useSelector((state) => state.activ.tempActivities);
  const [updatedMorning, setUpdatedMorning] = useState([]);
  const [updateAfternoon, setUpdatedAfternoon] = useState([]);

  // MAPPING MODALACTIVITY
  const modalActivities = activities.map((data, index) => {
    return (
      <Pressable key={index}>
        <ModalSlot
          key={index}
          modalActivity={data}
        />
      </Pressable>
    );
  });

  // FUNCTION SAVING THE VALUE OF PROPS.ACTIVITY IN REDUX (ACTIVTOSWITCH)
  const prepareSwitch = () => {
    console.log('This activity might change', props.activity);
    dispatch(updateActivToSwitch(props.activity))
  };

   const executeSwitch = () => {
     console.log('This activity', activToChange, 'switched with', tempActivSwitch);
     dispatch(switchingActivity());
   }

  // REDUX CAPTURE OF PRESS ON HIDE MODAL 
  //TO SAVE INFO AND READ IT IN DAY COMPONENT


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
                onPress={() => {setModalVisible(!modalVisible), executeSwitch()}}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <Pressable onPress={() => {setModalVisible(true), prepareSwitch()}}>
        <View style={styles.slotContainer}>
          <View style={styles.slotContent} title="Slot">
            <Text style={styles.text} title="Activity" name={props.activity}>
              Going @ {slotActivity}
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
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  slotContainer: {
    maxWidth: "100%", // Largeur maximale du conteneur
  },
  slotContent: {
    maxWidth: "100%", // Largeur maximale du conteneur
  },
  text: {
    color: "black",
    flexWrap: "wrap", // Permettre au texte de passer à la ligne
    wordWrap: "break-word",
    textAlign: "center",
  },
  cont: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: 15,
    marginHorizontal: "10%",
    //borderWidth: 3, // Pour visualiser la zone du conteneur
    paddingHorizontal: "3%", // Ajouter un padding pour l'espace intérieur
    paddingVertical: "2%",
    backgroundColor: "white",
    borderRadius: "20%",
    maxHeight: "100%",
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  modalView: {
    maxHeight: "80%",
    width: "85%",
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
});
