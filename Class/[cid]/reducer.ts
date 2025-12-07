import { createSlice } from "@reduxjs/toolkit";
import { Posts } from "./DataStructure";
import { posts, followups, replies } from "../../../(Kambaz)/Database";

const initialState = {
  posts: posts,
  showSidebar: true,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setPosts: (state, { payload:posts }) => {
      state.posts = posts; 
    },

    updatePost: (state, { payload:post }) => {
      state.posts = state.posts.map((p) =>
        p._id === post._id ? post : p
      );
    },

    getPostsFromClass: (state, { payload: courseId }) => {
      state.posts = posts.filter((p) => p.course === courseId);
    },

    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { getPostsFromClass, toggleSidebar, setPosts } =
  classSlice.actions;
export default classSlice.reducer;
