import { createSlice } from "@reduxjs/toolkit";

interface AppState {
   sidebarOpen: boolean;
}

const initialState: AppState = {
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
