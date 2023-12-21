import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
  };

export const tripperSlice = createSlice({
 name: 'tripper',
 initialState,
 reducers: {
   updateTripperList: (state, action) => {
     state.value.push(action.payload);
   },
   emptyTripperList: (state) => {
    state.value = [];
   }
 },
});

export const { updateTripperList, emptyTripperList } = tripperSlice.actions;
export default tripperSlice.reducer;