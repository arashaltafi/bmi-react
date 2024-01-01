import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './locationSlice'
import bmiSlice from './bmiSlice'

export const store = configureStore({
    reducer: {
        bmi: bmiSlice.reducer,
        location: locationSlice.reducer,
    },
})