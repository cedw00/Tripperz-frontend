import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
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
  { label: 'Museum', value: '1' },
  { label: 'Sea', value: '2' },
  { label: 'Sport', value: '3' },
  { label: 'Restaurant', value: '4' },
  { label: 'Theater', value: '5' },
  { label: 'Sightseeing', value: '6' },
  { label: 'Amusement Park', value: '7' },
  { label: 'Mountain', value: '8' },
];

export default function SetProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState(null);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

    const handleReturn = () => {
        navigation.navigate('Register')
    };

    const handleSubmit = () => {
      const month = date.getMonth() + 1;
      const str = `${date.getDate()}/${month}/${date.getFullYear()}`;
      setBirthday(str)
      const interests = selected.map(data => mockData[data].label);
      const infos = {
        birthday: birthday,
        gender: gender,
        interests: interests,
      };
      dispatch(updateProfile(infos));
      setSelected([])
      navigation.navigate('Profile')
    };

    const display = item => {
      return (
        <View>
          <Text>{item.label}</Text>
        </View>
      )
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trippers</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <FontAwesome name={'user-circle'} size={100} color={'#000000'} />
          <View style={styles.messageContainer}>
            <Text style={styles.message}>Configure your profile</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.show}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => showDatepicker()} style={styles.button}>
                <Text style={styles.textBtn}>Select Date</Text>
            </TouchableOpacity>
          </View>
          <Text>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <Dropdown
              style={styles.dropdown} data={genderData} labelField='label' valueField='value' placeholder='Select your gender' placeholderStyle={styles.input}
              value={gender} onChange={(item) => {setGender(item.value)}} renderItem={display} maxHeight={100}
          />
          <MultiSelect
              style={styles.dropdown} data={mockData} labelField='label' valueField='value' placeholder='Choose your favorites activities'
              placeholderStyle={styles.input} value={selected} onChange={(item) => {setSelected(item)}} renderItem={display} maxHeight={100}
              visibleSelectedItem={false} activeColor='lightblue'
          />
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
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 48,
      color: 'blue'
    },
    body: {
      flex: 3,
      width: '80%',
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
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    messageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    message: {
      fontSize: 20,
    },
    main: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    dropdown: {
      width: '80%',
      backgroundColor: '#AFBBE8',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 5,
    },
    inputContainer: {
      width: '80%',
      backgroundColor: '#AFBBE8',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 5,
    },
    input: {
      color: 'black',
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