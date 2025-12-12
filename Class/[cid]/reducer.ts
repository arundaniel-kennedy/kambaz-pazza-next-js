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
      const newPost = { ...post };
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
    },

    updateReadBy: (state, { payload }) => {
      state.posts = state.posts.map((p: any) => {
        if (p._id === payload.pid) {
          if (!p.read_by?.includes(payload.uid)) {
            p.read_by?.push(payload.uid);
          }
          return p;
        } else {
          return p;
        }
      });
    }
  },
});
export const { getPostsFromClass, toggleSidebar, setPosts, addPost, setPost, setPostUsingId, updateReadBy } =
  classSlice.actions;
export default classSlice.reducer;
