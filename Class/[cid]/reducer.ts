import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
        getPostsFromClass: (state, action) => {

        },
    },
});
export const { getPostsFromClass } = classSlice.actions;
export default classSlice.reducer;