import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityCard: {
    cityName: null,
    cityImage: null,
    tripperz: [],
    dayDuration: [],
    daysPlan: [],
    allSizes: [],
  },
  value: [],
  cardToDelete: {
    cityName: null,
    cityImage: null,
  },
};

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    createTripCard: (state, action) => {
      state.cityCard.cityName = action.payload.name;
      state.cityCard.cityImage = action.payload.image;
    },
    confirmTripperList: (state, action) => {
      state.cityCard.tripperz = action.payload;
    },
    confirmDayDuration: (state, action) => {
      state.cityCard.dayDuration = action.payload;
    },
    confirmDaysPlan: (state, action) => {
      state.cityCard.daysPlan = action.payload;
    },
    confirmTripSizes: (state, action) => {
      state.cityCard.allSizes = action.payload;
    },
    updateNextTrips: (state) => {
      state.value.push(state.cityCard);
    },
    updateCardToDelete: (state, action) => {
      // This will require the use of a unique key as two trips can be in the same city
      state.cityCard.name = action.payload.name;
      state.cityCard.image = action.payload.image;
    },
    deleteTripCard: (state, action) => {
      // This will require the use of a unique key as two trips can be in the same city
      if (state.value.length > 0 && state.cardToDelete.cityName !== null) {
        const cardIndex = state.value.indexOf(state.cardToDelete);
        state.value.splice(cardIndex, 1);
      }
    },
  },
});

export const {
  createTripCard,
  updateNextTrips,
  updateCardToDelete,
  deleteTripCard,
  confirmTripperList,
  confirmDayDuration,
  confirmDaysPlan,
  confirmTripSizes
} = tripsSlice.actions;
export default tripsSlice.reducer;
