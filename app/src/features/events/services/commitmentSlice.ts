import { createSlice } from "@reduxjs/toolkit";

interface Commitment {
   sidebarOpen: boolean;
}

const initialState: Commitment = {
   sidebarOpen: false,
};

export const appSlice = createSlice({
   name: "appState",
   initialState,
   reducers: {
      action: (state) => {
         state.sidebarOpen = true;
      },
      
   }
});



export const appActions = appSlice.actions;
