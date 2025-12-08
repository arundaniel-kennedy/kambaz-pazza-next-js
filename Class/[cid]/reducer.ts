import { createSlice } from "@reduxjs/toolkit";
import { posts } from "../../data"

const initialState = {
  posts: posts,
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
      state.posts = state.posts.map((p) =>
        p._id === post._id ? post : p
      )
    },

    addPost: (state, { payload: post }) => {
      const newPost = { ...post, _id: uuidv4() };
      state.posts = [...state.posts, newPost] as any;
    },

    getPostsFromClass: (state, { payload: courseId }) => {
      state.posts = posts.filter((p) => p.course === courseId);
    },

    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});
export const { getPostsFromClass, toggleSidebar, setPosts, addPost } =
  classSlice.actions;
export default classSlice.reducer;
function uuidv4() {
  throw new Error("Function not implemented.");
}

