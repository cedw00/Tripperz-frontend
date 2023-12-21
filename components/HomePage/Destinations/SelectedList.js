import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch } from 'react-redux';
import { addCountry } from '../../../reducers/search';
import { addCity } from '../../../reducers/search';
import { addCityList } from '../../../reducers/search';
import { addCountryList } from '../../../reducers/search';
import Constants from 'expo-constants';




const backend = Constants.expoConfig.hostUri.split(`:`)[0]


function SelectedList({ getData }) {

  //const { city } = useSelector((state) => state.search.value)

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  
// CREATING COUNTRIES LIST

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`http://${backend}:3000/countries/Allcountries`);
        const countryData = await response.json();
        const data = countryData.countries;
        const countries = data.map((element, i) => ({ key: i, value: element.country }))
        setData(data)
        setCountries(countries)

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchTypes();

  }, []);


  dispatch(addCountryList(countries));




  //SELECT A COUNTRY

  const handleCountrySelected = (value) => {
    setSelectedCountry(value)
    const searchCountry = countries[value].value;
    dispatch(addCountry(searchCountry));
    getData(searchCountry)
  }


// CREATING CITIES LIST


  let citiesList = [];

  if (selectedCountry !== null) {
    const selectedCities = data.find((item) => item.country === countries[selectedCountry].value);
    citiesList = selectedCities.cities;
    console.log('citiesList',citiesList)
    dispatch(addCityList(citiesList))
  }


  let citylist = citiesList.map((city, i) => ({ key: i, value: city.name }));


// SELECT A CITY

  const setCitySelected = (value => {
    setSelectedCity(value);
    console.log('selected city', citylist[value].value)
    dispatch(addCity(citylist[value].value));
  })


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Country</Text>
      <SelectList
        setSelected={handleCountrySelected}
        data={countries}
        dropdownStyles={{ borderColor: 'rgba(6, 113, 136, 1)', }}
        search={true}
        placeholder={'Select country'}
        boxStyles={{
          borderWidth: 1,
          borderColor: 'rgba(6, 113, 136, 1)',
          color: 'rgba(6, 113, 136, 1)',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 10,
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
          marginRight: 15,
          marginBottom: '10%',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'rgba(6, 113, 136, 1)',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '5%',
  }
});

export default SelectedList;