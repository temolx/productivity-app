import { configureStore } from "@reduxjs/toolkit";
import { sidebarVisible } from "./slices/sidebarSlice";
import { tasksSlice } from "./slices/tasksSlice";
import { categorySlice } from "./slices/categoryslice";
import { colorSlice } from "./slices/colorSlice";


const store = configureStore({
    reducer: {
        sidebarVisible: sidebarVisible.reducer,
        tasks: tasksSlice.reducer,
        currentCategory: categorySlice.reducer,
        currentColor: colorSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState> // root state for useSelector!

export default store;
