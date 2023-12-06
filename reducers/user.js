import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: 
  {
    email: null,
    pseudo: null,
    phone: null,
    birthday: null,
    gender: null,
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
    state.value.interests = action.payload.interests;
   }
 },
});

export const { updateUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;