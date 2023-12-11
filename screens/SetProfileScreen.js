import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity,
  KeyboardAvoidingView, Platform, TextInput  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateProfile } from '../reducers/user';

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const mockData = [
  { label: 'Museum', value: '0' },
  { label: 'Sea', value: '1' },
  { label: 'Sport', value: '2' },
  { label: 'Restaurant', value: '3' },
  { label: 'Theater', value: '4' },
  { label: 'Sightseeing', value: '5' },
  { label: 'Amusement Park', value: '6' },
  { label: 'Mountain', value: '7' },
];

const foodData = [
  { label: 'Italian', value: '0' },
  { label: 'Cakes', value: '1' },
  { label: 'French', value: '2' },
  { label: 'Fast-Food', value: '3' },
  { label: 'Asian', value: '4' },
  { label: 'Vegan', value: '5' },
];

const backend = '192.168.10.134'

export default function SetProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.value);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState('');
  const [favoriteCountry, setFavoriteCountry] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

    const handleReturn = () => {
        navigation.navigate('Register')
    };

    const handleSubmit = async () => {
      const month = date.getMonth() + 1;
      const str = `${date.getDate()}/${month}/${date.getFullYear()}`;
      const interests = selectedActivities.map(data => mockData[data].label);
      const favoriteFood = selectedFood.map(data => foodData[data].label);
      const profile = {
        birthday: str,
        gender: gender,
        country: country,
        favDest: favoriteCountry,
        favFood: favoriteFood,
        hobbies: interests,
        token: token
      };
      const response = await fetch(`http://${backend}:3000/profile/create`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (data.result) {
        dispatch(updateProfile(data.user))
        navigation.navigate('Profile')
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
              <View style={styles.show}>
                <Text style={styles.date}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
                {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  maximumDate={new Date()}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
                <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} style={styles.selector}>
                    <Text style={styles.selectorText}>Select Date</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Dropdown
                    style={styles.dropdown} data={genderData} labelField='label' valueField='value' placeholder='Select your gender' placeholderStyle={styles.input}
                    value={gender} onChange={(item) => {setGender(item.value)}} renderItem={display} maxHeight={100}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput placeholder="Enter your home country" onChangeText={(value) => setCountry(value)} placeholderTextColor={'#FFFFFF'}
                value={country} style={styles.input}/>  
              </View>
              <View style={styles.inputContainer}>
                <TextInput placeholder="Enter your favorite country" onChangeText={(value) => setFavoriteCountry(value)} placeholderTextColor={'#FFFFFF'}
                value={favoriteCountry} style={styles.input}/>  
              </View>
              <View style={styles.inputContainer}>
                <MultiSelect
                    style={styles.dropdown} data={foodData} labelField='label' valueField='value' placeholder='Choose your favorites food type'
                    placeholderStyle={styles.input} value={selectedFood} onChange={(item) => {setSelectedFood(item)}} renderItem={display} maxHeight={100}
                    visibleSelectedItem={false} activeColor='lightblue'
                />
              </View>
              <View style={styles.inputContainer}>
                <MultiSelect
                    style={styles.dropdown} data={mockData} labelField='label' valueField='value' placeholder='Choose your favorites activities'
                    placeholderStyle={styles.input} value={selectedActivities} onChange={(item) => {setSelectedActivities(item)}} renderItem={display}
                    maxHeight={100} visibleSelectedItem={false} activeColor='lightblue'
                />
              </View>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()} style={styles.button}>
                  <Text style={styles.textBtn}>Plan your trip</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleReturn()}>
                <Text>Return</Text>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingLeft: 8,
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    color: 'white',
  },
  selector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
  },
  selectorText: {
    color: '#FFFFFF'
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
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
  },
  input: {
    color: 'white',
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
  }
});