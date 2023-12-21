import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Dimensions
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from '@react-navigation/native';
import { updateRefresh } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Footer from '../components/Footer';
import Constants from 'expo-constants';
import { emptySizes } from "../reducers/activ";

const backend = Constants.expoConfig.hostUri.split(`:`)[0]

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
  const [error, setError] = useState(null);

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
      (async() => {
        if (token !== null) {
          const response = await fetch(`http://${backend}:3000/trips/${token}`);
          const data = await response.json();
          if (data.trips.length > 0) {
            setAllTrips(data.trips);
          } else {
            setAllTrips([]);
            setError(data.error);
          }
        } else {

        }
      })();
    }
  }, [trigger]);

  const handleDelete = async (id) => {
    if (token !== null) {
      const response = await fetch(`http://${backend}:3000/trips/${id}/${token}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.result) {
        setTrigger(!trigger)
      } else {
        setError(data.error);
      }
    } else {
      setError('Invalid token');
    }
  }

  const tripsData = allTrips.map((data, i) => {
    return (
      <SafeAreaView key={i}>
        <Pressable>
          <View style={styles.card}>
          <Image style={styles.tinyLogo} source={{ uri: data.tripImage }} />
            <Text style={styles.itemtext}>{data.cityDest}</Text>
          </View>
        </Pressable>
        <View style={styles.iconContainer}>
          <Pressable><FontAwesome name={'pencil'} size={20} color={'#000000'}/></Pressable>
          <Pressable><FontAwesome name={'trash-o'} size={20} color={'#000000'} onPress={() => handleDelete(data._id)}/></Pressable>
        </View>
      </SafeAreaView>
    )
  })

  const handleUpdateTrip = () => {
    navigation.navigate("TripPlanScreen");
  };

  if (!isFocused) {
    dispatch(updateRefresh(0));
    return (
      <View/>
    )
  } else {
    if (refresh === 0) {
      emptySizesArray();
      if (token !== null) {
        (async() => {
          const response = await fetch(`http://${backend}:3000/trips/${token}`);
          const data = await response.json();
          if (data.trips.length > 0) {
            setAllTrips(data.trips);
          } else {
            setAllTrips([]);
            setError(data.error);
          }
        })();
        dispatch(updateRefresh(1));
      } else {
        setError('Invalid token');
      }
    }
  }

  return (
      <ScrollView contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/tripperz-logo/trippng.png")} // Replace with the path to your image
            style={styles.image}
          />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Your Trips</Text>
        </View>
        <View style={styles.body}>
          <ScrollView>{tripsData.length > 0 ? tripsData : <Text>{error}</Text>}</ScrollView>
        </View>
        <View style={styles.bottom}>
          <Footer navigation={navigation}/>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 11,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#067188",
    paddingTop: "15%",
    paddingBottom: "8%",
    maxHeight: "12%",
  },
  image: {
    width: 150, // Adjust the width of the image as needed
    height: 150, // Adjust the height of the image as needed
    resizeMode: "contain", // Choose the resize mode for the image
  },
  titleBlock: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: "white",
    maxWidth: "100%",
    flexWrap: 'wrap',
    marginBottom: "2%",
  },
  title: {
    flex: 1,
    fontSize: 50,
    backgroundColor: "white",
    maxWidth: "100%",
    marginHorizontal: "5%",
    marginBottom: "2%",
    marginTop: "1%",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    backgroundColor: "white",
  },
  iconContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
    flexDirection: 'row',
    borderWidth: 2,
    marginBottom: "5%",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 250,
    width: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    marginTop: "5%",
    borderWidth: 2,
    borderColor: "#067188",
  },
  tinyLogo: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    resizeMode: "center",
    height: "80%",
    width: "100%",
    marginBottom: "3%",
  },
  itemtext: {
    width: "100%",
    height: "20%",
    textAlignVertical: "center",
    paddingLeft: "10%",
    fontWeight: "bold",
    fontSize: 20,
  },
  bottom: {
    flex: 1,
    maxHeight: "9%",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
    backgroundColor: "#067188",
  },
});
