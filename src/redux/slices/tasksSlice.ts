import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface tasksType {
    name: string,
    desc: string,
    currentColor: string,
    duration: {
        hours: number,
        minutes: number
    },
    priority: boolean
}

interface tasksState {
    value: tasksType[]
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { value: [] } as tasksState,
    reducers: {
        addTask: (state: tasksState, action: PayloadAction<tasksType>) => {
            state.value.push(action.payload);
        },
        changePriorityStatus: (state: tasksState, action: PayloadAction<string>) => {
            state.value.map((el) => {
                if (action.payload === el.name) {
                    el.priority = !el.priority;
                }
            })
        }
    }
})

export const { addTask, changePriorityStatus } = tasksSlice.actions;