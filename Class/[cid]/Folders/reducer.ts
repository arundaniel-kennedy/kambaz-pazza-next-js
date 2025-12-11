import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterItem {
  _id: string;
  name: string;
  course: string;
  count?: number;
  __v?: number;
}

interface FilterState {
  items: FilterItem[];
  selectedIndex: number | null;
}

const initialState: FilterState = {
  items: [],           
  selectedIndex: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFolders: (state, {payload:folders}) => {
      state.items = folders;
    },
    setSelectedIndex: (state, action: PayloadAction<number | null>) => {
      state.selectedIndex = action.payload;
    },
    updateFilterCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const item = state.items.find(i => i._id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
  },
});

export const { setFolders, setSelectedIndex, updateFilterCount } =
  filterSlice.actions;

export default filterSlice.reducer;
export type { FilterState };
