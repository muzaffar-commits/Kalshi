import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isAuth: false, isLeft: "right" },
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.isLeft = "left";
    },
    login: (
      state: any,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      const { user, token } = action.payload;
      console.log(user, token, "user, token");

      state.user = user;
      state.token = token;
      state.isAuth = true;
    },
    logout: (state: any) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      toast.success("User Logged Out");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
