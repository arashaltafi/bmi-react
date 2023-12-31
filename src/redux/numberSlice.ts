import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface NumberState {
    number: string,
    result: string,
}

const initialState: NumberState = {
    number: '',
    result: ''
}

const numberSlice = createSlice({
    name: 'numbers',
    initialState,
    reducers: {
        setNumber: (state, action: PayloadAction<string>) => {
            if (state.number.length < 15) {
                state.number += action.payload;
            }
        },
        setSymbol: (state, action: PayloadAction<string>) => {
            const symbols = ['+', '-', '*', '/'];
            if (!symbols.includes(state.number.slice(-1)) && state.number.slice(-1) !== "" && state.number.slice(-1) !== ".") {
                state.number = state.number + action.payload;
            }
        },
        calculate: (state) => {
            state.result = eval(state.number).toString();
        },
        deleteNumber: (state) => {
            if (state.number.slice(-1) === " ") {
                state.number = state.number.substring(0, state.number.length - 3);
            } else if (state.number.slice(-2) === "0.") {
                state.number = state.number.substring(0, state.number.length - 2);
            } else {
                state.number = state.number.substring(0, state.number.length - 1);
            }
        },
        clearNumber: (state) => {
            state.number = '';
            state.result = '';
        }
    },
})

export default numberSlice