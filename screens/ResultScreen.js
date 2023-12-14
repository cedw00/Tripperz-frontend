import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image

} from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import Destinations from '../components/HomePage/Destinations/Destinations';
import { useSelector } from 'react-redux';

export default function ResultScreen({ navigation }) {



  const API_URL = 'https://api.unsplash.com/search/photos';
  const API_KEY = 'fvgvM9uXT8ssXYBvJizIKG51rXub6fRglrJYde76qXY'

  // const country = 'France';
  // const city = ['paris', 'rome', 'tunis'];

  const [searchCountry, setSearchCountry] = useState('');

  const { country } = useSelector((state) => state.search.value)
  const { city } = useSelector((state) => state.search.value)
  const { cityList } = useSelector((state) => state.search.value)
  const { countryList } = useSelector((state) => state.search.value)
  console.log
  const [itemsToDisplay, setItemsToDisplay] = useState([])

  console.log('country', country)
  console.log('city list', cityList)
  useEffect(() => {
    const fetchData = async () => {
      switch (country.length) {

        case 0:

          let newItemsToDisplay = [];

          for (let i = 0; i < 5; i++) {

            fetch(`https://api.unsplash.com/search/photos?query=${countryList[i].value}&page=1&per_page=1&client_id=${API_KEY}`)
              .then(response => response.json())
              .then(data => {


                const item = { name: countryList[i].value, image: data.results[0].urls.raw, key: data.results[0].id };
                newItemsToDisplay.push(item);
              }).then(() => {
                setItemsToDisplay(newItemsToDisplay);
              })
          }
          break;


        default:
          newItemsToDisplay = [];
          if (city === null) {

            for (let i = 0; i < cityList[i].length; i++) {
              console.log('city lis de i', cityList[i])

              fetch(`https://api.unsplash.com/search/photos?query=${cityList[i]}&page=1&per_page=1&client_id=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                  console.log('data', data.results[0].urls.raw);

                  const item = { name: cityList[i], image: data.results[0].urls.raw, key: data.results[0].id };
                  newItemsToDisplay.push(item);
                }).then(() => {
                  setItemsToDisplay(newItemsToDisplay);
                })
            }
          } else {
            fetch(`https://api.unsplash.com/search/photos?query=${city}&page=1&per_page=1&client_id=${API_KEY}`)
              .then(response => response.json())
              .then(data => {
                console.log('data', data.results[0].urls.raw);

                const item = { name: city, image: data.results[0].urls.raw, key: data.results[0].id };
                newItemsToDisplay.push(item);
              }).then(() => {
                setItemsToDisplay(newItemsToDisplay);
              })
          }

          break;
      }
    };

    fetchData();
  }, [country, city, countryList, cityList]);




  const Item = (item) => (

    <View style={styles.card} key={item.key}>

      <Image style={styles.tinyLogo} source={{ uri: item.image }} />
      <Text style={styles.itemtext}>{item.name}</Text>


    </View>

  )
  //ON CLICK ACTIVITIES

  const handleClickActivities = () => {
    navigation.navigate('Home')
  }

  //ON CLICK Destinations

  const handleClickDestination = () => {
    navigation.navigate('Home')


  };

  return (

    <SafeAreaView>
      <View style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.title}>Trippers</Text>

          <View style={styles.buttons}>

            <TouchableOpacity onPress={() => handleClickActivities()} style={styles.activities} activeOpacity={0.8}>
              <Text style={styles.textButton}>Activities</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleClickDestination()} style={styles.destination} activeOpacity={0.8}>
              <Text style={styles.textButton}>Destinations</Text>
            </TouchableOpacity>

          </View>

        </View>
        <View style={styles.body}>
          <FlatList
            style={styles.flatlist}
            data={itemsToDisplay}
            renderItem={({ item }) => <Item name={item.name} image={item.image} id={item.key} />}
            keyExtractor={item => item.id}

          />

        </View>

      </View>
    </SafeAreaView>


  );
};


const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      filter: 'blur(2px)',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      backgroundColor: 'transparent',
      overflow: 'hidden',


  },
  linearGradient: {
      flex: 1,
      borderRadius: 20,
  },
  header: {

      justifyContent: "center",
      alignItems: 'center',
      alignSelf: 'center',
      height: '20%',
      width: '100%',
      backgroundColor: 'linear-gradient(180deg, rgba(244, 244, 244, 0.0975) 82.29%, rgba(25, 25, 25, 0.25) 100%)',


  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    color: 'blue',
    paddingLeft: '15%',
    paddingRight: '15%',
    bottom: '-25%',


},
buttons: {
    flexDirection: 'row',
    paddingTop: '15%',
    top: 6

},

activities: {

    boxSizing: 'border-box',
    width: 131,
    height: 27,
    backgroundColor: 'linear-gradient(180deg, #D9D9D9, 0%',
    borderColor: '#D6DBDC',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: '5%',
},
textButton: {

  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: 12,
  lineHeight: 20,
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  color: '#FFFFFF',
  textShadowColor: 'rgba(0, 0, 0, 0.25)',
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 4,

},
destination: {
  boxSizing: 'border-box',
  width: 131,
  height: 27,
  borderColor: '#D6DBDC',
  borderRadius: 20,
  borderWidth: 1,
  marginLeft: '5%'
},
body: {

  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '80%',
  paddingBottom: '18%',


},
flatlist: {

  width: '80%',
  marginTop: '10%',

},
card: {
  alignItems: 'center',
  backgroundColor: '#ffffff',
  height: 195,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  overflow: 'hidden',
  marginBottom: '5%',

},
tinyLogo: {
  borderWidth: 1,
  borderColor: 'transparent',
  borderRadius: 5,
  resizeMode: 'center',
  height: '80%',
  width: '100%',




},
itemtext: {
  width: '100%',
  height: '20%',
  textAlignVertical: 'center',
  paddingLeft: '10%',
  fontWeight: 'bold',
  fontSize: 20,

}

})