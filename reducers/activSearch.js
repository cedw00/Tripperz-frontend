import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value:
  {
   activityType: '',
   activity: '',

   start: null,
   end: null,
   duration: null,

   trippers:null,
  },
};

export const searchSlice = createSlice({
  name: 'activSearch',
  initialState,
  reducers: {
    addActivityType: (state, action) => {
      state.value.activityType = action.payload;
    },
    addActivity: (state, action) => {
      state.value.activity = action.payload;
    },
    getDuration: (state, action) => {
      state.value.start = action.payload.start;
      state.value.end = action.payload.end;
      state.value.duration = action.payload.duration;
    },
    addTrippers:(state, action) => {
      state.value.trippers = action.payload
   
    },

  },

});

export const { addActivityType, addActivity ,getDuration , addTrippers} = searchSlice.actions;
export default searchSlice.reducer;