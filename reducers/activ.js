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
  morningValue: 2,
  afternoonValue: 4,
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
    updateSizes: (state, action) => {          
      const { dayPayload, morningPayload, afternoonPayload } = action;   
      let setMorning = state.sizesArray[dayPayload][0];
      let setAfternoon = state.sizesArray[dayPayload][1];
      state.sizesArray[dayPayload].splice(setMorning, 1, morningPayload);
      state.sizesArray[dayPayload].splice(setAfternoon, 1, afternoonPayload);
    },
    increaseMorning: (state, action) => {
      state.sizesArray[action.payload][0] += 1
    },
    increaseAfternoon: (state, action) => {
      state.sizesArray[action.payload][1] += 1
    },
    decreaseMorning: (state, action) => {
      if (state.sizesArray[action.payload][0] > 0) {
        state.sizesArray[action.payload][0] -= 1
      } else {
        state.sizesArray[action.payload][0] = 1
      }
    },
    decreaseAfternoon: (state, action) => {
      if (state.sizesArray[action.payload][1] > 0) {
        state.sizesArray[action.payload][1] -= 1
      } else {
        state.sizesArray[action.payload][1] = 1
      }
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
        let activityToSwitch = state.activitiesSet[action.payload].indexOf(state.activToSwitch);
        state.activitiesSet[action.payload].splice(activityToSwitch, 1, state.tempActivString);
        console.log("activities after switch", state.activitiesSet[action.payload]);
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
    emptySizes: (state, action) => {
      state.sizesArray = []
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
  emptySizes,
  updateMorningSize,
  updateAfternoonSize,
  pushSizes,
  updateSizes,
  increaseMorning,
  increaseAfternoon,
  decreaseMorning,
  decreaseAfternoon
} = activSlice.actions;
export default activSlice.reducer;
