import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {}
})
export type storeType = ReturnType<typeof store.getState>;
export default store;