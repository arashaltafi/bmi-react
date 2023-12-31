import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './locationSlice'
import bmiSlice from './BmiSlice'

export const store = configureStore({
    reducer: {
        bmi: bmiSlice.reducer,
        location: locationSlice.reducer,
    },
})