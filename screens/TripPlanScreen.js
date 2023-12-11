import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import Day from "../components/Day";

export default function TripPlanScreen({ navigation }) {
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
        <Pressable onPress={() => navigation.navigate("Planning")}>
          <View style={styles.confirm}>
            <Text style={{ color: "black" }}>CONFIRM</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <View style={styles.cancel}>
            <Text style={{ color: "black" }}>CANCEL</Text>
          </View>
        </Pressable>
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
    marginBottom: 80,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#067188",
    paddingVertical: "6%",
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
  confirm: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    backgroundColor: 'lightblue',
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    borderRadius: '10%'
  },
  cancel: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    backgroundColor: '#eee',
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    borderRadius: '10%'
  }
});
