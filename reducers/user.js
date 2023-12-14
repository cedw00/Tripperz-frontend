import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: 
  {
    email: null,
    username: null,
    phone: null,
    birthday: null,
    gender: null,
    country: null,
    favoriteDestinations: [],
    favoriteFoods: null,
    hobbies: [],
    token: null
  },
};

export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   updateUser: (state, action) => {
     state.value.email = action.payload.email;
     state.value.username = action.payload.username;
     state.value.phone = action.payload.phone;
     state.value.token = action.payload.token;
   },
   updateProfile: (state, action) => {
    state.value.birthday = action.payload.birthday;
    state.value.gender = action.payload.gender;
    state.value.country = action.payload.country;
    state.value.favoriteDestinations = action.payload.favoriteDestinations;
    state.value.favoriteFoods = action.payload.favoriteFoods;
    state.value.hobbies = action.payload.hobbies;
   },
   logout: (state) => {
    state.value = {};
   }
 },
});

export const { updateUser, updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;