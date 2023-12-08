import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";
import { getRandomActivityByInput } from "../modules/slotMods";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActivList } from "../reducers/activ";

export default function Slot() {
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
      ],
    },
  ];
  // const userReq = "restaurants landscapes sportActivities";
  const allActivNames =
    "shopping restaurants culturePlaces landscapes sportActivities";
  //   const [index, setIndex] = useState(0);
  const [activList, setActivList] = useState([]);
  const randomIndex = Math.floor(Math.random() * activList.length);
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activ.value);

  // Activities
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

    setActivList(Array.from(uniqueActivities));
    console.log("hello", activList);
    dispatch(updateActivList(activList));
    console.log("hi", activities);
  }, []);

  console.log("hi", activities);

  return (
    <View style={styles.slotContainer}>
      <View
        style={{
          width: 300,
          height: 20,
          borderColor: "black",
          borderWidth: "1rem",
          backgroundColor: "lightblue",
        }}
      >
        <View>
          <Text style={styles.text}>{activList[randomIndex]}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slotContainer: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "10%",
  },
  text: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
