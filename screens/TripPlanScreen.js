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
import Spinner from "react-native-loading-spinner-overlay";
import moment from 'moment';
import Day from "../components/Day";
import {
  nullifyDuration,
  updatePlannedActivList,
  pushSizes,
  emptySizes,
  emptyActivities,
  updateTripperList,
  updateTempActiv,
  addDayPlan,
} from "../reducers/activ";
import { getRandomActivityByInput } from "../modules/slotMods";

export default function TripPlanScreen({ navigation }) {
  const activities = useSelector((state) => state.activ.value);
  const daysPlan = useSelector((state) => state.activ.activitiesSet);
  const fullActivArray = useSelector((state) => state.activ.cardActiv);

  console.log("TPS => fullActiv", fullActivArray);

  
  const dispatch = useDispatch();

  const { duration, start } = useSelector((state) => state.search.value);
  const [dayDuration, setDayDuration] = useState([]);

  useEffect(() => {
    const tempArray = [];
    const date = moment(start, "DDMMYYYY").toDate();
    console.log('date',start);
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
    console.log('temparray',tempArray);
    setDayDuration(tempArray);
    dispatch(updatePlannedActivList(tempArray));
    
  }, []);

  console.log("TPS => dayPlans", daysPlan);
  console.log('TimeOut Activities in TripPlanScreen', activities);


    const days = dayDuration.map((data, i) => {
      console.log(data);
      const date = `${data.day}/${data.month}/${data.year}`;
      return (
        <View key={i} title="Day Card" style={styles.dayContainer}>
         <Day day={i + 1} date={date} dayPlan={daysPlan[i]} i={i} activArray={fullActivArray[i]} />
        </View>
      )
    });
  

  const emptyArrays = () => {
    dispatch(emptySizes());
    dispatch(emptyActivities())
  };

  return (
    <View style={styles.planContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")} // Replace with the path to your image
          style={styles.image}
        />
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Plan your next Trip</Text>
      </View>
      <ScrollView>
        {days}
      </ScrollView>
      <View style={styles.nextContainer}>
      <Pressable onPress={() => {emptyArrays(), navigation.navigate("Home")}}>
          <View style={styles.cancel}>
            <Text style={{ color: "black" }}>CANCEL</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Planning")}
        >
          <View style={styles.confirm}>
            <Text style={{ color: "white" }}>CONFIRM</Text>
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
    fontSize: 30,
    backgroundColor: "white",
    maxWidth: "100%",
    flex: "flex-wrap",
    marginHorizontal: "5%",
    marginBottom: "2%",
    marginTop: "2%",
    textAlign: 'center'
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
