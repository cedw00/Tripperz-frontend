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
import HomeScreen from "./HomeScreen";
import Destinations from "../components/HomePage/Destinations/Destinations";

export default function ResultScreen({ navigation }) {
  const activitiesList = [
    {
      shoppingPlaces: [
        {
          name: "The Dubai Mall",
          address: "Financial Center Rd, Downtown Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "31166",
        },
        {
          name: "Mall of the Emirates",
          address: "Sheikh Zayed Rd, Al Barsha 1",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "28399",
        },
        {
          name: "IBN Battuta Mall",
          address: "Sheikh Zayed Rd, Jebel Ali Village",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "7631",
        },
        {
          name: "Dubai Marina Mall",
          address: "Sheikh Zayed Rd, Dubai Marina",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "213083",
        },
        {
          name: "City Centre Deira",
          address: "8th St, Port Saeed",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "9440",
        },
        {
          name: "Dubai Festival City Mall",
          address: "Crescent Rd, Dubai Festival City",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "54321",
        },
        {
          name: "The Outlet Village",
          address: "Sheikh Zayed Rd, Jebel Ali",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "87654",
        },
        {
          name: "Mercato Shopping Mall",
          address: "Jumeirah Beach Rd, Jumeirah 1",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "23456",
        },
        {
          name: "Dubai Outlet Mall",
          address: "Dubai-Al Ain Rd, Dubai Outlet City",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "78901",
        },
        {
          name: "Dragon Mart",
          address: "Al Awir Rd, International City",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "210987",
        },
      ],
    },
    {
      restaurants: [
        {
          name: "Nusr-Et Steakhouse",
          address: "The Address Downtown, Sheikh Mohammed bin Rashid Blvd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "123234",
        },
        {
          name: "Pierchic",
          address: "Al Qasr at Madinat Jumeirah, Jumeira Rd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "75157",
        },
        {
          name: "Zuma",
          address: "Gate Village 06, DIFC",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "506620",
        },
        {
          name: "TOMO Japanese Restaurant",
          address: "Raffles Dubai, Sheikh Rashid Rd, Wafi City",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "125511",
        },
        {
          name: "At.mosphere",
          address: "Burj Khalifa, Downtown Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "122830",
        },
        {
          name: "La Serre Bistro & Boulangerie",
          address: "Vida Downtown, Sheikh Mohammed Bin Rashid Blvd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "456789",
        },
        {
          name: "Eauzone",
          address:
            "One&Only Royal Mirage, King Salman Bin Abdulaziz Al Saud St",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "987012",
        },
        {
          name: "Armani/Ristorante",
          address: "Armani Hotel Dubai, Mohammed Bin Rashid Blvd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "345678",
        },
        {
          name: "Perry & Blackwelder's",
          address: "Souk Madinat Jumeirah, Jumeirah Rd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "701234",
        },
        {
          name: "The Maine Oyster Bar & Grill",
          address: "DoubleTree by Hilton Hotel Dubai - Jumeirah Beach",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "890123",
        },
      ],
    },
    {
      culturePlaces: [
        {
          name: "Dubai Museum",
          address: "Al Fahidi St, Al Fahidi Fort",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "234234",
        },
        {
          name: "Jumeirah Mosque",
          address: "Jumeirah Beach Road",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "123321",
        },
        {
          name: "Dubai Opera",
          address: "Sheikh Mohammed bin Rashid Blvd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "876543",
        },
        {
          name: "Al Fahidi Historical Neighbourhood",
          address: "Al Fahidi St, Bur Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "543210",
        },
        {
          name: "The Dubai Frame",
          address: "Zabeel Park, Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "987654",
        },
        {
          name: "Dubai Creek",
          address: "Port Saeed Road",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "345678",
        },
        {
          name: "Al Mamzar Beach Park",
          address: "Al Mamzar Beach",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "901234",
        },
      ],
    },
    {
      landscapes: [
        {
          name: "Palm Jumeirah",
          address: "Palm Jumeirah Island",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "567890",
        },
        {
          name: "Dubai Desert Conservation Reserve",
          address: "Al Maha, Dubai Desert",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "876543",
        },
        {
          name: "Al Marmoom Desert Conservation Reserve",
          address: "Al Ain Rd, Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "876543",
        },
        {
          name: "Dubai Marina Beach",
          address: "Dubai Marina",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "543210",
        },
        {
          name: "Ras Al Khor Wildlife Sanctuary",
          address: "Ras Al Khor",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "987654",
        },
        {
          name: "The Green Planet",
          address: "City Walk, Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "345678",
        },
        {
          name: "Dubai Water Canal",
          address: "Business Bay, Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "901234",
        },
      ],
    },
    {
      sportActivities: [
        {
          name: "Ski Dubai",
          address: "Mall of the Emirates, Sheikh Zayed Rd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "987654",
        },
        {
          name: "Dubai Autodrome",
          address: "MotorCity, Sheikh Mohammed Bin Zayed Rd",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "345678",
        },
        {
          name: "Dubai Ice Rink",
          address: "The Dubai Mall, Downtown Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "876543",
        },
        {
          name: "Kite Beach",
          address: "Jumeirah Beach Road",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "543210",
        },
        {
          name: "Dubai Kartdrome",
          address: "Sheikh Zayed Rd, Motor City",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "987654",
        },
        {
          name: "Al Nasr Leisureland",
          address: "Oud Metha Rd, Dubai",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "345678",
        },
        {
          name: "Dubai Sports City",
          address: "Dubai Land",
          city: "Dubai",
          country: "United Arab Emirates",
          postcode: "901234",
        },
      ],
    },
  ];
  const allActivNames =
    "shopping restaurants culturePlaces landscapes sportActivities";
  let size = [2, 4];
  const allSizes = useSelector((state) => state.activ.sizesArray);
  const dispatch = useDispatch();

  const API_URL = "https://api.unsplash.com/search/photos";
  const API_KEY = "fvgvM9uXT8ssXYBvJizIKG51rXub6fRglrJYde76qXY";

  // const country = 'France';
  // const city = ['paris', 'rome', 'tunis'];

  const [searchCountry, setSearchCountry] = useState("");

  const { country } = useSelector((state) => state.search.value);
  const { city } = useSelector((state) => state.search.value);
  const { cityList } = useSelector((state) => state.search.value);
  const { countryList } = useSelector((state) => state.search.value);
  const { duration } = useSelector((state) => state.search.value);
  const tripCard = useSelector((state) => state.trips.cityCard);

  const [itemsToDisplay, setItemsToDisplay] = useState([]);

  console.log("country", country);
  console.log("city list", cityList);
  useEffect(() => {
    const fetchData = async () => {
      switch (country.length) {
        case 0:
          let newItemsToDisplay = [];

          for (let i = 0; i < 5; i++) {
            fetch(
              `https://api.unsplash.com/search/photos?query=${countryList[i].value}&page=1&per_page=1&client_id=${API_KEY}`
            )
              .then((response) => response.json())
              .then((data) => {
                const item = {
                  name: countryList[i].value,
                  image: data.results[0].urls.raw,
                  key: data.results[0].id,
                };
                newItemsToDisplay.push(item);
              })
              .then(() => {
                setItemsToDisplay(newItemsToDisplay);
              });
          }
          break;

        default:
          newItemsToDisplay = [];
          if (city === null) {
            for (let i = 0; i < cityList[i].length; i++) {
              console.log("city lis de i", cityList[i]);

              fetch(
                `https://api.unsplash.com/search/photos?query=${cityList[i]}&page=1&per_page=1&client_id=${API_KEY}`
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log("data", data.results[0].urls.raw);

                  const item = {
                    name: cityList[i],
                    image: data.results[0].urls.raw,
                    key: data.results[0].id,
                  };
                  newItemsToDisplay.push(item);
                })
                .then(() => {
                  setItemsToDisplay(newItemsToDisplay);
                });
            }
          } else {
            fetch(
              `https://api.unsplash.com/search/photos?query=${city}&page=1&per_page=1&client_id=${API_KEY}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("data", data.results[0].urls.raw);

                const item = {
                  name: city,
                  image: data.results[0].urls.raw,
                  key: data.results[0].id,
                };
                newItemsToDisplay.push(item);
              })
              .then(() => {
                setItemsToDisplay(newItemsToDisplay);
              });
          }

          break;
      }
    };

    fetchData();
  }, [country, city, countryList, cityList]);

  const handleSearch = () => {
    navigation.navigate("TripPlan");
    for (let i = 0; i < duration + 1; i++) {
      const uniqueActivities = new Set();
      for (let j = uniqueActivities.size; j < 20; j++) {
        const randomActivity = getRandomActivityByInput(
          activitiesList,
          allActivNames
        );
        uniqueActivities.add(randomActivity);
        if (uniqueActivities.size >= 20) {
          break;
        }
      }
      let dayPlan = Array.from(uniqueActivities);
      dispatch(addDayPlan(dayPlan));

      // const modalSet = new Set();
      // for (let j = modalSet.size; j < 40; j++) {
      //   const randomActivity = getRandomActivityByInput(
      //     activitiesList,
      //     allActivNames
      //   );
      //   modalSet.add(randomActivity);
      //   if (modalSet.size >= 40) {
      //     break;
      //   }
      // }
      // let modalPlan = Array.from(uniqueActivities);
      dispatch(updateTempActiv(dayPlan));
    }

    //dispatch(getTripDuration()); // RANDOM TRIP DURATION
//if (allSizes.length > 0) {
    for (let i = 0; i < duration+1; i++) {
      // size = {DAY: i+1, morningSize: 2, afternoonSize: 4 }
      dispatch(pushSizes(size));
    }
  //}
  };

  console.log("RS => duration:", duration + 1);

  const checkItem = (element) => {
    //console.log('key:', element.key);
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
    navigation.navigate("Home");
  };

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
            renderItem={({ item }) => (
              <Item name={item.name} image={item.image} id={item.key} />
            )}
            keyExtractor={(item) => item.id}
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
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
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
    width: "80%",
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
