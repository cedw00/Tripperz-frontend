import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import { useDispatch } from 'react-redux';
import { addCountry } from '../../../reducers/search';
import { addCity } from '../../../reducers/search';
import { addCityList } from '../../../reducers/search';
import { addCountryList } from '../../../reducers/search';





function SelectedList() {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
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


  let citiesList = [];

  const handleCountrySelected = (value) => {
    setSelectedCountry(value)
    const searchCountry = countrylist[value].value;
    dispatch(addCountry(searchCountry));

  }





  if (selectedCountry !== '') {

    const selectedCities = countries.find(item => item.country === countrylist[selectedCountry].value);

    citiesList = selectedCities.cities;

    dispatch(addCityList(citiesList))
  }

  let citylist = citiesList.map((city, i) => ({ key: i, value: city }));


  const setCitySelected = (value => {

    setSelectedCity(value)
    dispatch(addCity(citylist[value].value));
  })

  // SELECT COUNTRY AND CITY



  return (

    <View style={styles.container}>


      <SelectList

        setSelected={handleCountrySelected}
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
        dropdownShown={false}
        
      />
    </View>

  );
}


const styles = StyleSheet.create({


});

export default SelectedList;