import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';


const backend = Constants.expoConfig.hostUri.split(`:`)[0];

const ActivityPicker = ({ }) => {

  const dispatch = useDispatch();

  const [Types, setTypes] = useState([]);
  const [Activities, setActivities] = useState([])
  const [finalList, setFinalList] = useState([{ key: 0, value: 'No data found' }])
  const [selectedType, setSelectedType] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)

  useEffect(() => {
    let activTypes = [];
    const fetchTypes = async () => {
      try {
        const response = await fetch(`http://${backend}:3000/countries/Allcountries`);
        const countryData = await response.json();
        console.log('countrydata ', countryData)
        setTypes(countryData.activTypes)
        setActivities(countryData.activities)

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchTypes();

  }, []);

  // SELECT ACTIVITY TYPE
  let activityList = [];




  const handleTypeSelected = (value) => {
    setSelectedType(value)
    const searchType = Types[value].value;
    const activityList = Activities.filter((element) => element.Type === searchType)
    console.log('activity list', activityList)
    const finalList = activityList.map(({ key, value }) => ({ key, value }))
    setFinalList(finalList)
    // dispatch(addCountry(searchCountry));
    // getData(searchCountry)
  }

  console.log('final list', finalList)

  // SELECT ACTIVITY

  const handleActivitySelected = (value) => {
    setSelectedActivity(value)
    const searchActivities = Activities[value].value;

    // dispatch(addCountry(searchCountry));
    // getData(searchCountry)

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
          margin: 15,
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
          color: 'rgba(6, 113, 136, 1)',
          margin: 15,
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


  }

});

export default ActivityPicker;
