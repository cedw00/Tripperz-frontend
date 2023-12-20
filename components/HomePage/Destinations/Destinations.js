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
import SelectedList from './SelectedList';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector, useDispatch } from 'react-redux';
import { getDuration } from '../../../reducers/search';
import { addTrippers } from '../../../reducers/search';



export default function Destinations({ navigation }) {

    const dispatch = useDispatch();



    const [errMsg, setErrMsg] = useState('')
    const [depDate, setDepDate] = useState(new Date());
    const [arrDate, setArrDate] = useState(new Date());
    const [counter, setCounter] = useState(0);
    const [country, setCountry] = useState('')




    useEffect(() => {

        if (country !== '') {
            setErrMsg('');
        }
    }, [country]);

    const getData = (data) => {
        setCountry(data)
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

       
        if (country === '') {
            setErrMsg('It looks like you forgot to choose a country !')
        }
        else {
            dispatch(addTrippers(counter))
            navigation.navigate('Result')
        }

    }

    const handleTopDest = () => {
        navigation.navigate('TopDestionations')
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={styles.destination}>
                    <Text style={styles.destText}>Destination</Text>

                    <View style={styles.countrylist}>

                        <SelectedList getData={getData} />

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
                <View style={styles.submits}>
                    <TouchableOpacity style={styles.search} activeOpacity={0.8} onPress={() => handleSearch()}>
                        <Text style={styles.searchText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topDest} activeOpacity={0.8} onPress={() => handleTopDest()}>
                        <Text style={styles.topDestText}>     Top {"\n"} Destinations</Text>
                        <AntDesign name={'star'} size={30} style={styles.star} />
                    </TouchableOpacity>
                </View>

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

    destination: {
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

    destText: {
        marginTop: '5%',
        marginLeft: 15,
        color: 'rgba(6, 113, 136, 1)',
        fontWeight: 'bold',
        fontSize: 17,
    },

    date: {

        borderWidth: 2,
        paddingBottom: 10,
        backgroundColor: '#DEDEDE',
        marginTop: '5%',
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
        marginTop: '5%',
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
    submits: {
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    search: {
        height: '40%',
        width: '40%',
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'rgba(6, 113, 136, 1)',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#DEDEDE',
        borderRadius: 8,
        marginBottom: '10%',
        marginTop: '5%',
        marginRight: '5%'
    },
    searchText: {
        color: 'rgba(6, 113, 136, 1)',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    topDest: {
        height: '40%',
        width: '40%',
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
    topDestText: {
        top:'30%',
        left:5,
        alignSelf: 'flex-start',
        color:'rgba(6, 113, 136, 1)',
        fontWeight:'bold',
    },
    star: {
        bottom: '40%',
        right: '5%',
        color: '#D4AF37',
        alignSelf: 'flex-end'
    }
});