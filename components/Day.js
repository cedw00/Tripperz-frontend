import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slot from "./Slot";
import {
  getUniqueElements,
  getRandomActivityByInput,
  getUniqueRandomIndex,
} from "../modules/slotMods";
import { useDispatch, useSelector } from "react-redux";
import { updateActivList } from "../reducers/activ";

export default function Day() {
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
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);
  const activities = useSelector((state) => state.activ.value);
  const dispatch = useDispatch();

  useEffect(() => {
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
    console.log("DAY => activities", activities);
  }, []);

  useEffect(() => {
    const modalActivities = activities.map((data) => {
      return <Slot activity={data} />;
    });
    console.log("DAY => modalContent", modalActivities);

    const newMorning = modalActivities.slice(0, 4);
    setMorning(newMorning);

    const newAfternoon = modalActivities.slice(4, 8);
    setAfternoon(newAfternoon);

    console.log("DAY => morning", morning);
    console.log("DAY => afternoon", afternoon);
  }, [activities]);

  return (
    <View title="Day" style={styles.dayContainer}>
        <Text style={{fontSize: 20}}>PLAN YOUR TRIP</Text>
      <View title="halfDay" style={styles.halfday}>
        <Text>A.M.</Text>
        <View style={styles.daySlots}>{morning}</View>
        <FontAwesome name="plus" color="black" />
      </View>
      <View title="halfDay" style={styles.halfday}>
        <Text>P.M.</Text>
        <View style={styles.daySlots}>{afternoon}</View>
        <FontAwesome name="plus" color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginTop: 200,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  halfday: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  daySlots: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#eee",
  },
});
