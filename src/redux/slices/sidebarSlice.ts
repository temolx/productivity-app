import { createSlice } from "@reduxjs/toolkit";

interface sidebarType {
    value: boolean
}

export const sidebarVisible = createSlice({
    name: 'sidebar',
    initialState: { value: true } as sidebarType,
    reducers: {
        show: (state: sidebarType) => {
            state.value = true;
        },
        hide: (state: sidebarType) => {
            state.value = false;
        }
    }
})

export const { show, hide } = sidebarVisible.actions;