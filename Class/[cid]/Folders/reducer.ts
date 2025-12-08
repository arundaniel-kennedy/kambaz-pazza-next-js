import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import filterData from '../../../../(Kambaz)/Database/filterData.json';

export interface FilterItem {
  label: string;
  count?: number;
}

interface FilterState {
  items: FilterItem[];
  selectedIndex: number | null;
}

const initialState: FilterState = {
  items: filterData as FilterItem[],
  selectedIndex: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedIndex: (state, action: PayloadAction<number | null>) => {
      state.selectedIndex = action.payload;
    },
    updateFilterCount: (state, action: PayloadAction<{ label: string; count: number }>) => {
      const item = state.items.find(item => item.label === action.payload.label);
      if (item) {
        item.count = action.payload.count;
      }
    },
  },
});

export const { setSelectedIndex, updateFilterCount } = filterSlice.actions;
export default filterSlice.reducer;
export type { FilterState };

