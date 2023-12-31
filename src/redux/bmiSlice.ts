import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface NumberState {
    weight: number,
    height: number,
    age: number,
    isMale: boolean,
    result: string,
}

const initialState: NumberState = {
    weight: 80,
    height: 170,
    age: 26,
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
            state.weight = action.payload;
        },
        setHeight: (state, action: PayloadAction<number>) => {
            state.height = action.payload;
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