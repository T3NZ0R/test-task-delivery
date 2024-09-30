import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateRequest } from "../lib/interfaces/interfaces";
import { requestsData } from "../lib/mock/mock.data";

const initialState: IInitialStateRequest = {
  requests: [...(JSON.parse(localStorage.getItem("requests") || "[]") || requestsData)],
};

const requestsSlice = createSlice({
  name: "requestsSlice",
  initialState,

  reducers: {
    createRequest: (state, action) => {
      state.requests = [...state.requests, action.payload];
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },
    editRequest: (state, action) => {
      state.requests = state.requests.map((request) => {
        if (request.id === action.payload.id) {
          return action.payload;
        }
        return request;
      });
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },
  },
});

const requestsReducer = requestsSlice.reducer;
export const { createRequest, editRequest, deleteRequest } =
  requestsSlice.actions;
export { requestsReducer };
