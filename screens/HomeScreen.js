import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Activities from '../components/HomePage/Activities/Activities'
import Destination from '../components/HomePage/Destinations/Destinations'
import { useState } from 'react';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";


export default function HomeScreen({ navigation }) {

  const [dest, setDest] = useState(null);
  const [activ, setActiv] = useState((<Activities activity={'Activités'} date={'date'} />));
  const [isClickedActiv, setIsClickedActiv] = useState(true);
  const [buttonColors, setButtonColors] = useState({
    activities: { borderColor: '#D9D9D9', backgroundColor: 'transparent' },
    destination: { borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' },
  });
  const [errMsg, setErrMsg] = useState('')

  const { country } = useSelector((state) => state.search.value)
  const { city } = useSelector((state) => state.search.value)


  const handleSearch = () => {
    console.log(country);

    if (isClickedActiv===false && country === '') {
      setErrMsg('Oops! It looks like you forgot to choose a country !')
    }
      else {
      navigation.navigate('Result')
    }
  }


  const handleClickActivities = () => {
    const content = (<Activities />)
    setActiv(content)
    setIsClickedActiv(true)
    setButtonColors({
      activities: { borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' },
      destination: { borderColor: '#D9D9D9', backgroundColor: 'transparent' },
    });



  }

  const handleClickDestination = () => {
    const content = (< Destination />)
    setDest(content)
    setIsClickedActiv(false);
    setButtonColors({
      activities: { borderColor: '#D9D9D9', backgroundColor: 'transparent' },
      destination: { borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' },
    });


  };

  return (

    <LinearGradient
      style={styles.container}
      colors={['rgba(6, 113, 136, 1)', 'rgba(43, 127, 149, 0.8698)', 'rgba(77, 141, 162, 0.7502)']}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >

      <View style={styles.header}>

        <Image style={styles.logo} source={require('../assets/logo.png')} />

        <View style={styles.buttons}>

          <TouchableOpacity onPress={() => handleClickActivities()} style={[styles.activities, { buttonColors }]} activeOpacity={0.8}>
            <Text style={styles.textButton}>Activités</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleClickDestination()} style={[styles.activities, { buttonColors, }]} activeOpacity={0.8}>
            <Text style={styles.textButton}>Destinations</Text>
          </TouchableOpacity>

        </View>

      </View>

      <View style={styles.body}>

        <View style={styles.top}>
          {isClickedActiv === true && activ}
          {!isClickedActiv && dest}
        </View>


        <View style={styles.bottom}>
          <Text style={{color:'white'}}>{errMsg}</Text>
          <TouchableOpacity style={styles.search} activeOpacity={0.8} onPress={() => handleSearch()}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>

          <Footer style={styles.footer} navigation={navigation} />
        </View>
      </View>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    filter: 'blur(2px)',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {

    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    height: '23%',
    width: '100%',

    backgroundColor: 'rgba(6, 113, 136, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

  },
  logo: {

    paddingLeft: '15%',
    paddingRight: '15%',
    bottom: '-20%',
    width: '60%',

  },

  buttons: {
    flexDirection: 'row',
    paddingTop: '15%',
    top: 6
  },

  activities: {

    width: 131,
    height: 27,
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
    width: '100%',
    height: '80%',
    paddingBottom: '18%',


  },
  top: {
    width: '100%',
    height: '70%',
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',

  },

  bottom: {
    height: '35%',
    alignItems: 'center',
    marginTop: '10%',
  },


  search: {
    height: '25%',
    width: '50%',
    marginTop: 20,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    marginBottom: '10%'



  },
  searchText: {
    color: 'white'
  },
});