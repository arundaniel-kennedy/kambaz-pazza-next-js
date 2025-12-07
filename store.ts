import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./Class/[cid]/reducer"
import classConfigureReducer from "./ConfigureClasses/[cid]/data/reducer"
import accountReducer from "../(Kambaz)/Account/reducer"

const store = configureStore({
    reducer: {
        classReducer,
        classConfigureReducer,
        accountReducer
    }
})
export type storeType = ReturnType<typeof store.getState>;
export default store;