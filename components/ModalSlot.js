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
import { switchMorningActivity } from "../reducers/activ";

export default function ModalSlot(props) {
    const modalActRef = useRef("");

  const selectActivity = () => {
    modalActRef.current = props.modalActivity;
    props.switchActivity(modalActRef.current);
    props.saveSwitch();
    //dispatch(switchMorningActivity(props.slotActivity))
  };

  return (
    <View style={styles.cont}>
      <Pressable onPress={() => selectActivity()}>
        <View style={styles.slotContainer}>
          <View style={styles.slotContent} title="Slot">
            <Text style={styles.text} title="Activity">
            {props.modalActivity || 'No Activity'}
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
    borderWidth: 3, // Pour visualiser la zone du conteneur
    paddingHorizontal: "20%", // Ajouter un padding pour l'espace intérieur
    backgroundColor: "lightyellow",
    borderRadius: "10%",
    maxHeight: '100%',
  },
});
