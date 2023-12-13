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
  updateActivString
} from "../reducers/activ";
import ModalSlot from "./ModalSlot";

export default function Slot(props) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activ.value);
  const thisMorning = useSelector((state) => state.activ.morningActiv);
  const thisAfternoon = useSelector((state) => state.activ.afternoonActiv);
  const activString = useSelector((state) => state.activ.tempActivString);
  const [modalVisible, setModalVisible] = useState(false);
  const [slotActivity, setSlotActivity] = useState(props.activity);
  const [updatedMorning, setUpdatedMorning] = useState([]);
  const [updateAfternoon, setUpdatedAfternoon] = useState([]);

  // INVERSE DATA FLOW MODALACTIVITY SWITCH

  const switchActivity = (act) => {
    console.log(`SWITCH : Switching ${slotActivity} with =>`, act);

    setSlotActivity(act);
    //dispatch(updateActivString(props.activity));
    dispatch(updateActivString(act));
    console.log("SLOT => String in switch activity", activString);
  };

  const saveSwitch = () => {
    const foundInMorning = thisMorning.find((e) => e === props.activity);
    const foundInAfternoon = thisAfternoon.find((e) => e === props.activity);
    if (foundInMorning) {
      console.log("SLOT => String in foundmorning", activString);
      dispatch(switchMorningActivity(slotActivity));
      console.log("SLOT => This Morning", thisMorning);
    } else if (foundInAfternoon) {
      console.log("SLOT => String in foundafternoon", activString);
      dispatch(switchAfternoonActivity(slotActivity));
      console.log("SLOT => This Afternoon", thisAfternoon);
    }
  }

  // MAPPING MODALACTIVITY
  const modalActivities = activities.map((data, index) => {
    return (
      <Pressable key={index}>
        <ModalSlot
          key={index}
          modalActivity={data}
          switchActivity={switchActivity}
          saveSwitch={saveSwitch}
        />
      </Pressable>
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
