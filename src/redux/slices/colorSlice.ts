import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface colorType {
    value: string
}

export const colorSlice = createSlice({
    name: 'currentColor',
    initialState: { value: '' } as colorType, // empty string for all (default)
    reducers: {
        setColor: (state: colorType, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { setColor } = colorSlice.actions