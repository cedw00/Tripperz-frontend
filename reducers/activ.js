import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
 plannedValue: [],
 tempActivities: [],
 tempActivString: '',
 cardActiv: [],
 morningActiv: [],
 afternoonActiv: [],
 morningValue: null,
 afternoonValue: null,
  };

export const activSlice = createSlice({
 name: 'activ',
 initialState,
 reducers: {
   updateActivList: (state, action) => {
     state.value = action.payload;
   },
   updatePlannedActivList: (state, action) => {
    state.plannedValue = action.payload;
  },
   updateTempActiv: (state, action) => {
    state.tempActivities = action.payload
   },
   updateCardActiv: (state, action) => {
    state.cardActiv.push(action.payload);
   },
   updateMorningActiv: (state, action) => {
    state.morningActiv = action.payload;
   },
   updateAfternoonActiv: (state, action) => {
    state.afternoonActiv = action.payload;
   },
   updateMorningValue: (state, action) => {
    state.morningValue = action.payload
   },
   updateAfternoonValue: (state, action) => {
    state.afternoonValue = action.payload
   },
   switchFunction: (state, action) => {
    state.tempActivString = action.payload
   }
 },
});

export const { updateActivList, updatePlannedActivList, updateTempActiv, updateCardActiv, updateMorningValue, updateAfternoonValue, updateMorningActiv, updateAfternoonActiv, switchFunction } = activSlice.actions;
export default activSlice.reducer;