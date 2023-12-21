import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/fr';
import { useState, useEffect } from "react";
import SelectList from './SelectList';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux';
import { getDuration } from '../../../reducers/activSearch';
import { addTrippers } from '../../../reducers/activSearch';




export default function Activities({ navigation }) {

    const dispatch = useDispatch();

    const [errMsg, setErrMsg] = useState('')
    const [depDate, setDepDate] = useState(new Date());
    const [arrDate, setArrDate] = useState(new Date());
    const [counter, setCounter] = useState(0);
    const [activityType, setActivityType] = useState('')


    useEffect(() => {

        if (activityType !== '') {
            setErrMsg('');
        }
    }, [activityType]);


    const getData = (data) => {
      
        setActivityType(data)
    }



    //DATE INPUT

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


    //ADD TRIPPERZ NUMBER

    const handleAddClick = () => {
        setCounter(counter + 1);
    };

    const handleRemoveClick = () => {
        counter !== 0 && setCounter(counter - 1);
    };


    //SEARCH + ERR MESSAGE

    const handleSearch = () => {


        if (activityType === '') {
            setErrMsg('Please choose a Type of activity !')
        }
        else {
            dispatch(addTrippers(counter))
            navigation.navigate('ActivitiesResult')
        }

    }


    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.activities}>

                    <Text style={styles.activText}>Activities</Text>
                    <View style={styles.countrylist}>

                        <SelectList getData={getData} />

                    </View>
                    <View>
                        <Text style={{ color: 'red', alignSelf: 'center', bottom: '70%' }}>{errMsg}</Text>
                    </View>

                </View>

                <View style={styles.date}>
                    <Text style={{ color: 'rgba(6, 113, 136, 1)', margin: 10, fontWeight: 'bold', fontSize: 17, }} >Date</Text>
                    <Text style={styles.dateBorder}>

                        <DateTimePicker
                            style={styles.datePicker}
                            selectedItemColor='#D6DBDC'
                            mode='date'
                            display="default"
                            onChange={onDepChange}
                            value={depDate}
                            minimumDate={new Date()}
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
                    <Text style={{ color: '#000000', top: '-10%' }}>Add Tripperz</Text>
                    <View style={styles.buttons}>
                        <AntDesign name={'minuscircle'} size={30} color={'rgba(6, 113, 136, 1)'} onPress={() => handleRemoveClick()} />
                        <Text style={styles.counter}>{counter}</Text>
                        <AntDesign name={'pluscircle'} size={30} color={'rgba(6, 113, 136, 1)'} onPress={() => handleAddClick()} />
                    </View>
                </View>


                <TouchableOpacity style={styles.search} activeOpacity={0.8} onPress={() => handleSearch()}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',

    },

    activities: {
        width: '100%',
        borderWidth: 2,
        backgroundColor: '#DEDEDE',
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: 'rgba(6, 113, 136, 1)',
    },

    activText: {
        margin: 15,
        color: 'rgba(6, 113, 136, 1)',
        fontWeight: 'bold',
        fontSize: 17,
    },

    dateText: {
        margin: 15
    },
    date: {

        borderWidth: 2,
        paddingBottom: 10,
        backgroundColor: '#DEDEDE',
        marginTop: '10%',
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: 'rgba(6, 113, 136, 1)'
    },

    dateBorder: {
        borderWidth: 1,
        borderColor: 'rgba(6, 113, 136, 1)',
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        marginBottom: '5%'

    },

    addTripperz: {
        padding: '5%',
        borderWidth: 1,
        backgroundColor: '#DEDEDE',
        borderWidth: 2,
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: +6, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 10,
        borderColor: 'rgba(6, 113, 136, 1)'

    },

    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    counter: {
        paddingRight: '20%',
        paddingLeft: '20%',
        color: 'rgba(6, 113, 136, 1)'
    },
    search: {
        height: '8%',
        width: '60%',
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'rgba(6, 113, 136, 1)',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#DEDEDE',
        borderRadius: 8,
        marginBottom: '10%',
        marginTop: '5%'
    },
    searchText: {
        color: 'rgba(6, 113, 136, 1)',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});