import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import PlannedSlot from "./PlannedSlot";
import { useSelector } from "react-redux";

export default function PlannedDay(props) {
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);

  const confirmedMorning = useSelector((state) => state.activ.morningActiv);
  const confirmedAfternoon = useSelector((state) => state.activ.afternoonActiv);
  const tempActivities = useSelector((state) => state.activ.tempActivities);

  useEffect(() => {
        const morningActivities = props.thisMorning.map((data, index) => {
      return <PlannedSlot activity={data} key={index} />;
    });
    setMorning(morningActivities);

    const afternoonActivities = props.thisAfternoon.map((data, index) => {
      return <PlannedSlot activity={data} key={index} />;
    });
    setAfternoon(afternoonActivities);

    // console.log("PLANNED DAY => morning", morningActivities);
    // console.log("PLANNED DAY => afternoon", afternoonActivities);
    // console.log(
    //   "PLANNED DAY => confMorn :",
    //   confirmedMorning,
    //   "confAfter :",
    //   confirmedAfternoon
    // );
  }, []);

  return (
    <View style={styles.container}>
      <View title="Day" style={styles.dayContainer}>
        <Text style={styles.dayTitle}>Day 1 - 01/01/2024</Text>
        <View title="halfDay" style={styles.morning}>
          <Text style={{ fontSize: 18, marginBottom: "2%" }}>Morning</Text>
          <View style={styles.daySlots}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>{morning}</View>
            </ScrollView>
          </View>
        </View>
        <View title="halfDay" style={styles.afternoon}>
          <Text style={{ fontSize: 18, marginVertical: "2%" }}>Afternoon</Text>
          <View style={styles.daySlots}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>{afternoon}</View>
            </ScrollView>
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