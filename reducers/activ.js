import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  plannedValue: [],
  tempActivities: [],
  tempActivString: "",
  activToSwitch: "",
  cardActiv: [],
  morningActiv: [],
  afternoonActiv: [],
  morningValue: null,
  afternoonValue: null,
  tripDuration: null
};

export const activSlice = createSlice({
  name: "activ",
  initialState,
  reducers: {
    updateActivList: (state, action) => {
      state.value = action.payload;
    },
    updatePlannedActivList: (state, action) => {
      state.plannedValue = action.payload;
    },
    updateTempActiv: (state, action) => {
      state.tempActivities = action.payload;
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
      state.morningValue = action.payload;
    },
    updateAfternoonValue: (state, action) => {
      state.afternoonValue = action.payload;
    },
    switchMorningActivity: (state, action) => {
      console.log('before', state.morningActiv);
      let activityToSwitch = state.morningActiv.indexOf(state.activToSwitch);
      state.morningActiv.splice(activityToSwitch, 1, state.tempActivString);
      console.log('after', state.morningActiv);
    },
    switchAfternoonActivity: (state, action) => {
      let activityToSwitch = state.afternoonActiv.indexOf(state.activToSwitch);
      state.afternoonActiv.splice(activityToSwitch, 1, state.tempActivString);
    },
    updateActivString: (state, action) => {
      state.tempActivString = action.payload;
    },
    updateActivToSwitch: (state, action) => {
      state.activToSwitch = action.payload;
    },
    switchingActivity: (state, action) => {
      if ((state.activToSwitch !== '') && (state.tempActivString !== '')) {
        let activityToSwitch = state.value.indexOf(state.activToSwitch);
        state.value.splice(activityToSwitch, 1, state.tempActivString);
        console.log('activities after switch', state.value)
      }
    },
    getTripDuration: (state, action) => {
      state.tripDuration = Math.floor(Math.random() * 30) + 1;
    },
    nullifyDuration: (state, action) => {
      state.tripDuration = null;
    }
  },
});

export const {
  updateActivList,
  updatePlannedActivList,
  updateTempActiv,
  updateCardActiv,
  updateMorningValue,
  updateAfternoonValue,
  updateMorningActiv,
  updateAfternoonActiv,
  switchMorningActivity,
  switchAfternoonActivity,
  updateActivString,
  updateActivToSwitch,
  switchingActivity,
  getTripDuration,
  nullifyDuration
} = activSlice.actions;
export default activSlice.reducer;
