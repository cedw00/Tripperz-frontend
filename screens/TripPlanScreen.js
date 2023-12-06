import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Day from "../components/Day";

export default function TripPlanScreen() {
  const [day, setDay] = useState([]);

  useEffect(() => {
    setDay(<Day />);
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View title="Trip Plan" style={styles.planContainer}>
          {day}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  planContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
