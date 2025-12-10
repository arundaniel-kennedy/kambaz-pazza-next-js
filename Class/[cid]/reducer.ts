import { createSlice } from "@reduxjs/toolkit";
import { Posts } from "./DataStructure";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  posts: [] as Posts[],
  showSidebar: true,
  post: {} as Posts | undefined,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    // ******************************
    //ashwin reducers go here


    // ******************************
    //Arun reducers go here
    //edit answer
    //create folloup
    //create reply to followup
    //create reply to reply

    // ******************************
    //arth reducers go here
    setPosts: (state, { payload: posts }) => {
      state.posts = posts;
    },

    updatePost: (state, { payload: post }) => {
      state.posts = state.posts.map((p) => (p._id === post._id ? post : p));
    },

    addPost: (state, { payload: post }) => {
      const newPost = { ...post, _id: uuidv4() };
      state.posts = [...state.posts, newPost] as any;
    },

    getPostsFromClass: (state, { payload: courseId }) => {
      state.posts = state.posts.filter((p) => p.course === courseId);
    },

    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setPostUsingId: (state, { payload: postId }) => {
      state.post = state.posts.find((p) => p._id === postId);
    },
    setPost: (state, { payload: post }) => {
      state.post = post
    }
  },
});
export const { getPostsFromClass, toggleSidebar, setPosts, addPost, setPost, setPostUsingId } =
  classSlice.actions;
export default classSlice.reducer;
