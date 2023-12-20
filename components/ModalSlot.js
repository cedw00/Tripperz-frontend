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
import { switchMorningActivity, updateActivString } from "../reducers/activ";
import { useSelector, useDispatch } from "react-redux";

export default function ModalSlot(props) {
  const activString = useSelector((state) => state.activ.tempActivString);

  const dispatch = useDispatch();

  const selectActivity = () => {
    dispatch(updateActivString(props.modalActivity))
  };

 console.log("activString", activString);
 
 return (
      <Pressable onPress={() => selectActivity()} style={styles.cont}>
        <View style={styles.slotContainer}>
          <View style={styles.slotContent} title="Slot">
            <Text style={styles.text} title="Activity">
            {props.modalActivity}
            </Text>
          </View>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    flexWrap: "wrap", // Permettre au texte de passer à la ligne
    wordWrap: "break-word", // Éviter de couper les mots en milieu de mot
    textAlign: "center",
},
  cont: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginVertical: '5%',
    paddingVertical: '2%',
    paddingHorizontal: "20%", // Ajouter un padding pour l'espace intérieur
    backgroundColor: "#FFFFFF",
    borderRadius: "20%",
    maxHeight: '100%',
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
});
