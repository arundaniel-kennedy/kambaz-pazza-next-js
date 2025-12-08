import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./Class/[cid]/reducer"
import classConfigureReducer from "./ConfigureClasses/[cid]/data/reducer"
import accountReducer from "../(Kambaz)/Account/reducer"
import newPostReducer from "./Class/[cid]/Create/reducer"
import filterReducer from "./Class/[cid]/Folders/reducer"

const store = configureStore({
    reducer: {
        classReducer,
        classConfigureReducer,
        accountReducer,
        newPostReducer,
        filter: filterReducer
    }
})
export type storeType = ReturnType<typeof store.getState>;
export default store;