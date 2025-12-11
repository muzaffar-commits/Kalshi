import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const categorySlice = createSlice({
  name: "auth",
  initialState: { category: {} },
  reducers: {
    saveCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { saveCategory } = categorySlice.actions;
export default categorySlice.reducer;
