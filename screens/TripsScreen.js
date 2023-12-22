import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { createTripCard } from "../reducers/trips";
import { updateRefresh } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Constants from "expo-constants";
import {
  emptySizes,
  updateDayPlan,
  updateSizes,
  getTripDuration,
  getTripId,
} from "../reducers/activ";

const backend = Constants.expoConfig.hostUri.split(`:`)[0];

export default function TripsScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { token, refresh } = useSelector((state) => state.user.value);
  const tripCard = useSelector((state) => state.trips.cityCard);
  const myTrips = useSelector((state) => state.trips.value);
  const allSizes = useSelector((state) => state.activ.sizesArray);

  const [allTrips, setAllTrips] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [dataModalVisible, setDataModalVisible] = useState(false);
  const [id, setId] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const emptySizesArray = () => {
    dispatch(emptySizes());
  };

  useEffect(() => {
    if (refresh > 0) {
      (async () => {
        const response = await fetch(`https://tripperz-backend.vercel.app/trips/${token}`);
        const data = await response.json();
        if (data.trips.length > 0) {
          setAllTrips(data.trips);
        } else {
          setAllTrips([]);
        }
      })();
    }
  }, [trigger]);

  const handleDelete = async (id) => {
    console.log("id", id);
    const response = await fetch(
      `https://tripperz-backend.vercel.app/trips/${id}/${token}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (data.result) {
      setDeleteModalVisible(!deleteModalVisible);
      setTrigger(!trigger);
    } else {
      console.log(data.error);
    }
  };

  const handleUpdate = async (id) => {
    const response = await fetch(`https://tripperz-backend.vercel.app/trips/tripId/${id}`);
    console.log(0);
    const data = await response.json();
    console.log(4);
    if (data.result) {
      console.log(5);
      dispatch(getTripDuration(data.trip.dayDuration));
      dispatch(updateSizes(data.trip.allSizes));
      console.log("dataTripDD", data.trip.dayDuration);

      dispatch(updateDayPlan(data.trip.activitiesList));
      dispatch(getTripId(id));
      navigation.navigate("UpdateTrip");
    } else {
      console.log(data.error);
    }
  };

  const tripsData = allTrips.map((data, i) => {
    return (
      <SafeAreaView key={i}>
        <Pressable>
          <View style={styles.card}>
            <Image style={styles.tinyLogo} source={{ uri: data.tripImage }} />
            <View style={{flexDirection: 'column', marginRight: '40%'}}>
              <Text style={styles.itemtext}>{data.cityDest}</Text>
              <Text style={styles.durationText}>
                {data.startDate} - {data.endDate}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.iconContainer}>
          <Pressable>
            <FontAwesome
              name={"pencil"}
              size={20}
              color={"#000000"}
              onPress={() => {
                handleUpdate(data._id), setDataModalVisible(true);
              }}
            />
          </Pressable>
          <Pressable>
            <FontAwesome
              name={"trash-o"}
              size={20}
              color={"#000000"}
              onPress={() => {
                setId(data._id), setDeleteModalVisible(true);
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  });

  if (!isFocused) {
    dispatch(updateRefresh(0));
    return <View />;
  } else {
    if (refresh === 0) {
      console.log("focus");
      emptySizesArray();
      (async () => {
        const response = await fetch(`https://tripperz-backend.vercel.app/trips/${token}`);
        const data = await response.json();
        if (data.trips.length > 0) {
          setAllTrips(data.trips);
        } else {
          setAllTrips([]);
        }
      })();
      dispatch(updateRefresh(1));
    }
  }

  return (
    <View style={styles.planContainer}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setDeleteModalVisible(!deleteModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text} title="Switch title">
                Are you sure you want to delete this trip?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleDelete(id);
                }}
              >
                <Text style={styles.textStyle}>YES</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible);
                }}
              >
                <Text style={styles.textStyle}>NO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")} // Replace with the path to your image
          style={styles.image}
        />
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Your Trips</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {tripsData.length > 0 ? tripsData : <Text>No trips planned yet</Text>}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: "white",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
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
  titleBlock: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "white",
    maxWidth: "100%",
    flexWrap: "wrap",
    marginBottom: "2%",
  },
  title: {
    flex: 1,
    fontSize: 30,
    backgroundColor: "white",
    maxWidth: "100%",
    marginTop: "5%",
    textAlign: 'center'
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 15,
    backgroundColor: "white",
  },
  iconContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    borderColor: "#067188",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 1,
    marginBottom: "5%",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 280,
    width: 350,
    borderTopLeftRadius: '10%',
    borderTopRightRadius: '10%',
    overflow: "hidden",
    marginTop: "5%",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#067188",
  },
  tinyLogo: {
    borderWidth: 1,
    borderColor: "transparent",
    borderTopLeftRadius: '8%',
    borderTopRightRadius: '8%',
    resizeMode: "center",
    height: "80%",
    width: "100%",
    marginBottom: "3%",
  },
  itemtext: {
    width: "100%",
    fontWeight: 400,
    fontSize: 20,
  },
   durationText: {
    width: "100%",
    fontSize: 15,
  },
  bottom: {
    flex: 2.5,
    maxHeight: "9%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
    backgroundColor: "#067188",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    flexWrap: "wrap",
    textAlign: "center",
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
    marginTop: "80%",
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
});
