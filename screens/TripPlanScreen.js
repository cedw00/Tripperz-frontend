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
import Day from "../components/Day";

export default function TripPlanScreen() {
  const [day, setDay] = useState([]);

  useEffect(() => {
    setDay(<Day />);
  }, []);

  return (
    <View title="Trip Plan" style={styles.planContainer}>
      {day}
    </View>
  );
}

const styles = StyleSheet.create({
  planContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});