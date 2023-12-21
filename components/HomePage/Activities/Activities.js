import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'moment/locale/fr';
import { useState } from "react";
import SelectList from './SelectList';
import AntDesign from 'react-native-vector-icons/AntDesign'




export default function Activities() {


    //ACTIVITY TYPE  DROPDOWN

    const [selectedType, setSelectedType] = useState(null);

    const handleSelectedType = (country) => {
        setSelectedType(country);

    };


    //ACTIVITIES DROPDOWN

    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleSelectedActivity = (city) => {
        setSelectedActivity(city);

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

                <View style={styles.activities}>

                    <Text style={styles.activText}>Activities</Text>

                    <View>
                        <SelectList

                            setSelected={handleSelectedType}
                            selectedCountry={selectedType}

                            setCitySelected={handleSelectedActivity}
                            selectedCity={selectedActivity}

                        />

                    </View>

                </View>


                <View style={styles.date}>
                    <Text style={{ color: 'rgba(6, 113, 136, 1)', margin: 10,fontWeight: 'bold',fontSize: 17, }} >Date</Text>
                    <Text style={styles.dateBorder}>

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
        marginBottom:'10%',
        marginTop:'5%'
    },
    searchText: {
        color: 'rgba(6, 113, 136, 1)',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
});