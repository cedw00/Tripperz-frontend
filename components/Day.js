import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slot from "./Slot";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMorningValue,
  updateAfternoonValue,
  saveSizes,
  updateSizes,
  increaseMorning,
  increaseAfternoon,
  decreaseMorning,
  decreaseAfternoon
} from "../reducers/activ";

export default function Day(props) {
  const [morningSize, setMorningSize] = useState(2);
  const [afternoonSize, setAfternoonSize] = useState(4);
  const dayDuration = useSelector((state) => state.activ.plannedValue);
  const activities = useSelector((state) => state.activ.value);
  const morningValue = useSelector((state) => state.activ.morningValue);
  const afternoonValue = useSelector((state) => state.activ.afternoonValue);
  const allSizes = useSelector((state) => state.activ.sizesArray);
 

  //const allSizes = useSelector((state) => state.activ.sizes);

  const dispatch = useDispatch();
  // console.log('D => morningSize is', props.morning, 'in DAY', props.day);
  // console.log('D => afternoonSize is', props.afternoon, 'in DAY', props.day);
  

  const morningPlan = props.dayPlan.slice(0, allSizes[props.i][0]);
  const morningActivities = morningPlan.map((data, index) => {
    return <Slot activity={data} key={index} />;
  });

  const afternoonPlan = props.dayPlan.slice(2, allSizes[props.i][1]);
  const afternoonActivities = afternoonPlan.map((data, index) => {
    return <Slot activity={data} key={index} />;
  });

  useEffect(() => {
    // dispatch(updateMorningValue(morningSize));
    // dispatch(updateAfternoonValue(afternoonSize));
    // setMorningSize(morningSize);
    // setAfternoonSize(afternoonSize);
    // dispatch(updateSizes(props.i, morningSize, afternoonSize));

  }, [allSizes[props.i][0], allSizes[props.i][1]]);

  console.log('DAY => allSizes', allSizes)

  const moreMorningActivity = () => {
    // setMorningSize(morningSize + 1);
    // dispatch(updateSizes(props.i, morningSize, afternoonSize));
    dispatch(increaseMorning(props.i))
  };

  const moreAfternoonActivity = () => {
    // setAfternoonSize(afternoonSize + 1);
    // dispatch(updateSizes(props.i, morningSize, afternoonSize));
    dispatch(increaseAfternoon(props.i))
  };

  const lessMorningActivity = () => {
    if (morningSize > 0) {
      // setMorningSize(morningSize - 1);
      // dispatch(updateSizes(props.i, morningSize, afternoonSize));
      dispatch(decreaseMorning(props.i))
    // } else {
    //   setMorningSize(1);
    //   dispatch(updateSizes(props.i, morningSize, afternoonSize));
    }
  };

  const lessAfternoonActivity = () => {
    if (afternoonSize > 0) {
      // setAfternoonSize(afternoonSize - 1);
      // dispatch(updateSizes(props.i, morningSize, afternoonSize));
      dispatch(decreaseAfternoon(props.i))
    // } else {
    //   setAfternoonSize(1);
    //   dispatch(updateSizes(props.i, morningSize, afternoonSize));
    }
  };

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
