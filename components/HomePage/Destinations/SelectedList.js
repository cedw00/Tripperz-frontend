import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch } from 'react-redux';
import { addCountry } from '../../../reducers/search';
import { addCity } from '../../../reducers/search';
import { addCityList } from '../../../reducers/search';
import { addCountryList } from '../../../reducers/search';





function SelectedList({ getData }) {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const dispatch = useDispatch();


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
  dispatch(addCountryList(countrylist));


 // SELECT COUNTRY AND CITY

  let citiesList = [];

  const handleCountrySelected = (value) => {
    setSelectedCountry(value)
    const searchCountry = countrylist[value].value;
    dispatch(addCountry(searchCountry));
    getData(searchCountry)
    
  }


  if (selectedCountry !== null) {

    const selectedCities = countries.find(item => item.country === countrylist[selectedCountry].value);

    citiesList = selectedCities.cities;

    dispatch(addCityList(citiesList))
  }

  let citylist = citiesList.map((city, i) => ({ key: i, value: city }));


  const setCitySelected = (value => {

    setSelectedCity(value)
    dispatch(addCity(citylist[value].value));
  })


  return (

    <View style={styles.container}>

      <Text style={styles.title}>Country</Text>

      <SelectList

        setSelected={handleCountrySelected}
        data={countrylist}
        dropdownStyles={{ borderColor: 'rgba(6, 113, 136, 1)', }}
        search={true}
        placeholder={'Select country'}
        boxStyles={{
          borderWidth: 1,
          borderColor: 'rgba(6, 113, 136, 1)',
          color: 'rgba(6, 113, 136, 1)',
          marginLeft: 15,
          marginRight:15,
          marginBottom:10,
        }}


      />
     
      <Text style={styles.title}>City</Text>

      <SelectList

        setSelected={setCitySelected}
        data={citylist}
        dropdownStyles={{ borderColor: 'rgba(6, 113, 136, 1)', }}
        search={true}
        placeholder={'Select city'}
        boxStyles={{
          borderWidth: 1,
          borderColor: 'rgba(6, 113, 136, 1)',
          marginLeft: 15,
          marginRight:15,
          marginBottom:'10%',
        }}
        dropdownShown={false}
      />
    </View>

  );
}


const styles = StyleSheet.create({
  title: {
    color: 'rgba(6, 113, 136, 1)',
    fontWeight: 'bold',
    marginLeft: '5%',
  marginBottom:'5%',


  }

});

export default SelectedList;