import { createSlice } from "@reduxjs/toolkit";

export interface Locations {
    locations: any
}

const initialState: Locations = {
    locations: [
        {
            pathName: null,
            isLoaded: null
        }
    ]
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        addLocation: (state, action) => {
            const hasLocation = state.locations.find((location: any) => {
                return (location.pathName === action.payload[0].pathName)
            })
            if (!hasLocation) {
                state.locations = [...state.locations, ...action.payload]
            }
        }
    }
});

export default locationSlice