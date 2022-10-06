import { createSlice } from "@reduxjs/toolkit";

interface categoryType {
    value: number
}


export const categorySlice = createSlice({
    name: 'currentCategory',
    initialState: { value: 0 } as categoryType, // 0 - ALL, 1 - PRIORITY, 2 - NORMAL
    reducers: {
        showAll: (state: categoryType) => {
            state.value = 0
        },
        showPriority: (state: categoryType) => {
            state.value = 1
        },
        showNormal: (state: categoryType) => {
            state.value = 2
        }
    }
})

export const { showAll, showPriority, showNormal } = categorySlice.actions