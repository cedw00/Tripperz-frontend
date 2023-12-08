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
    <SafeAreaView>
      <ScrollView>
        <View title="Trip Plan" style={styles.planContainer}>
          {day}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  planContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});
