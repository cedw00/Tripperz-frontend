import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity,
  KeyboardAvoidingView, Platform, TextInput, Pressable  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateProfile } from '../reducers/user';
import Constants from 'expo-constants';

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const foodData = [
  { label: 'Italian', value: '0' },
  { label: 'Cakes', value: '1' },
  { label: 'French', value: '2' },
  { label: 'Chinese', value: '3' },
  { label: 'Japanese', value: '4' },
  { label: 'Indian', value: '5' },
  { label: 'Greek', value: '6' },
  { label: 'Spicy', value: '7' },
  { label: 'Turkish', value: '8' },
  { label: 'Vegan', value: '9' },
];

const backend = Constants.expoConfig.hostUri.split(`:`)[0]

export default function SetProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.value);
  
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState('');
  const [favoriteDestinations, setFavoriteDestinations] = useState('');
  const [activitiesTypes, setActivitiesTypes] = useState([]);
  const [favoriteActivitiesTypes, setFavoriteActivitiesTypes] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [date, setDate] = useState(new Date());

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const typesList = [];
    const activitiesList = [];
    let index = 0;
    let count = 0;
    (async () => {
      // Get the name and type of all activities in database
      const response = await fetch(`http://${backend}:3000/countries/Allcountries`);
      const countryData = await response.json();
      for(const data of countryData.activTypes) {
        // Check if type is already in list to avoid case clone
        const isPresent = typesList.some(type => type.label.toLowerCase() === data.value.toLowerCase());
        if (!isPresent) {
          typesList.push({label: data.value, value: index});
          index++;
        }
      }
      for (const type of countryData.activTypes) {
        for (const activity of type.activities) {
          // Check if activity is already in list to avoid case clone
          const isPresent = activitiesList.some(activityField => activityField.label.toLowerCase() === activity.value.toLowerCase());
          if (!isPresent) {
            activitiesList.push({label: activity.value, value: count});
            count++;
          }
        }
      }
    })();
    setActivitiesTypes(typesList);
    setHobbies(activitiesList);
  }, [])

  // Set a new date of birth
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const handleReturn = () => {
      navigation.navigate('Register')
  };

  const handleSubmit = async () => {
    const month = date.getMonth() + 1;
    // Transform date into string in DD/MM/YYYY format
    const str = `${date.getDate()}/${month}/${date.getFullYear()}`;
    const interests = favoriteActivitiesTypes.map(data => activitiesTypes[data].label);
    const activities = selectedHobbies.map(data => hobbies[data].label);
    const favoriteFood = selectedFood.map(data => foodData[data].label);
    const profile = {
      birthday: str,
      gender: gender,
      country: country,
      favDest: favoriteDestinations.split(', '),
      favFood: favoriteFood,
      favTypes: interests,
      hobbies: activities,
      token: token
    };
    // Update the empty profile with the inputs values
    const response = await fetch(`http://${backend}:3000/profile/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    const data = await response.json();
    if (data.result) {
      setErrorMsg(false)
      // Send profile data in reducer user
      dispatch(updateProfile(data.user))
      navigation.navigate('DrawerNavigator')
    } else {
      setErrorMsg(data.error);
      setShowError(true);
    }
  };

  const display = item => {
    return (
      <View>
        <Text>{item.label}</Text>
      </View>
    )
  }

  return (
    <ImageBackground source={require('../assets/background_2.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.view}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')}/>
          </View>
          <View style={styles.body}>
            <View style={styles.top}>
              <FontAwesome name={'user-circle'} size={100} color={'#FFFFFF'}/>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>Create your profile</Text>
              </View>
            </View>
            <View style={styles.main}>
              <Pressable style={styles.show}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  maximumDate={new Date()}
                  is24Hour={true}
                  onChange={onChange}
                />
              </Pressable>
              <View style={styles.inputContainer}>
                <Dropdown
                    style={styles.dropdown} data={genderData} labelField='label' valueField='value' placeholder='Gender' placeholderStyle={styles.input}
                    value={gender} onChange={(item) => {setGender(item.value)}} renderItem={display} maxHeight={100}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput placeholder="Home country" onChangeText={(value) => setCountry(value)} placeholderTextColor={'#000000'}
                value={country} style={styles.input}/>  
              </View>
              <View style={styles.inputContainer}>
                <TextInput placeholder="Favorite Destinations" onChangeText={(value) => setFavoriteDestinations(value)} placeholderTextColor={'#000000'}
                value={favoriteDestinations} style={styles.input}/>  
              </View>
              <View style={styles.inputContainer}>
                <MultiSelect
                    style={styles.dropdown} data={foodData} labelField='label' valueField='value' placeholder='Favorite food types'
                    placeholderStyle={styles.input} value={selectedFood} onChange={(item) => {setSelectedFood(item)}} renderItem={display} maxHeight={100}
                    visibleSelectedItem={false} activeColor='lightblue'
                />
              </View>
              <View style={styles.inputContainer}>
                <MultiSelect
                    style={styles.dropdown} data={activitiesTypes} labelField='label' valueField='value' placeholder='Favorites types of activities'
                    placeholderStyle={styles.input} value={favoriteActivitiesTypes} onChange={(item) => {setFavoriteActivitiesTypes(item)}}
                    renderItem={display} maxHeight={100} visibleSelectedItem={false} activeColor='lightblue'
                />
              </View>
              <View style={styles.inputContainer}>
                <MultiSelect
                    style={styles.dropdown} data={hobbies} labelField='label' valueField='value' placeholder='Favorites activities'
                    placeholderStyle={styles.input} value={selectedHobbies} onChange={(item) => {setSelectedHobbies(item)}} renderItem={display}
                    maxHeight={100} visibleSelectedItem={false} activeColor='lightblue'
                />
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()} style={styles.button}>
                  <Text style={styles.textBtn}>Plan your trip</Text>
              </TouchableOpacity>
              { showError && <View style={styles.error}>
                  <Ionicons name={'warning'} size={25} color={'#FFFFFF'} />
                  <Text style={styles.errorText}>{errorMsg}</Text>
              </View> }
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleReturn()} style={styles.button}>
                <Text style={styles.textBtn}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 4,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  show: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#BBE5EB',
    opacity: 0.8,
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    color: 'white',
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    color: '#000000'
  },
  main: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dropdown: {
    width: '100%',
  },
  inputContainer: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 8,
    backgroundColor: '#BBE5EB',
    opacity: 0.8,
  },
  input: {
    color: '#000000',
  },
  bottom: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  textBtn: {
    color: 'white',
  },
  error: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  errorText: {
    color: '#FFFFFF'
  }
});