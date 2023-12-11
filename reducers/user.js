import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: 
  {
    email: null,
    pseudo: null,
    phone: null,
    birthday: null,
    gender: null,
    homeCountry: null,
    favoriteCountry: null,
    favoriteFood: null,
    password: null,
    interests: [],
  },
};

export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   updateUser: (state, action) => {
     state.value.email = action.payload.email;
     state.value.pseudo = action.payload.pseudo;
     state.value.phone = action.payload.phone;
     state.value.password = action.payload.password;
   },
   updateProfile: (state, action) => {
    state.value.birthday = action.payload.birthday;
    state.value.gender = action.payload.gender;
    state.value.homeCountry = action.payload.homeCountry;
    state.value.favoriteCountry = action.payload.favoriteCountry;
    state.value.favoriteFood = action.payload.favoriteFood;
    state.value.interests = action.payload.interests;
   },
   logout: (state) => {
    state.value = {};
   }
 },
});

export const { updateUser, updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;