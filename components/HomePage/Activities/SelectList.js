import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';


const CountryPicker = ({ setSelected, selectedCountry, setCitySelected, setCountry }) => {
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
  
    if (selectedCountry !== null) {
      const selectedCities = countries.find(item => item.country === countrylist[selectedCountry].value);
  
      citiesList = selectedCities.cities;
    }
  
    let citylist = citiesList.map((city, i) => ({ key: i, value: city }));
  
    // SELECT COUNTRY AND CITY
  
  
    return (
  
      <View style={styles.container}>
  
  
        <SelectList
  
          setSelected={(value) => {setSelected(value)}}
          data={countrylist}
          dropdownStyles={{ borderColor: '#D6DBDC',}}
          search={true}
          placeholder={'Select activity'}
          boxStyles={{
            borderWidth: 1,
            borderColor: '#D6DBDC',
            color: '#D6DBDC',
            margin:15,
          }}
         
         
       
        />
  
        <SelectList
  
          setSelected={(value) => setCitySelected(value)}
          data={citylist}
          dropdownStyles={{ borderColor: '#D6DBDC', }}
          search={true}
          placeholder={'Sub-Activity'}
          boxStyles={{
            borderWidth: 1,
            borderColor: '#D6DBDC',
            margin: 15,
          }}
        />
      </View>
  
    );
  };
  
  const styles = StyleSheet.create({
  
  
  });
  
  export default CountryPicker;
