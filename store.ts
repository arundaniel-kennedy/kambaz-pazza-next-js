import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./Class/[cid]/reducer"
import classConfigureReducer from "./ConfigureClasses/[cid]/data/reducer"
import newPostReducer from "./Class/[cid]/Create/reducer"

const store = configureStore({
    reducer: {
        classReducer,
        classConfigureReducer,
        newPostReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;