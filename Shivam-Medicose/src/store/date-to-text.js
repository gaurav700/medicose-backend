import { createSlice } from "@reduxjs/toolkit";

const dateToTextSlice = createSlice({
  name: 'dateToText',
  initialState: {
    filterDate: 'text',
    today: 'text',
  },
  reducers: {
    focusFilter: (state) => {
      state.filterDate = 'date';
    },
    focusToday: (state) => {
      state.today = 'date';
    },
    blurFilter: (state) => {
      state.filterDate = 'text';
    },
    blurToday: (state) => {
      state.today = 'text';
    },
  }
});

export const {focusFilter, focusToday, blurFilter, blurToday} = dateToTextSlice.actions;

export default dateToTextSlice;
