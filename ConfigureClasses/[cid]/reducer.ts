import { createSlice } from "@reduxjs/toolkit";
import ClassDetails from "./DataStructure";

const initialState: ClassDetails = {
    class_info: {}
};

const classConfigureSlice = createSlice({
    name: "classconfigure",
    initialState,
    reducers: {
        setClassDetails: (state, action) => {

        },
        updateClassInfo: (state, { payload: class_info }) => {
            
        }
    },
});
export const { setClassDetails } = classConfigureSlice.actions;
export default classConfigureSlice.reducer;