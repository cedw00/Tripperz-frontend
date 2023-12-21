import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PlannedDay from "../components/PlannedDay";
import { updateTripperList } from "../reducers/tripper";
import { updateNextTrips } from "../reducers/trips";
import { emptySizes, emptyActivities } from "../reducers/activ";
import Constants from 'expo-constants';

const backend = Constants.expoConfig.hostUri.split(`:`)[0]

export default function TripPlanScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [otherTripperz, setOtherTripperz] = useState("");

  const { token } = useSelector((state) => state.user.value);
  const { start, end, country } = useSelector((state) => state.search.value);
  const { value } = useSelector((state) => state.activ);

  const tripperz = useSelector((state) => state.tripper.value);
  const myTrips = useSelector((state) => state.trips.value);
  const tripCard = useSelector((state) => state.trips.cityCard);
  const dayDuration = useSelector((state) => state.activ.plannedValue);
  const daysPlan = useSelector((state) => state.activ.activitiesSet);
  const allSizes = useSelector((state) => state.activ.sizesArray);

  console.log("PS => AllSizes", allSizes);

  const dispatch = useDispatch();

  const handleTextChange = (newText) => {
    setOtherTripperz("  @" + newText);
  };

  const inviteTripperz = () => {
    dispatch(updateTripperList(otherTripperz));
    setOtherTripperz("");
  };

  console.log("PS => This might be your next destination:", tripCard);
  const confirmItem = () => {
    dispatch(updateNextTrips());
  };
  console.log("PS => These are your next destination:", myTrips);

  const days = dayDuration.map((data, i) => {
    console.log(data);
    const date = `${data.day}/${data.month}/${data.year}`;
    return (
      <View key={i} title="Day Card" style={styles.dayContainer}>
        <PlannedDay day={i + 1} date={date} dayPlan={daysPlan[i]} i={i} />
      </View>
    );
  });


  const handleConfirm = async () => {
    const activities = [];
    for (const activity of value) {
      activities.push({
        name: activity,
        type: 'Test',
        address: `${tripCard.cityName} at ${country}`
      });
    }
    console.log(activities);
    const trip = {
      token: token,
      start: start,
      end: end,
      countryDest: country,
      cityDest: tripCard.cityName,
      img: tripCard.cityImage,
      activitiesList: activities
    };
    const response = await fetch(`http://${backend}:3000/trips/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });
    const data = await response.json();
    if (data.result) {
      confirmItem();
      navigation.navigate("DrawerNavigator", { screen: 'Trips' });
      emptyArrays();
    } else {
      console.log(data.error);
    }

  };


  const emptyArrays = () => {
    dispatch(emptySizes());
    dispatch(emptyActivities())
  };


  return (
    <View style={styles.planContainer}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text} title="Switch title">
                Invite your friends
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  text={otherTripperz}
                  onChangeText={handleTextChange}
                  placeholder="Invite other Tripperz"
                  placeholderTextColor="#999"
                  style={styles.input}
                ></TextInput>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible), inviteTripperz()
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/tripperz-logo/trippng.png")} // Replace with the path to your image
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Your{"\n"}Planning</Text>
      <View style={styles.inviteContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={styles.inviteBtn}>
            <Text style={{ color: "black" }}>INVITE TRIPPERZ</Text>
          </View>
        </Pressable>
        <View>
          <Text style={{ color: "black" }}>
            {tripperz.length > 0 ? (
              "Invited Tripperz : " + tripperz
            ) : (
              <View></View>
            )}
          </Text>
        </View>
      </View>
      <ScrollView>{days}</ScrollView>
      <View style={styles.nextContainer}>
        <Pressable onPress={() => {navigation.navigate("TripPlan")}}>
          <View style={styles.cancel}>
            <Text style={{ color: "black" }}>CANCEL</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {handleConfirm()}}
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
  inviteContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1%",
  },
  inviteBtn: {
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    backgroundColor: "lightblue",
    paddingHorizontal: "6%",
    paddingVertical: "2%",
    borderRadius: "10%",
    maxWidth: "80%",
    marginVertical: "2%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    maxHeight: "80%",
    width: "85%",
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "black",
    flexWrap: "wrap", // Permettre au texte de passer à la ligne
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    marginTop: 15,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    color: "#333", // Couleur du texte saisi
  },
});
