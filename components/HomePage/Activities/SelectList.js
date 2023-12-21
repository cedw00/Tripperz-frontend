import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { addActivityType } from '../../../reducers/activSearch';
import { addActivity } from '../../../reducers/activSearch';


const backend = Constants.expoConfig.hostUri.split(`:`)[0];

const ActivityPicker = ({ getData}) => {

  const dispatch = useDispatch();

  const [Types, setTypes] = useState([]);
  const [Activities, setActivities] = useState([])
  const [finalList, setFinalList] = useState([{ key: 0, value: 'No data found' }])
  const [selectedActivity, setSelectedActivity] = useState(null)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`http://${backend}:3000/countries/Allcountries`);
        const countryData = await response.json();
        setTypes(countryData.activTypes)
        setActivities(countryData.activities)

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchTypes();

  }, []);

  // SELECT ACTIVITY TYPE

  const handleTypeSelected = (value) => {
    const searchType = Types[value].value;
    console.log('search Type',searchType)
    const activityList = Activities.filter((element) => element.Type === searchType)
  
    const finalList = activityList.map(({ key, value }) => ({ key, value }))
    setFinalList(finalList)
    dispatch(addActivityType(searchType));
    getData(searchType)
  }



  // SELECT ACTIVITY

  const handleActivitySelected = (value) => {
    setSelectedActivity(value)
    const searchActivities = Activities[value].value;
    dispatch(addActivity(searchActivities));
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Activity Type</Text>

      <SelectList

        setSelected={handleTypeSelected}
        data={Types}
        dropdownStyles={{ borderColor: 'rgba(6, 113, 136, 1)', }}
        search={true}
        placeholder={'Select Style'}
        boxStyles={{
          borderWidth: 1,
          borderColor: 'rgba(6, 113, 136, 1)',
          color: 'rgba(6, 113, 136, 1)',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 10,
        }}



      />
      <Text style={styles.title}>Activity</Text>
      <SelectList

        setSelected={handleActivitySelected}
        data={finalList}
        dropdownStyles={{ borderColor: 'rgba(6, 113, 136, 1)', }}
        search={true}
        placeholder={'Select Activity'}
        boxStyles={{
          borderWidth: 1,
          borderColor: 'rgba(6, 113, 136, 1)',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: '10%',
        }}

      />
    </View>

  );
};


const styles = StyleSheet.create({
  title: {
    color: 'rgba(6, 113, 136, 1)',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '5%',
  }

});

export default ActivityPicker;
