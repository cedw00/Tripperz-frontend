import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PlannedSlot(props) {

  return (
    <View style={styles.cont}>
        <View style={styles.slotContainer}>
          <View style={styles.slotContent} title="Slot">
            <Text style={styles.text} title="Activity" name={props.activity}>
              Going @ {props.activity}
            </Text>
          </View>
        </View>
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
