import { configureStore } from '@reduxjs/toolkit'
import numberSlice from './numberSlice'

export const store = configureStore({
    reducer: {
        numbers: numberSlice.reducer,
    },
})