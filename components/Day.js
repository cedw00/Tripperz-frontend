import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slot from "./Slot";
import {
  getUniqueElements,
} from "../modules/slotMods";
import { useDispatch, useSelector } from "react-redux";


export default function Day() {
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);
  const [day, setDay] = useState([])
  const activities = useSelector((state) => state.activ.value);

  useEffect(() => {
    setDay(activities);
    console.log('day', day);
    // CREATION OF THREE ACTIV FOR A.M. AT COMPONENT INIT
    const newMorning = [];
    for (let i = 0; i < 4; i++) {
      newMorning.push(<Slot key={i} />);
    }
    const filteredMorning = getUniqueElements(newMorning, 4);
    setMorning(filteredMorning);

    // CREATION OF THREE ACTIV FOR P.M. AT COMPONENT INIT
    const newAfternoon = [];
    for (let i = 0; i < 4; i++) {
      newAfternoon.push(<Slot key={i} />);
    };
    const filteredAfternoon = getUniqueElements(newAfternoon, 4);
    setAfternoon(filteredAfternoon);
  }, []);

  return (
    <View title="Day" style={styles.dayContainer}>
      <View title="halfDay" style={styles.halfday}>
        <Text>A.M.</Text>
        <View style={styles.daySlots}>{morning}</View>
        <FontAwesome name="plus" color="black" />
      </View>
      <View title="halfDay" style={styles.halfday}>
        <Text>P.M.</Text>
        <View style={styles.daySlots}>{afternoon}</View>
        <FontAwesome name="plus" color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginTop: 200,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  halfday: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  daySlots: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#eee",
  },
});
