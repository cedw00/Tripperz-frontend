import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';

function SelectedList(props) {
  const {   } = props;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        const countryData = response.data.data;
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);


  let countrylist = countries.map((country, i) => ({ key: i, value: country.country }));

  let citiesList = [];

  const setCountrySelected = (value) => {
    setSelected(value)
   // onCountrySelect(countrylist[value]?.value);

  }
  

  if (setCountrySelected) {
    const selectedCities = countries.find(item => item.country === countrylist[selectedCountry].value);
    
    console.log('selectedCountry',selectedCities)

    citiesList = selectedCities.cities;
  }

  let citylist = citiesList.map((city, i) => ({ key: i, value: city }));

  // SELECT COUNTRY AND CITY



  const setCitySelected = (value => {
    setSelected(value)
  })
  return (

    <View style={styles.container}>


      <SelectList

        setSelected={setCountrySelected}
        data={countrylist}
        dropdownStyles={{ borderColor: '#D6DBDC', }}
        search={true}
        placeholder={'Select country'}
        boxStyles={{
          borderWidth: 1,
          borderColor: '#D6DBDC',
          color: '#D6DBDC',
          margin: 15,
        }}


      />

      <SelectList

        setSelected={setCitySelected}
        data={citylist}
        dropdownStyles={{ borderColor: '#D6DBDC', }}
        search={true}
        placeholder={'Select city'}
        boxStyles={{
          borderWidth: 1,
          borderColor: '#D6DBDC',
          margin: 15,
        }}
      />
    </View>

  );
}


const styles = StyleSheet.create({


});

export default SelectedList;