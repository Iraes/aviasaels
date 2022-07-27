import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { IFilterSliceState } from "../../types/ticket";

const initialState: IFilterSliceState = {
  checkboxFilter: [false, true, false, false, false],
  sort: "самый дешевый",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCheck(state, action) {
      state.checkboxFilter = state.checkboxFilter.map((checkbox, index) =>
        index === action.payload ? !checkbox : checkbox
      );
    },
    setCheckAll(state) {
      state.checkboxFilter = state.checkboxFilter.map((_) => true);
    },
    setUncheckAll(state) {
      state.checkboxFilter = state.checkboxFilter.map((_) => false);
    },
    setChangeAllCheck(state) {
      state.checkboxFilter[0] = true;
    },
    setChangeAllUncheck(state) {
      state.checkboxFilter[0] = false;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
  },
});

export const selectCheckbox = (state: RootState) => state.filter.checkboxFilter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCheck,
  setCheckAll,
  setUncheckAll,
  setChangeAllCheck,
  setChangeAllUncheck,
  setSortType,
} = filterSlice.actions;

export default filterSlice.reducer;
