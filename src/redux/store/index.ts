import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filter from "../slices/filterSlice";
import ticket from "../slices/ticketSlice";
export const store = configureStore({
  reducer: {
    filter,
    ticket,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
