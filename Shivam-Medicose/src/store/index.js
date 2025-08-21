import {configureStore} from "@reduxjs/toolkit";
import dateToTextSlice from "./date-to-text";


const medicoseStore = configureStore({
  reducer :{ 
    dateToText : dateToTextSlice.reducer,
  }
})

export default medicoseStore;