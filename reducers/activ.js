import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
  };

export const activSlice = createSlice({
 name: 'activ',
 initialState,
 reducers: {
   updateActivList: (state, action) => {
     state.value = action.payload;
   },
 },
});

export const { updateActivList } = activSlice.actions;
export default activSlice.reducer;