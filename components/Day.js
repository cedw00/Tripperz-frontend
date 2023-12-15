import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slot from "./Slot";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMorningValue,
  updateAfternoonValue,
  updateAfternoonSize,
  updateMorningSize,
  saveSizes,
  pushSizes
} from "../reducers/activ";

export default function Day(props) {
  const [morningSize, setMorningSize] = useState(props.morningSize);
  const [afternoonSize, setAfternoonSize] = useState(props.afternoonSize);
  const dayDuration = useSelector((state) => state.activ.plannedValue);
  const activities = useSelector((state) => state.activ.value);
  const morningValue = useSelector((state) => state.activ.morningValue);
  const afternoonValue = useSelector((state) => state.activ.afternoonValue);
  const sizes = useSelector((state) => state.activ.sizes);

  const dispatch = useDispatch();
  console.log('D => props.morningSize is', morningSize, 'in DAY', props.day);
  console.log('D => props.afternoonSize is', afternoonSize, 'in DAY', props.day);

  const morningPlan = props.dayPlan.slice(0, morningSize);
  const morningActivities = morningPlan.map((data, index) => {
    return <Slot activity={data} key={index} />;
  });

  const afternoonPlan = props.dayPlan.slice(2, afternoonSize);
  const afternoonActivities = afternoonPlan.map((data, index) => {
    return <Slot activity={data} key={index} />;
  });

 

  useEffect(() => {
    dispatch(saveSizes(morningSize, afternoonSize));
  }, [morningSize, afternoonSize]);

  useEffect(() => {
    return () => {
      console.log(sizes);
      props.savingSizes(sizes); // Appel de la fonction savingSizes au moment du démontage du composant 'Day'
    };
  }, []); // Le tableau de dépendances vide [] garantit l'exécution du code de nettoyage au démontage uniquement
  

  const moreMorningActivity = () => {
    setMorningSize(morningSize + 1);
  };

  const moreAfternoonActivity = () => {
    setAfternoonSize(afternoonSize + 1);
  };

  const lessMorningActivity = () => {
    if (morningSize > 0) {
      setMorningSize(morningSize - 1);
    } else {
      setMorningSize(1);
    }
  };

  const lessAfternoonActivity = () => {
    if (afternoonSize > 0) {
      setAfternoonSize(afternoonSize - 1);
    } else {
      setAfternoonSize(1);
    }
  };

  // const activateSaveSizes = () => {
  //   props.savingSizes(sizes);
  // }

  return (
    <View style={styles.container}>
      <View title="Day" style={styles.dayContainer}>
        <Text style={styles.dayTitle}>Day {props.day} - {props.date}</Text>
        <View title="halfDay" style={styles.morning}>
          <Text style={{ fontSize: 18, marginBottom: "2%" }}>Morning</Text>
          <View style={styles.daySlots}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>{morningActivities}</View>
            </ScrollView>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => moreMorningActivity()}>
                <FontAwesome
                  name="plus-square"
                  color="#067188"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
              <Pressable onPress={() => lessMorningActivity()}>
                <FontAwesome
                  name="minus-square"
                  color="black"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View title="halfDay" style={styles.afternoon}>
          <Text style={{ fontSize: 18, marginVertical: "2%" }}>Afternoon</Text>
          <View style={styles.daySlots}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>{afternoonActivities}</View>
            </ScrollView>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => moreAfternoonActivity()}>
                <FontAwesome
                  name="plus-square"
                  color="#067188"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
              <Pressable onPress={() => lessAfternoonActivity()}>
                <FontAwesome
                  name="minus-square"
                  color="black"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginTop: "2%",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#067188",
    fallback: {
      borderColor: "#fff", // Couleur de secours
    },
    borderRadius: "10%",
    paddingHorizontal: "5%",
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  container: {
    alignItems: "center",
  },
  dayTitle: {
    fontSize: 25,
    marginTop: "5%",
    color: "#067188",
  },
  morning: {
    alignItems: "center",
    maxHeight: 230,
    marginTop: "5%",
    marginBottom: "15%",
  },
  afternoon: {
    alignItems: "center",
    maxHeight: 230,
    marginTop: "5%",
    marginBottom: "15%",
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: "4%",
    paddingVertical: "2%",
  },
  plusIcon: {
    marginHorizontal: "3%",
  },
  daySlots: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "10%",
    maxHeight: 450,
    borderWidth: "1%",
    //paddingTop: "3%",
  },
  scrollView: {
    flexDirection: "column", // Organiser les éléments en colonnes
    alignItems: "center", // Centrer les éléments horizontalement
  },
});
