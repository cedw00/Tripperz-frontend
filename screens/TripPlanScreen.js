import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import moment from 'moment';
import Day from "../components/Day";
import {
  nullifyDuration
} from "../reducers/activ";

export default function TripPlanScreen({ navigation }) {
  const activities = useSelector((state) => state.activ.value);
  
  const dispatch = useDispatch();

  const { duration, start } = useSelector((state) => state.search.value);
  const [dayDuration, setDayDuration] = useState([]);

  useEffect(() => {
    const tempArray = [];
    const date = moment(start, "DDMMYYYY").toDate();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    for (let i = 0; i < duration + 1; i++) {
      const newDate = new Date();
      newDate.setDate(day + i)
      newDate.setMonth(newDate.getMonth(), day + i);
      newDate.setFullYear(year, month, day + i);
      const obj = {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      } 
      tempArray.push(obj);
    }
    setDayDuration(tempArray)
  }, [])
  
  const myMorning = tempActivities.slice(0, sizeOfMorning);
  const myAfternoon = tempActivities.slice(4, sizeOfAfternoon);

  const stockActivities = () => {
    dispatch(updateMorningActiv(myMorning));
    dispatch(updateAfternoonActiv(myAfternoon));
  };

  const durationToNull = () => {
    dispatch(nullifyDuration());
  };
  
  console.log("TPS => day", activities);

  const days = dayDuration.map((data, i) => {
    const date = `${data.day}/${data.month}/${data.year}`;
    return (
      <View key={i} title="Day Card" style={styles.dayContainer}>
        <Day stockActivities={stockActivities} day={i + 1} date={date}/>
      </View>
    )
  })

  return (
    <View style={styles.planContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/tripperz-logo/trippng.png")} // Replace with the path to your image
          style={styles.image}
        />
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Plan your{"\n"}next Trip</Text>
      </View>
      <ScrollView>
        {days}
      </ScrollView>
      <View style={styles.nextContainer}>
        <Pressable
          onPress={() => navigation.navigate("Planning")}
        >
          <View style={styles.confirm}>
            <Text style={{ color: "white" }}>CONFIRM</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {durationToNull(), navigation.navigate("Result")}}>
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
  title: {
    flex: 1,
    fontSize: 50,
    backgroundColor: "white",
    maxWidth: "100%",
    flex: "flex-wrap",
    marginHorizontal: "5%",
    marginBottom: "2%",
    marginTop: "1%",
  },
  titleBlock: {
    flex: 1,
    fontSize: 50,
    backgroundColor: "white",
    maxWidth: "100%",
    flex: "flex-wrap",
    marginBottom: "2%",
  },
  nextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: "6%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
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
    borderWidth: 2,
    backgroundColor: "#067188",
    paddingHorizontal: "6%",
    paddingVertical: "4%",
    borderRadius: "10%",
    borderStyle: "solid",
    borderColor: "#067188",
    fallback: {
      borderColor: "#067188", // Couleur de secours
    },
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  cancel: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "white",
    paddingHorizontal: "6%",
    paddingVertical: "4%",
    borderRadius: "10%",
    borderStyle: "solid",
    borderColor: "#067188",
    fallback: {
      borderColor: "#067188", // Couleur de secours
    },
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
});
