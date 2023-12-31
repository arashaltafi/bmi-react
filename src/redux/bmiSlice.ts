import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface NumberState {
    weight: number,
    height: number,
    age: number,
    isMale: boolean,
    result: string,
}

const initialState: NumberState = {
    weight: 0,
    height: 0,
    age: 0,
    isMale: true,
    result: ''
}

const bmiSlice = createSlice({
    name: 'bmi',
    initialState,
    reducers: {
        setAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setWeight: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setHeight: (state, action: PayloadAction<number>) => {
            state.age = action.payload;
        },
        setIsMale: (state, action: PayloadAction<boolean>) => {
            state.isMale = action.payload;
        },
        setResult: (state, action: PayloadAction<string>) => {
            state.result = action.payload;
        }
    },
})

export default bmiSlice