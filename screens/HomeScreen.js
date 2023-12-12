import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Activities from '../components/HomePage/Activities/Activities'
import Destination from '../components/HomePage/Destinations/Destinations'
import { useState } from 'react';




export default function HomeScreen({ navigation }) {

  const [dest, setDest] = useState(null);
  const [activ, setActiv] = useState((<Activities activity={'Activités'} date={'date'} />));
  const [isClickedActiv, setIsClickedActiv] = useState(true);




  const handleClickActivities = () => {
    const content = (<Activities  />)
    setActiv(content)
    setIsClickedActiv(true);
  }

  const handleClickDestination = () => {
    const content = (< Destination />)
    setDest(content)
    setIsClickedActiv(false);

  }

  const handleSearch = () => {
    navigation.navigate('ResultPage')
  }


// COUNTRY AND CITY TO SEARCH



  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.title}>Trippers</Text>

        <View style={styles.buttons}>

          <TouchableOpacity onPress={() => handleClickActivities()} style={styles.activities} activeOpacity={0.8}>
            <Text style={styles.textButton}>Activités</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleClickDestination()} style={styles.destination} activeOpacity={0.8}>
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
          <TouchableOpacity style={styles.search} activeOpacity={0.8} onPress={() => handleSearch()}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'linear-gradient(180deg, #067188 0%, rgba(79, 141, 162, 0.744948) 99.99%, rgba(174, 179, 197, 0.41) 100%)',
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
    height: '20%',
    width:'100%',
    backgroundColor: 'linear-gradient(180deg, rgba(244, 244, 244, 0.0975) 82.29%, rgba(25, 25, 25, 0.25) 100%)',

  },


  title: {
    fontWeight: 'bold',
    fontSize: 48,
    color: 'blue',
    paddingLeft: '15%',
    paddingRight: '15%',
   bottom:'-25%',


  },
  buttons: {
    flexDirection: 'row',
    paddingTop: '15%',
    top:6

  },

  activities: {

    boxSizing: 'border-box',
    width: 131,
    height: 27,
    backgroundColor: 'linear-gradient(180deg, #D9D9D9, 0%',
    borderColor: '#D6DBDC',
    borderRadius: 20,
    borderWidth: 1,
    marginRight:'5%',
  
    
  

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
    marginLeft:'5%'
    
  },

  body: {

    justifyContent: 'center',
  
    width: '100%',
    height: '80%',
    paddingBottom: '18%',
   

  },
  top: {
    width: '100%',
    height: '80%',
    marginTop:'10%',
    justifyContent: 'center',
    alignItems: 'center',
   
   
  },

  bottom: {
    height: '15%',
    alignItems: 'center',
   
  
    marginTop:'10%'
    
  },

  search:{
height:'30%',
width:'50%',
borderWidth: 6,
alignItems: 'center',
justifyContent:'center',
backgroundColor: '#000000',
borderRadius: 8,


  },
  searchText:{
color:'white'
  }
});