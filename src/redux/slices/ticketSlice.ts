import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import {
  IFetchTickets,
  ITicketSliceState,
  SearchIdType,
  Ticket,
} from "../../types/ticket";

export const fetchSearchId = createAsyncThunk<SearchIdType, void>(
  "filter/fetchSearchId",
  async () => {
    const { data } = await axios.get(
      `https://aviasales-test-api.kata.academy/search`
    );
    return data;
  }
);

export const fetchTickets = createAsyncThunk<IFetchTickets, string>(
  "filter/fetchTickets",
  async (searchId) => {
    const { data } = await axios.get(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );

    return data;
  }
);

const initialState: ITicketSliceState = {
  searchId: "",
  tickets: [],
  stop: false,
  ticketError: false,
  sortTickets: [],
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setFilterTickets(state, action) {
      state.sortTickets = [];
      action.payload.forEach((item: boolean, index: number) => {
        if (item) {
          // state.sortTickets = [
          //   ...state.sortTickets,
          //   ...state.tickets.filter(
          //     (ticket: Ticket) => ticket.segments[0].stops.length === index - 1
          //   ),
          // ];

          state.sortTickets.push(
            ...state.tickets.filter(
              (ticket: Ticket) => ticket.segments[0].stops.length === index - 1
            )
          );
        }
      });
    },
    setSortTickets(state, action) {
      switch (action.payload) {
        case "самый дешевый":
          state.sortTickets = state.sortTickets.sort(
            (a: Ticket, b: Ticket): number => {
              return a.price < b.price ? -1 : 1;
            }
          );
          break;
        case "самый быстрый":
          state.sortTickets.sort((a: Ticket, b: Ticket): number => {
            return a.segments[0].duration < b.segments[0].duration ? -1 : 1;
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.pending, (state) => {
      state.searchId = "";
    });
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.searchId = action.payload.searchId;
    });
    builder.addCase(fetchSearchId.rejected, (state) => {
      state.searchId = "";
    });

    builder.addCase(fetchTickets.pending, (state) => {
      state.stop = true;
      state.ticketError = false;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      state.stop = action.payload.stop;
    });
    builder.addCase(fetchTickets.rejected, (state) => {
      state.ticketError = true;
    });
  },
});

// export const selectTickets = (state: RootState) => state.ticket.tickets;
// export const selectStop = (state: RootState) => state.ticket.stop;
// export const selectSearchId = (state: RootState) => state.ticket.searchId;

export const { setFilterTickets, setSortTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
