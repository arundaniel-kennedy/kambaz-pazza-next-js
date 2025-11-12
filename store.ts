import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./Class/[cid]/reducer"

const store = configureStore({
    reducer: {
        classReducer
    }
})
export type storeType = ReturnType<typeof store.getState>;
export default store;