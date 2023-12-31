import { configureStore } from '@reduxjs/toolkit'
import numberSlice from './numberSlice'
import locationSlice from './locationSlice'

export const store = configureStore({
    reducer: {
        numbers: numberSlice.reducer,
        location: locationSlice.reducer,
    },
})