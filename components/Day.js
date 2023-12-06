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

export default function Day() {
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);

  useEffect(() => {
    // CREATION OF THREE ACTIV FOR A.M. AT COMPONENT INIT
    const newMorning = [];
    for (let i = 0; i < 3; i++) {
      newMorning.push(<Slot key={i} />);
    }
    setMorning(newMorning);

    // CREATION OF THREE ACTIV FOR P.M. AT COMPONENT INIT
    const newAfternoon = [];
    for (let i = 0; i < 3; i++) {
      newAfternoon.push(<Slot key={i} />);
    }
    setAfternoon(newAfternoon);
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  halfday: {
    width: "80%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  daySlots: {
    width: "80%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: "#eee",
  },
});
