import { createSlice } from "@reduxjs/toolkit";

// hideFilter
// none
// frequency
// All
// status
//
// sortBy
//
const categorySlice = createSlice({
  name: "auth",
  initialState: {
    category: {},
    subCategory: [],
    eventCategory: [],
    selectSubCategory: {},
    isEvent: false,
    filters: {
      search: "",
      frequency: "all",
      status: "Active",
      sortBy: "newest",
      hideFilter: {
        sports: false,
        crypto: false,
        earnings: false,
      },
    },
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
    changeFilter: (state: any, action) => {
      const { key, subKey, value } = action.payload;

      // hideFilter (nested toggle / set)
      if (key === "hideFilter" && subKey) {
        state.filters.hideFilter[subKey] =
          typeof value === "boolean"
            ? value
            : !state.filters.hideFilter[subKey];
        return;
      }

      // normal filters (frequency, status, sortBy)
      state.filters[key] = value;
    },

    resetFilters: (state: any) => {
      state.filters = {
        frequency: "All",
        search: "",
        status: "Active",
        sortBy: "Newest",
        hideFilter: {
          sports: false,
          crypto: false,
          earnings: false,
        },
      };
    },
  },
});

export const {
  saveCategory,
  saveSubCategory,
  saveEventCategory,
  saveSelectSubCategory,
  changeIsEvent,
  changeFilter,
  resetFilters,
} = categorySlice.actions;
export default categorySlice.reducer;
