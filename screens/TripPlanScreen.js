import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Day from "../components/Day";

export default function TripPlanScreen() {
  const [day, setDay] = useState([]);

  useEffect((i) => {
    setDay(<Day key={i} />);
  }, []);

  return (
    <View style={styles.planContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/tripperz-logo/trippng.png")} // Replace with the path to your image
          style={styles.image}
        />
      </View>
      <Text style={styles.titleContainer}>Plan your next Trip</Text>
      <ScrollView>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
      </ScrollView>
      <View style={styles.nextContainer}>
        <Text style={{color: 'white'}}>CONFIRM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  planContainer: {
    flex: 11,
    backgroundColor: "white",
  },
  dayContainer: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 80
  },
  titleContainer: {
    flex: 1,
    fontSize: 50,
    backgroundColor: "white",
    maxWidth: "100%",
    flex: "flex-wrap",
    marginHorizontal: "5%",
  },
  nextContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#067188",
    paddingVertical: "8%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#067188",
    paddingTop: "15%",
    paddingBottom: "8%",
  },
  image: {
    width: 150, // Adjust the width of the image as needed
    height: 150, // Adjust the height of the image as needed
    resizeMode: "contain", // Choose the resize mode for the image
  },
});
