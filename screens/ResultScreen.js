import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Item,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  updateActivList,
  getTripDuration,
  updateTempActiv,
  addDayPlan,
  pushSizes,
} from "../reducers/activ";
import { createTripCard } from "../reducers/trips";
import { useDispatch, useSelector } from "react-redux";
import { getRandomActivityByInput } from "../modules/slotMods";
import Constants from 'expo-constants';
import { addCountry } from '../reducers/search';
import { addCity } from '../reducers/search';



const backend = Constants.expoConfig.hostUri.split(`:`)[0]


export default function ResultScreen({ navigation }) {
 
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

  const dispatch = useDispatch();

  const [searchCountry, setSearchCountry] = useState("");
  const { country } = useSelector((state) => state.search.value);
  const { city } = useSelector((state) => state.search.value);
  const { cityList } = useSelector((state) => state.search.value);
  const { countryList } = useSelector((state) => state.search.value);
  const { duration } = useSelector((state) => state.search.value);
  const tripCard = useSelector((state) => state.trips.cityCard);

  let size = [2, 4];
  const PLACES_API_KEY = process.env.PLACES_API_KEY;
  const [cityAPI, setCityAPI] = useState("");

  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      // fetch(`http://192.168.10.155:3000/countries/Allcountries`)
      //   .then(response => response.json())
      //   .then(data => {
      //      delay(500);
      //     //const item = { name: data.countries.name, image: data.countries.img, key: data.results[0].id };
      //     newItemsToDisplay=data.countries;
      //     console.log('new items to display',newItemsToDisplay)
      //   }).then(() => {
      //     setItemsToDisplay(newItemsToDisplay);
      //   })
      let newItemsToDisplay = [];
      if (city === null) {
        const data = {
          country,
        };
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        fetch(`http://${backend}:3000/countries/cities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            delay(1000);
            setItemsToDisplay(data.cities)
             
          })
      } else  if (city.length > 0){
      
        const data = {
          country,
          city,
        };
        fetch(`http://${backend}:3000/countries/city`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            newItemsToDisplay.push(data.city);
            setItemsToDisplay(newItemsToDisplay);
          });
      }
    };

    fetchData();
    allActivNames.forEach((activity) => {
      fetchPlacesForActivity(activity);
    });
  }, [navigation]);

  let actArray = [];
  const fetchPlacesForActivity = async (activity) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activity}+in+${city}&key=${PLACES_API_KEY}`
    );
    const data = await res.json();
    const bestVenues = data.results.filter((venue) => venue.rating > 4);
    const places = bestVenues.slice(0, 50);
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
      console.log('Coordinates:', coordinates.lat, coordinates.lng);
      console.log("Types of Place:", types);
      // console.log('Opening Hours:', openingHours);
      console.log("Photos:", photos);
      console.log('Phone Number:', phoneNumber);
      console.log('Website:', website);
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
      for (let j = modalSet.size; j < 40; j++) {
        const randomActivity = getRandomActivityByInput(activitiesList);
        modalSet.add(randomActivity);
        if (modalSet.size >= 40) {
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

  const checkItem = (element) => {
    console.log(element.name, "picture:", element.image);
    console.log("name:", element.name);
    dispatch(createTripCard(element));
  };
  console.log("RS => This might be your next destination:", tripCard);
  const Item = (item) => (
    <Pressable
      onPress={() => {
        handleSearch(), checkItem(item);
      }}
      key={item.key}
    >
      <View style={styles.card}>
        <Image style={styles.tinyLogo} source={{ uri: item.image }} />
        <Text style={styles.itemtext}>{item.name}</Text>
      </View>
    </Pressable>
  );
  //ON CLICK ACTIVITIES

  const handleClickActivities = () => {
    navigation.navigate("Home");
  };

  //ON CLICK Destinations
  const handleClickDestination = () => {
    dispatch(addCountry(''));
    dispatch(addCity(''));
    navigation.navigate('Home')
  
  };


  
    
  // if (!isFocused) {
  //   dispatch(addCountry(''));
  //   dispatch(addCity(''));
  //   console.log('country',country)
  // }
  console.log('is focused',country)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => handleClickActivities()}
              style={styles.activities}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Activities</Text>
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
            data={itemsToDisplay}
            renderItem={({ item }) => {
              return (
                <Item name={item.name} image={item.cityImg} key={item._id} />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    filter: "blur(2px)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "23%",
    width: "100%",
    backgroundColor: "rgba(6, 113, 136, 1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    paddingLeft: '15%',
    paddingRight: '15%',
    top: '25%',
    resizeMode:'contain',
    width: '40%',
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
    width: "90%",
    marginTop: "10%",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 195,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    marginBottom: "5%",
  },
  tinyLogo: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    resizeMode: "center",
    height: "80%",
    width: "100%",
  },
  itemtext: {
    width: "100%",
    height: "20%",
    textAlignVertical: "center",
    paddingLeft: "10%",
    fontWeight: "bold",
    fontSize: 20,
  },
});
