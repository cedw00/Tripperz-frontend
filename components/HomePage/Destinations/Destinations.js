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
import { useState, useEffect } from "react";
import SelectedList from './SelectedList';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux';
import { getDuration } from '../../../reducers/search';





export default function Destinations(searchCountry, city) {
    const dispatch = useDispatch();


    //COUNTRY  DROPDOWN

    // const [selectedCountry, setSelectedCountry] = useState('');


    // const handleSelectCountry = (country) => {
    //     setSelectedCountry(country);
    //     searchCountry(country)

    // };

  
   

    // //countryToSearch(selectedCountry);

    // //City DROPDOWN

    // const [selectedCity, setSelectedCity] = useState(null);

    // console.log('selected city',selectedCity)
    // const handleSelectCity = (city) => {
    //     setSelectedCity(city);
      
    // }


    //DATE INPUT

    const [depDate, setDepDate] = useState(new Date());
    const [arrDate, setArrDate] = useState(new Date());


    const onDepChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setDepDate(currentDate)

    }
    const onArrChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setArrDate(currentDate)
    }

    useEffect(() => {
        const timeDifference = (arrDate - depDate);
        const start = moment(depDate).format('L');
        const end = moment(arrDate).format('L')
        const daysDifference = Math.floor(timeDifference / 86400000);
        const payload = {
            start: start,
            end: end,
            duration: daysDifference
        }
        dispatch(getDuration(payload));
    }, [depDate, arrDate])

console.log()

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

                    <Text style={styles.destText}>Destination</Text>

                    <View style={styles.countrylist}>
                        <SelectedList />

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
        shadowOffset: { width: +6, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: '#D6DBDC'



    },
    destText: {
        color: 'red',
        margin: 15,
        color: '#D6DBDC'
    },
    dateText: {

    },
    date: {

        borderWidth: 1,
        marginTop: '13%',
        shadowColor: '#000',
        shadowOffset: { width: +6, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: '#D6DBDC'
    },

    addTripperz: {
        borderWidth: 1,
        borderColor: 'green',
        borderWidth: 1,
        marginTop: '18%',
        paddingTop: '10%',
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