import { createSlice } from "@reduxjs/toolkit";
import { Posts } from "./DataStructure";

const initialState = {
  posts: [] as Posts[],
  showSidebar: true,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setPosts: (state, { payload: posts }) => {
      state.posts = posts;
    },
    updatePost: (state, { payload: post }) => {
      state.posts = state.posts.map((p) => (post.id === p.id ? post : p));
    },
    getPostsFromClass: (state, action) => {},
    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});
export const { getPostsFromClass, toggleSidebar, setPosts } =
  classSlice.actions;
export default classSlice.reducer;
