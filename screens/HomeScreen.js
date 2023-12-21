import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Activities from '../components/HomePage/Activities/Activities'
import Destination from '../components/HomePage/Destinations/Destinations'
import { useState} from 'react';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';



export default function HomeScreen({ navigation }) {



  const [dest, setDest] = useState(null);
  const [activ, setActiv] = useState((<Activities activity={'Activités'} date={'date'} navigation={navigation} />));
  const [isClickedActiv, setIsClickedActiv] = useState(true);

  // const { city } = useSelector((state) => state.search.value)



  const handleClickActivities = () => {
    const content = (<Activities navigation={navigation} />)
    setActiv(content)
    setIsClickedActiv(true)
  }

  const handleClickDestination = () => {
    const content = (< Destination navigation={navigation} />)
    setDest(content)
    setIsClickedActiv(false);
  };


  let activitiesStyle = {
    width: 131,
    height: 27,
    borderColor: '#D6DBDC',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: '5%',
  }

  let destinationStyle = {
    width: 131,
    height: 27,
    borderColor: '#D6DBDC',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: '5%',
  }

  let activTextButton = {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',

  }

  let destTextButton = {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#FFFFFF',
  }

  if (isClickedActiv === true) {
    activitiesStyle = {
      width: 131,
      height: 27,
      borderWidth: 1,
      backgroundColor: '#D6DBDC',
      borderRadius: 20,
      borderWidth: 1,
      marginRight: '5%',
    },
      activTextButton = {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#000000',
      }

  } else {
    destinationStyle = {
      width: 131,
      height: 27,
      backgroundColor: '#D6DBDC',
      borderRadius: 20,
      borderWidth: 1,
      marginRight: '5%',
    },
      destTextButton = {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 20,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#000000',

      }
  }


  return (
    <SafeAreaView>
      <LinearGradient
        style={styles.container}
        colors={['rgba(6, 113, 136, 1)', 'rgba(43, 127, 149, 0.8698)', 'rgba(77, 141, 162, 0.7502)']}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => handleClickActivities()} style={activitiesStyle} activeOpacity={0.8}>
              <Text style={activTextButton}>Activities</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClickDestination()} style={destinationStyle} activeOpacity={0.8}>
              <Text style={destTextButton}>Destinations</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.top}>
            {isClickedActiv === true && activ}
            {!isClickedActiv && dest}
          </View>
          <View style={styles.bottom}>
            <Footer navigation={navigation} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
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
    top: '25%',
    resizeMode: 'contain',
    width: '40%',
  },
  buttons: {
    flexDirection: 'row',
    paddingTop: '15%',
    top: 6
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

  body: {
    justifyContent: 'center',
    width: '100%',
    height: '80%',
    paddingBottom: '5%',
  },
  top: {
    width: '100%',
    height: '85%',
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:'12%',
    backgroundColor: "#067188",
  },

});