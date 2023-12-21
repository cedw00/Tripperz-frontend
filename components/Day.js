import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slot from "./Slot";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMorningValue,
  updateAfternoonValue,
  saveSizes,
  updateSizes,
  increaseMorning,
  increaseAfternoon,
  decreaseMorning,
  decreaseAfternoon,
  deleteMorningActivity
} from "../reducers/activ";

export default function Day(props) {
  const [morningSize, setMorningSize] = useState(2);
  const [afternoonSize, setAfternoonSize] = useState(4);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const dayDuration = useSelector((state) => state.activ.plannedValue);
  const activities = useSelector((state) => state.activ.value);
  const morningValue = useSelector((state) => state.activ.morningValue);
  const afternoonValue = useSelector((state) => state.activ.afternoonValue);
  const allSizes = useSelector((state) => state.activ.sizesArray);
  const daysPlan = useSelector((state) => state.activ.activitiesSet);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const dispatch = useDispatch();

  const morningPlan = daysPlan[props.i].slice(0, allSizes[props.i][0]);

  console.log('morningPlan', morningPlan)
  const morningActivities = morningPlan.map((data, index) => {
    console.log("morning", data);
    console.log('index', morningPlan.indexOf(data));

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Slot activity={data} key={index} dayPlan={props.dayPlan} i={props.i} />
        <Pressable onPress={() => {
          setDeleteModalVisible(true)
        }}>
          <FontAwesome
            name={"info-circle"}
            size={20}
            color={"#000000"}
            style={{ marginRight: "4%", marginTop: "35%" }}
          />
        </Pressable>
      </View>
    );
  });

  const afternoonPlan = daysPlan[props.i].slice(2, allSizes[props.i][1]);
  const afternoonActivities = afternoonPlan.map((data, index) => {
    console.log("afternoon", data);
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Slot activity={data} key={index} dayPlan={props.dayPlan} i={props.i} />
        <Pressable onPress={() => {setDeleteModalVisible(true)}}>
          <FontAwesome
            name={"info-circle"}
            size={20}
            color={"#000000"}
            style={{ marginRight: "4%", marginTop: "35%" }}
          />
        </Pressable>
      </View>
    );
  });
  

  console.log("DAY => allSizes", allSizes);

  const moreMorningActivity = () => {
    dispatch(increaseMorning(props.i));
  };

  const moreAfternoonActivity = () => {
    dispatch(increaseAfternoon(props.i));
  };

  const lessMorningActivity = () => {
    if (morningSize > 0) {
      dispatch(decreaseMorning(props.i));
    }
  };

  const lessAfternoonActivity = () => {
    if (afternoonSize > 0) {
      dispatch(decreaseAfternoon(props.i));
    }
  };

  return (
    <View style={styles.container}>
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
                Activity info
              </Text>
              {/* <Text style={styles.text}>Are you sure you want to delete this activity?</Text> */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible)
                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setDeleteModalVisible(!deleteModalVisible)
                }}
              >
                <Text style={styles.textStyle}>NO</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>
      </View>

      <View title="Day" style={styles.dayContainer}>
        <Text style={styles.dayTitle}>
          Day {props.day} - {props.date}
        </Text>
        <View title="halfDay" style={styles.morning}>
          <Text style={{ fontSize: 18, marginBottom: "2%" }}>Morning</Text>
          <View style={styles.daySlots}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>{morningActivities}</View>
            </ScrollView>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => moreMorningActivity()}>
                <FontAwesome
                  name="plus-square"
                  color="#067188"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
              <Pressable onPress={() => lessMorningActivity()}>
                <FontAwesome
                  name="minus-square"
                  color="black"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View title="halfDay" style={styles.afternoon}>
          <Text style={{ fontSize: 18, marginVertical: "2%" }}>Afternoon</Text>
          <View style={styles.daySlots}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View>{afternoonActivities}</View>
            </ScrollView>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => moreAfternoonActivity()}>
                <FontAwesome
                  name="plus-square"
                  color="#067188"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
              <Pressable onPress={() => lessAfternoonActivity()}>
                <FontAwesome
                  name="minus-square"
                  color="black"
                  size={25}
                  style={styles.plusIcon}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginTop: "2%",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#067188",
    fallback: {
      borderColor: "#fff", // Couleur de secours
    },
    borderRadius: "10%",
    paddingHorizontal: "2%",
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: +3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  container: {
    alignItems: "center",
  },
  dayTitle: {
    fontSize: 25,
    marginTop: "5%",
    color: "#067188",
  },
  morning: {
    alignItems: "center",
    maxHeight: 230,
    marginTop: "5%",
    marginBottom: "15%",
  },
  afternoon: {
    alignItems: "center",
    maxHeight: 230,
    marginTop: "5%",
    marginBottom: "15%",
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: "4%",
    paddingVertical: "2%",
  },
  plusIcon: {
    marginHorizontal: "3%",
  },
  daySlots: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "10%",
    maxHeight: 450,
    borderWidth: "1%",
    //paddingTop: "3%",
  },
  scrollView: {
    flexDirection: "column", // Organiser les éléments en colonnes
    alignItems: "center", // Centrer les éléments horizontalement
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  text: {
    color: "black",
    flexWrap: "wrap", // Permettre au texte de passer à la ligne
    wordWrap: "break-word",
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
