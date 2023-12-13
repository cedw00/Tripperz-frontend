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
import Day from "../components/Day";
import { getRandomActivityByInput } from "../modules/slotMods";
import {
  updateActivList,
  updateTempActiv,
  updateCardActiv,
  updateMorningActiv,
  updateAfternoonActiv,
} from "../reducers/activ";

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
const allActivNames = "shopping restaurants culturePlaces landscapes sportActivities";

export default function TripPlanScreen({ navigation }) {
  const [day, setDay] = useState([]);
  const activities = useSelector((state) => state.activ.value);
  const cardActiv = useSelector((state) => state.activ.cardActiv);
  const tempActivities = useSelector((state) => state.activ.tempActivities);
  const thisMorning = useSelector((state) => state.activ.morningActiv);
  const thisAfternoon = useSelector((state) => state.activ.afternoonActiv);
  const sizeOfMorning = useSelector((state) => state.activ.morningValue);
  const sizeOfAfternoon = useSelector((state) => state.activ.afternoonValue);
  const dispatch = useDispatch();

  // console.log("TPS => stockAct", tempActivities);
  // console.log("TPS => sizes", sizeOfMorning, sizeOfAfternoon)
  
  const myMorning = tempActivities.slice(0, sizeOfMorning);
  const myAfternoon = tempActivities.slice(4, sizeOfAfternoon);

  const stockActivities = () => {
    dispatch(updateMorningActiv(myMorning));
    dispatch(updateAfternoonActiv(myAfternoon));
  };

  useEffect((i) => {
    const uniqueActivities = new Set();

    for (let i = uniqueActivities.size; i < 20; i++) {
      const randomActivity = getRandomActivityByInput(
        activitiesList,
        allActivNames
      );
      uniqueActivities.add(randomActivity);
      if (uniqueActivities.size >= 20) {
        break;
      }
    }

    dispatch(updateActivList(Array.from(uniqueActivities)));
    dispatch(updateTempActiv(activities));
    setDay(<Day key={i} stockActivities={stockActivities}/>);
    // console.log("TPS => day", day);
    // console.log("TPS => tempActivities", tempActivities);
  }, []);

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
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
        <View title="Day Card" style={styles.dayContainer}>
          {day}
        </View>
      </ScrollView>
      <View style={styles.nextContainer}>
        <Pressable
          onPress={() => {
            stockActivities(), navigation.navigate("Planning");
          }}
        >
          <View style={styles.confirm}>
            <Text style={{ color: "white" }}>CONFIRM</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Result")}>
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
