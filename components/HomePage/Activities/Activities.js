import {
    StyleSheet,
    Text,
    View,
    Platform,

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import moment from 'moment';
import 'moment/locale/fr';
import { useState } from "react";
import SelectList from './SelectList';
import AntDesign from 'react-native-vector-icons/AntDesign'







export default function Activities() {


    //Activitiesa  DROPDOWN

    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);

    };



    //City DROPDOWN

    const [selectedCity, setSelectedCity] = useState(null);

    const handleSelectCity = (city) => {
        setSelectedCity(city);

    };




    //DATE INPUT
    const [depDate, setDepDate] = useState(new Date());
    const [arrDate, setArrDate] = useState(new Date());
    const [isClicked, setIsClicked] = useState(false);
    const [text, setText] = useState('')

    const onDepChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setIsClicked(Platform.OS === 'ios')
        setDepDate(currentDate)

    }
    const onArrChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setIsClicked(Platform.OS === 'ios')
        setArrDate(currentDate)

    }

    //ADD TRIPPERZ NUMBER

    const [counter, setCounter] = useState(0);

    const handleAddClick = () => {
        setCounter(counter + 1);
    };

    const handleRemoveClick = () => {
        counter !== 0 && setCounter(counter - 1);
    };



    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.destination}>

                    <Text style={styles.destText}>Activities</Text>

                    <View style={styles.countrylist}>
                        <SelectList

                            setSelected={handleSelectCountry}
                            selectedCountry={selectedCountry}

                            setCitySelected={handleSelectCity}
                            selectedCity={selectedCity}

                        />

                    </View>

                </View>


                <View style={styles.date}>
                    <Text style={styles.dateText} >Date</Text>
                    <Text>

                        <DateTimePicker
                            style={styles.datePicker}
                            selectedItemColor='#D6DBDC'
                            mode='date'
                            display="default"
                            onChange={onDepChange}
                            value={depDate}
                        />
                        <DateTimePicker
                            style={styles.datePicker}
                            selectedItemColor='#D6DBDC'
                            mode='date'
                            display="default"
                            onChange={onArrChange}
                            value={arrDate}
                        />

                    </Text>







                </View>


                <View style={styles.addTripperz}>

                    <Text style={styles.textButton}>Add Tripperz</Text>
                    <View style={styles.buttons}>
                        <AntDesign name={'minuscircle'} size={30} color={'#000000'} onPress={() => handleRemoveClick()} />
                        <Text style={styles.counter}>{counter}</Text>
                        <AntDesign name={'pluscircle'} size={30} color={'#000000'} onPress={() => handleAddClick()} />
                    </View>

                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: '100%',
        marginTop: '5%',
    },

    destination: {
        width: '100%',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: '#D6DBDC',
        elevation: 6,
        contentWrapper: {
            borderRadius: 10,
            overflow: 'hidden', // Clip child elements that go beyond the wrapper
          },


    },
    destText: {
        color: 'red',
        margin: 15,
        color: '#D6DBDC'
    },
    dateText: {
        margin: 15
    },
    date: {

        borderWidth: 1,
        paddingBottom: 10,
        marginTop: '10%',
        shadowColor: '#000',
        shadowOffset: { width: +6, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: '#D6DBDC'
    },

    addTripperz: {
        padding: '5%',
        borderWidth: 1,
        borderColor: 'green',
        borderWidth: 1,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: +6, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: '#D6DBDC'

    },

    buttons: {
        flexDirection: 'row',


    },
    counter: {
        paddingRight: '20%',
        paddingLeft: '20%',


    }
});