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
    
    addPost: (state, { payload: post }) => {
    const newPost = { ...post, _id: uuidv4() };
    state.posts = [...state.posts, newPost] as any;
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
export const { getPostsFromClass, toggleSidebar, setPosts, addPost } =
  classSlice.actions;
export default classSlice.reducer;
function uuidv4() {
  throw new Error("Function not implemented.");
}

