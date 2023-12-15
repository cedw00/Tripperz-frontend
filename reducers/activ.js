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
  tripDuration: null,
  activitiesSet: [],
  sizes: {},
  sizesArray: []
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
    updateMorningValue: (state, action) => {
      state.morningValue = action.payload;
    },
    updateAfternoonValue: (state, action) => {
      state.afternoonValue = action.payload;
    },
    switchMorningActivity: (state, action) => {
      console.log("before", state.morningActiv);
      let activityToSwitch = state.morningActiv.indexOf(state.activToSwitch);
      state.morningActiv.splice(activityToSwitch, 1, state.tempActivString);
      console.log("after", state.morningActiv);
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
      if (state.activToSwitch !== "" && state.tempActivString !== "") {
        let activityToSwitch = action.payload.indexOf(state.activToSwitch);
        action.payload.splice(activityToSwitch, 1, state.tempActivString);
        console.log("activities after switch", action.payload);
      }
    },
    getTripDuration: (state, action) => {
      state.tripDuration = Math.floor(Math.random() * 30) + 1;
    },
    nullifyDuration: (state, action) => {
      state.tripDuration = null;
    },
    addDayPlan: (state, action) => { 
      state.activitiesSet.push(action.payload);
    },
    saveSizes: (state, action) => {
      state.sizes = action.payload
    },
    pushSizes: (state, action) => {
      state.sizesArray.push(action.payload);
    },
  },
});

export const {
  updateActivList,
  updatePlannedActivList,
  updateTempActiv,
  updateCardActiv,
  updateMorningValue,
  updateAfternoonValue,
  switchMorningActivity,
  switchAfternoonActivity,
  updateActivString,
  updateActivToSwitch,
  switchingActivity,
  addDayPlan,
  getTripDuration,
  nullifyDuration,
  saveSizes,
  updateMorningSize,
  updateAfternoonSize,
  pushSizes
} = activSlice.actions;
export default activSlice.reducer;
