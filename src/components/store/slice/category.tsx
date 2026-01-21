import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "auth",
  initialState: {
    category: {},
    subCategory: [],
    eventCategory: [],
    selectSubCategory: {},
    isEvent: false,
  },
  reducers: {
    saveCategory: (state, action) => {
      state.category = action.payload;
    },
    saveSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    saveEventCategory: (state, action) => {
      state.eventCategory = action.payload;
    },
    saveSelectSubCategory: (state, action) => {
      state.selectSubCategory = action.payload;
    },
    changeIsEvent: (state, action) => {
      state.isEvent = action.payload;
    },
  },
});

export const {
  saveCategory,
  saveSubCategory,
  saveEventCategory,
  saveSelectSubCategory,
  changeIsEvent,
} = categorySlice.actions;
export default categorySlice.reducer;
