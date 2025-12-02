import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./Class/[cid]/reducer"
import classConfigureReducer from "./ConfigureClasses/[cid]/reducer"

const store = configureStore({
    reducer: {
        classReducer,
        classConfigureReducer
    }
})
export type storeType = ReturnType<typeof store.getState>;
export default store;