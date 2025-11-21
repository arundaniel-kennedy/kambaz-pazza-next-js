import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    getPostsFromClass: (state, action) => {},
    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});
export const { getPostsFromClass,toggleSidebar } = classSlice.actions;
export default classSlice.reducer;
