import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value:
  {
    country: '',

    city: null,
    countryList:[],
    cityList: [],
 
    duration: null,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.value.country = action.payload;
    },
    addCity: (state, action) => {
      state.value.city = action.payload;
    },
    addCountryList: (state, action) => {
      state.value.countryList=action.payload
     
    },
    addCityList: (state, action) => {
      state.value.cityList=action.payload
    
    },
  

  },

});

export const { addCountry, addCity,addCityList, addCountryList } = searchSlice.actions;
export default searchSlice.reducer;