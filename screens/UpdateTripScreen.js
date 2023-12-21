import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import Day from "../components/Day";
import {
  emptySizes,
  emptyActivities,
  resetId,
} from "../reducers/activ";

export default function UpdateTripScreen({ navigation }) {
    const dayDuration = useSelector((state) => state.activ.tripDuration);
    const daysPlan = useSelector((state) => state.activ.activitiesSet);
    const id = useSelector((state) => state.activ.tripId);
    const allSizes = useSelector((state) => state.activ.sizesArray);
  
  const dispatch = useDispatch();

  console.log("TPS => dayPlans", daysPlan);

  useEffect(() => {
console.log('dayDuration in UTS', dayDuration)
  }, [])

    const days = dayDuration.map((data, i) => {
      const date = `${data.day}/${data.month}/${data.year}`;
      return (
        <View key={i} title="Day Card" style={styles.dayContainer}>
         <Day day={i + 1} date={date} dayPlan={daysPlan[i]} i={i} />
        </View>
      )
    });
  
    const handleUpdateTrip = async () => {
        const trip = {
            _id: id,
            activitiesList: daysPlan,
            allSizes: allSizes,
        }
        const response = await fetch(`https://tripperz-backend.vercel.app/trips/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trip),
        });
        const data = await response.json();
        if (data.result) {
          navigation.navigate("Trips");
          dispatch(emptyActivities());
          dispatch(emptySizes());
          dispatch(resetId());
        } else {
          console.log(data.error);
        }
      };

    const handleCancel = () => {
        navigation.navigate("Trips");
          dispatch(emptyActivities());
          dispatch(emptySizes());
          dispatch(resetId());
    }

  return (
    <View style={styles.planContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")} // Replace with the path to your image
          style={styles.image}
        />
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Update your Trip</Text>
      </View>
      <ScrollView>
        {days}
      </ScrollView>
      <View style={styles.nextContainer}>
      <Pressable onPress={() => {handleCancel()}}>
          <View style={styles.cancel}>
            <Text style={{ color: "black" }}>CANCEL</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => handleUpdateTrip()}
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
