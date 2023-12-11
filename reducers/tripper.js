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
 },
});

export const { updateTripperList } = tripperSlice.actions;
export default tripperSlice.reducer;