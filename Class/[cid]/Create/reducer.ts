import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type PostType = 'question' | 'note' | 'poll';
export type PostTo = 'entire-class' | 'instructor';

export interface Post {
  _id: string;
  postType: PostType;
  postTo: PostTo;
  selectedUsers: string[];
  selectedFolders: string[];
  summary: string;
  details: string;
  sendEmailNotifications: boolean;
  userName: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewPostState {
  posts: Post[];
  formData: {
    postType: PostType;
    postTo: PostTo;
    selectedUsers: string[];
    selectedFolders: string[];
    summary: string;
    details: string;
    sendEmailNotifications: boolean;
    userName: string;
    isPrivate: boolean;
  };
  errors: {
    folders?: string;
    summary?: string;
    details?: string;
  };
}

const initialFormData = {
  postType: 'question' as PostType,
  postTo: 'entire-class' as PostTo,
  selectedUsers: [],
  selectedFolders: [],
  summary: '',
  details: '',
  sendEmailNotifications: false,
  userName: 'Anonymous',
  isPrivate: true,
};

const initialState: NewPostState = {
  posts: [],
  formData: initialFormData,
  errors: {},
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    // Post type actions
    setPostType: (state, { payload }: PayloadAction<PostType>) => {
      state.formData.postType = payload;
    },

    // Post to actions
    setPostTo: (state, { payload }: PayloadAction<PostTo>) => {
      state.formData.postTo = payload;
    },

    // User selection actions
    toggleSelectedUser: (state, { payload }: PayloadAction<string>) => {
      const index = state.formData.selectedUsers.indexOf(payload);
      if (index > -1) {
        state.formData.selectedUsers.splice(index, 1);
      } else {
        state.formData.selectedUsers.push(payload);
      }
    },

    setSelectedUsers: (state, { payload }: PayloadAction<string[]>) => {
      state.formData.selectedUsers = payload;
    },

    clearSelectedUsers: (state) => {
      state.formData.selectedUsers = [];
    },

    // Folder selection actions
    toggleSelectedFolder: (state, { payload }: PayloadAction<string>) => {
      const index = state.formData.selectedFolders.indexOf(payload);
      if (index > -1) {
        state.formData.selectedFolders.splice(index, 1);
      } else {
        state.formData.selectedFolders.push(payload);
      }
    },

    setSelectedFolders: (state, { payload }: PayloadAction<string[]>) => {
      state.formData.selectedFolders = payload;
    },

    clearSelectedFolders: (state) => {
      state.formData.selectedFolders = [];
    },

    // Form content actions
    setSummary: (state, { payload }: PayloadAction<string>) => {
      state.formData.summary = payload;
      if (state.errors.summary) {
        delete state.errors.summary;
      }
    },

    setDetails: (state, { payload }: PayloadAction<string>) => {
      state.formData.details = payload;
      if (state.errors.details) {
        delete state.errors.details;
      }
    },

    setSendEmailNotifications: (state, { payload }: PayloadAction<boolean>) => {
      state.formData.sendEmailNotifications = payload;
    },

    setPosterName: (state, { payload }: PayloadAction<string>) => {
      state.formData.userName = payload;
    },

    setIsPrivate: (state, { payload }: PayloadAction<boolean>) => {
      state.formData.isPrivate = payload;
    },

    // Error handling actions
    setErrors: (state, { payload }: PayloadAction<NewPostState['errors']>) => {
      state.errors = payload;
    },

    clearErrors: (state) => {
      state.errors = {};
    },

    clearFieldError: (state, { payload }: PayloadAction<keyof NewPostState['errors']>) => {
      delete state.errors[payload];
    },

    // Post CRUD actions
    addPost: (state, { payload }: PayloadAction<Omit<Post, '_id' | 'createdAt' | 'updatedAt'>>) => {
      const now = new Date().toISOString();
      const newPost: Post = {
        _id: uuidv4(),
        ...payload,
        createdAt: now,
        updatedAt: now,
      };
      state.posts.unshift(newPost);
    },

    deletePost: (state, { payload }: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p._id !== payload);
    },

    updatePost: (state, { payload }: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p._id === payload._id);
      if (index > -1) {
        state.posts[index] = {
          ...payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    setPosts: (state, { payload }: PayloadAction<Post[]>) => {
      state.posts = payload;
    },

    // Form reset
    resetForm: (state) => {
      state.formData = initialFormData;
      state.errors = {};
    },

    // Reset everything
    resetNewPost: () => {
      return initialState;
    },
  },
});

export const {
  setPostType,
  setPostTo,
  toggleSelectedUser,
  setSelectedUsers,
  clearSelectedUsers,
  toggleSelectedFolder,
  setSelectedFolders,
  clearSelectedFolders,
  setSummary,
  setDetails,
  setSendEmailNotifications,
  setPosterName,
  setIsPrivate,
  setErrors,
  clearErrors,
  clearFieldError,
  addPost,
  deletePost,
  updatePost,
  setPosts,
  resetForm,
  resetNewPost,
} = newPostSlice.actions;

export default newPostSlice.reducer;