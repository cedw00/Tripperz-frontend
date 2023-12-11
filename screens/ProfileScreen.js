import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { logout } from '../reducers/user';
import Footer from '../components/Footer';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { username, birthday, gender, country, favoriteCountry, favoriteFoods, hobbies } = useSelector((state) => state.user.value)

  const handleLogout = () => {
      dispatch(logout());
      navigation.navigate('Login')
  }

  const handlePlan = () => {
    navigation.navigate('Home');
  }

  const display = item => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    )
  }

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Image source={require('../assets/logo.png')}/>
    </View>
    <View style={styles.body}>
      <View style={styles.top}>
        <ImageBackground source={require('../assets/background_2.png')} style={styles.background} imageStyle={{borderRadius: 10}}>
          <View style={styles.icon}>
            <FontAwesome name={'user-circle'} size={75} color={'#000000'}/>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{username}</Text>
          </View>
          <View style={styles.desc}>
            <Text style={styles.descText}>Description : </Text>
            <Text style={styles.descText}>Globetrotter</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text>{birthday}</Text>
        </View>
        <View style={styles.section}>
          <Text>{gender}</Text>
        </View>
        <View style={styles.section}>
          <Text>{country}</Text>
        </View>
        <View style={styles.section}>
          <Text>{favoriteCountry}</Text>
        </View>
        <Dropdown
            style={styles.dropdown} data={favoriteFoods} labelField='label' valueField='value' placeholder='Your favorites food type'
            placeholderStyle={styles.input} renderItem={display} maxHeight={100} value={'Your favorites food'} iconColor='#000000'
        />
        <Dropdown
            style={styles.dropdown} data={hobbies} labelField='label' valueField='value' placeholder='Your favorites hobbies'
            placeholderStyle={styles.input} renderItem={display} maxHeight={100} value={'Your favorites hobbies'} iconColor='#000000'
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.btnContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleLogout()} style={styles.button}>
            <Text style={styles.textBtn}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handlePlan()} style={styles.button}>
            <Text style={styles.textBtn}>Plan your trips</Text>
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation}/>
      </View>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#067188'
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 15,
  },
  body: {
    flex: 8,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 2,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    borderWidth: 2,
    borderRadius: 10,
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  icon: {
    flex: 3,
    marginTop: 5,
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    flex: 2,
    width: '90%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderRadius: 10,
    marginBottom: 5,
  },
  descText: {
    fontSize: 14,
    paddingLeft: 8,
  },
  message: {
    fontSize: 18,
  },
  main: {
    flex: 4,
    width: '90%',
    backgroundColor: '#FDFDFF',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
  },
  section: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#AFBBE8',
    borderBottomColor: 'silver',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  dropdown: {
    width: '80%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#AFBBE8',
    borderBottomColor: 'silver',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  textBtn: {
    color: 'white',
  },
});