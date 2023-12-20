import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import Constants from 'expo-constants';


const backend = Constants.expoConfig.hostUri.split(`:`)[0];

const ActivityPicker = ({ }) => {
  const [Types, setTypes] = useState([]);
  const [Activities, setActivities] = useState ([])
  const [selectedType, setSelectedType] =  useState (null)
  const [selectedActivity, setSelectedActivity] =  useState (null)

  useEffect(() => {
    let activTypes = [];
    const fetchTypes = async () => {
      try {
        const response = await fetch(`http://${backend}/countries/Allcountries`);
        const countryData = await response.json();
        console.log(countryData);
        // setTypes(countryData.activTypes)
        // setActivities(countryData.activities)

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchTypes();
  }, []);

  // SELECT ACTIVITY TYPE

  const handleTypeSelected = (value) => {
    setSelectedType(value)
    // const searchCountry = countrylist[value].value;
    // dispatch(addCountry(searchCountry));
    // getData(searchCountry)
    
  }



   // SELECT ACTIVITY

   const handleActivitySelected = (value) => {
    setSelectedActivity(value)
    // const searchCountry = countrylist[value].value;
    // dispatch(addCountry(searchCountry));
    // getData(searchCountry)
    
  }

  // let countrylist = countries.map((country, i) => ({ key: i, value: country.country }));
  // let citiesList = [];

  // if (selectedCountry !== null) {
  //   const selectedCities = countries.find(item => item.country === countrylist[selectedCountry].value);

  //   citiesList = selectedCities.cities;
  // }

  // let citylist = citiesList.map((city, i) => ({ key: i, value: city }));

  // SELECT COUNTRY AND CITY


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Trip Style</Text>

      <SelectList

        setSelected={(value) => {handleTypeSelected}}
        data={Types}
        dropdownStyles={{ borderColor: '#D6DBDC', }}
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
        data={Activities}
        dropdownStyles={{ borderColor: '#D6DBDC', }}
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
