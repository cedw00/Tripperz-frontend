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
import { addActivityType } from '../reducers/activSearch';
import { addActivity } from '../reducers/activSearch';




const backend = Constants.expoConfig.hostUri.split(`:`)[0]

export default function ActivitiesResultScreen({ navigation }) {

    const dispatch = useDispatch();

    const [searchCountry, setSearchCountry] = useState("");
    const { activityType } = useSelector((state) => state.activSearch.value);
    const { activity } = useSelector((state) => state.activSearch.value);
    const { trippers } = useSelector((state) => state.activSearch.value)
    const { duration } = useSelector((state) => state.search.value);
    //const tripCard = useSelector((state) => state.trips.cityCard);

    console.log('activity type', activityType)
    console.log('activity', activity)

    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let newItemsToDisplay = [];
            if (activity === '') {
                const data = {
                    activityType,
                };
                const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                fetch(`https://tripperz-backend.vercel.app/countries/activitiesTypes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        delay(1000);
                        console.log('data.found cities', data.foundCities)
                        setItemsToDisplay(data.foundCities)
                    })
            } else if (activity !== '') {
                const data = {
                    activityType,
                    activity,
                };
                fetch(`https://tripperz-backend.vercel.app/countries/activity`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        newItemsToDisplay.push(data.foundCities);
                        setItemsToDisplay(newItemsToDisplay[0]);
                    });
            }
        };

        fetchData();
        // allActivNames.forEach((activity) => {
        //   fetchPlacesForActivity(activity);
        // });
    }, [navigation]);

    const checkItem = (element) => {
        console.log(element.name, "picture:", element.image);
        console.log("name:", element.name);
        dispatch(createTripCard(element));
        navigation.navigate("Loading");
      };


    const Item = (item) => (
        <Pressable
            onPress={() => {
                checkItem(item);
            }}
            key={item.key}
        >
            <View style={styles.card}>
                <Image style={styles.tinyLogo} source={{ uri: item.image }} />
                <Text style={styles.itemtext}>{item.name}, {item.country}</Text>
            </View>
        </Pressable>
    );

    const handleClickActivities = () => {
        navigation.navigate("Home");
    };

    //ON CLICK Destinations
    const handleClickDestination = () => {
        dispatch(addActivityType(''));
        dispatch(addActivity(''));
        navigation.navigate('Home')

    };



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
                                <Item country={item.country} city={item.city} image={item.image} />
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
        resizeMode: 'contain',
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
