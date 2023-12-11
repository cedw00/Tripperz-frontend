import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Item,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import SelectedList from "../components/HomePage/Destinations/SelectedList";

export default function ResultScreen({ navigation }) {
  const API_URL = "https://api.unsplash.com/search/photos";
  const API_KEY = "fvgvM9uXT8ssXYBvJizIKG51rXub6fRglrJYde76qXY";

  const countries = [
    { id: 1, name: "france", photo: "IMG" },
    { id: 2, name: "france", photo: "IMG" },
    { id: 3, name: "france", photo: "IMG" },
    { id: 4, name: "france", photo: "IMG" },
    { id: 5, name: "france", photo: "IMG" },
  ];

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  const handleSearch = () => {
    navigation.navigate('TripPlan')
  };

  const Item = (item) => (
    <Pressable onPress={() => handleSearch()}>
      <View style={styles.card}>
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );

  // const onCountrySelect = (data) => {
  //     console.log('country coming from select list',data)
  // }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Trippers</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => handleClickActivities()}
              style={styles.activities}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Activités</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleClickDestination()}
              style={styles.destination}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Destinations</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            style={styles.flatlist}
            data={countries}
            renderItem={({ item }) => <Item name={item.name} />}
            keyExtractor={(item) => item.id}
            initialNumToRender={3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor:
      "linear-gradient(180deg, #067188 0%, rgba(79, 141, 162, 0.744948) 99.99%, rgba(174, 179, 197, 0.41) 100%)",
    filter: "blur(2px)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "20%",
    width: "100%",
    backgroundColor:
      "linear-gradient(180deg, rgba(244, 244, 244, 0.0975) 82.29%, rgba(25, 25, 25, 0.25) 100%)",
  },

  title: {
    fontWeight: "bold",
    fontSize: 48,
    color: "blue",
    paddingLeft: "15%",
    paddingRight: "15%",
    bottom: "-25%",
  },
  buttons: {
    flexDirection: "row",
    paddingTop: "15%",
    top: 6,
  },

  activities: {
    boxSizing: "border-box",
    width: 131,
    height: 27,
    backgroundColor: "linear-gradient(180deg, #D9D9D9, 0%",
    borderColor: "#D6DBDC",
    borderRadius: 20,
    borderWidth: 1,
    marginRight: "5%",
  },
  textButton: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  destination: {
    boxSizing: "border-box",
    width: 131,
    height: 27,
    borderColor: "#D6DBDC",
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: "5%",
  },

  body: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    paddingBottom: "18%",
  },
  flatlist: {
    borderWidth: 1,
    width: "80%",
    marginTop: "5%",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: 206,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: "3%",
  },
});
