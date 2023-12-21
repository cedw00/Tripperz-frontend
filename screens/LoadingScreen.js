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
import moment from "moment";
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
  // const [morningSize, setMorningSize] = useState(2);
  // const [afternoonSize, setAfternoonSize] = useState(4);
  // const[daySize, setDaySize] = useState([]);
  const activities = useSelector((state) => state.activ.value);
  const allSizes = useSelector((state) => state.activ.sizesArray);
  const daysPlan = useSelector((state) => state.activ.activitiesSet);
  const tripCard = useSelector((state) => state.trips.cityCard);

  const dispatch = useDispatch();

  const { duration, start } = useSelector((state) => state.search.value);
  const [dayDuration, setDayDuration] = useState([]);

  const [activitiesList, setActivitiesList] = useState([]);

  const allActivNames = [
    "restaurant",
    "park",
    "museum",
    "shopping_mall",
    "cafe",
    "bar",
    "movie_theater",
    "gym",
    "zoo",
    "landmark", // Landmarks (e.g., Eiffel Tower)
    "art_gallery", // Art galleries
    "library", // Libraries
    "aquarium", // Aquariums
    // 'church', // Churches
    // 'mosque', // Mosques
    // 'synagogue', // Synagogues
    "amusement_park", // Amusement parks
    "tourist_attraction", // Tourist attractions
    // Add more activities as needed
  ];
  const [spinner, setSpinner] = useState(false);
  let size = [2, 4];
  const PLACES_API_KEY = "********";

  useEffect(() => {
    setSpinner(true); // Activation du spinner au début de la fonction
    allActivNames.forEach((activity) => {
      fetchPlacesForActivity(activity);
    });

    setTimeout(() => {
      setSpinner(false);
      console.log("spinner is OFF, ACTIVITIES LIST", activitiesList);
      console.log("spinner is OFF, ACTIVITIES", activities);
    }, 6000);
  }, []);

  let actArray = [];
  const fetchPlacesForActivity = async (activity) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activity}+in+${tripCard.cityName}&key=${PLACES_API_KEY}`
    );
    const data = await res.json();
    const bestVenues = data.results.filter((venue) => venue.rating > 4.5);
    const places = bestVenues.slice(0, 100);
    places.forEach((place) => {
      const placeId = place.place_id;
      const name = place.name;
      const rating = place.rating || "N/A"; // If rating is undefined, show 'N/A'
      const address = place.formatted_address;
      const coordinates = place.geometry.location;
      const types = place.types;
      const openingHours = place.opening_hours
        ? place.opening_hours.weekday_text
        : "N/A";
      const photos = place.photos;
      //? place.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`) : [];
      const phoneNumber = place.formatted_phone_number || "N/A";
      const website = place.website || "N/A";
      const services = place.types.join(", ");
      const specialAttributes = place.plus_code
        ? place.plus_code.compound_code
        : "N/A"; // Example special attribute
      const popularity = place.user_ratings_total || "N/A";
      const serviceArea = place.formatted_address; // For demonstration purposes, using formatted_address as a placeholder for service area
      const attribution =
        "Conditions et exigences pour utiliser les données de Google Places API conformément aux conditions d'utilisation de Google.";

      // PUSHING EACH ACTIVITY IN THE TABLE
      actArray.push(name);

      console.log("Place ID:", placeId);
      console.log("Name:", name);
      console.log("Rating:", rating);
      console.log("Address:", address);
      console.log("Coordinates:", coordinates.lat, coordinates.lng);
      console.log("Types of Place:", types);
      // console.log('Opening Hours:', openingHours);
      console.log("Photos:", photos);
      console.log("Phone Number:", phoneNumber);
      console.log("Website:", website);
      // console.log('Services:', services);
      // console.log('Special Attributes:', specialAttributes);
      console.log("Popularity:", popularity);
      // console.log('Service Area:', serviceArea);
      // console.log('Attribution:', attribution);
      console.log("---------------------------------------");
    });
    console.log("\n");
    /*      .catch(error => {
        console.error('Error fetching data:', error);
      });*/
    setActivitiesList(actArray);
  };
  console.log("activitiesList", activitiesList);

  const flyButton = (
    <View style={styles.confirm}>
      <Pressable onPress={() => handleSearch()}>
        <Text style={{ color: "white" }}>
          Your planning is ready. LET'S FLY !
        </Text>
      </Pressable>
    </View>
  );

  const handleSearch = () => {
    for (let i = 0; i < duration + 1; i++) {
      const uniqueActivities = new Set();
      for (let j = uniqueActivities.size; j < 20; j++) {
        const randomActivity = getRandomActivityByInput(activitiesList);
        uniqueActivities.add(randomActivity);
        if (uniqueActivities.size >= 20) {
          break;
        }
      }
      let dayPlan = Array.from(uniqueActivities);
      dispatch(addDayPlan(dayPlan));

      const modalSet = new Set();
      for (let j = modalSet.size; j < 100; j++) {
        const randomActivity = getRandomActivityByInput(activitiesList);
        modalSet.add(randomActivity);
        if (modalSet.size >= 100) {
          break;
        }
      }
      let modalPlan = Array.from(uniqueActivities);
      dispatch(updateTempActiv(Array.from(modalPlan)));
    }

    for (let i = 0; i < duration + 1; i++) {
      dispatch(pushSizes(size));
    }
    navigation.navigate("TripPlan");
  };

  console.log("TPS => dayPlans", daysPlan);
  console.log("TimeOut Activities in Loading Page", activities);

  return (
    <View style={styles.planContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/logo.png")} // Replace with the path to your image
          style={styles.image}
        />
        <Spinner
          visible={spinner}
          textContent={"Give us some time to make your trip awesome !"}
          textStyle={{
            color: "white", // Changer la couleur du texte en blanc
            textAlign: "center", // Centrer le texte horizontalement
          }}
        />
        {!spinner ? flyButton : <View></View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  planContainer: {
    flex: 1,
    backgroundColor: "white",
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
});
