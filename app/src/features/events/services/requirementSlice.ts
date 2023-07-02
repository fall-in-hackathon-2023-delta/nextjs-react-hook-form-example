import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { T } from "@/types";


const aAdapter = createEntityAdapter<T.Stretch.Requirement>({
    selectId: (a) => a.id
    //  sortComparer: (a, b) => a.sort - b.sort
 });
 
 const initialState = aAdapter.getInitialState({
    status: "idle",
    error: null
 });
export const appSlice = createSlice({
   name: "requirementSlice",
   initialState,
   reducers: {
      
      
   }
});



export const appActions = appSlice.actions;

export default appSlice.reducer;