import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./Class/[cid]/reducer"
import classConfigureReducer from "./ConfigureClasses/[cid]/data/reducer"

const store = configureStore({
    reducer: {
        classReducer,
        classConfigureReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;