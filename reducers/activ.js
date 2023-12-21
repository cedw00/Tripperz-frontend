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
  tripDuration: [],
  activitiesSet: [],
  sizes: {},
  sizesArray: [],
  dayPlan: [],
  tripId: null,
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
      state.cardActiv = action.payload;
    },
    updateMorningValue: (state, action) => {
      state.morningValue = action.payload;
    },
    updateAfternoonValue: (state, action) => {
      state.afternoonValue = action.payload;
    },
    getTripId: (state, action) => {          
      state.tripId = action.payload;
    },
     deleteMorningActivity: (state, action) => {
      const {payload1, payload2} = action;
      state.sizesArray[payload1][0].splice(payload2, 0)
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
    updateDayPlan: (state, action) => {
      state.activitiesSet = action.payload;
    },
    getTripDuration: (state, action) => {
      state.tripDuration = action.payload
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
    emptyActivities: (state, action) => {
      state.activitiesSet = []
    },
    pushSizes: (state, action) => {
      state.sizesArray.push(action.payload);
    },
    updateSizes: (state, action) => {
      state.sizesArray = action.payload;
    },
    resetId: (state, action) => {
      state.tripId = null;
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
  decreaseAfternoon,
  emptyActivities,
  deleteMorningActivity,
  getTripId,
  resetId,
  updateDayPlan,
} = activSlice.actions;
export default activSlice.reducer;
