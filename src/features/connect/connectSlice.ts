import { createSlice } from "@reduxjs/toolkit";

export const connectSlice = createSlice({
    name: 'login',
    initialState: {
        token: null
    },
    reducers: {
        connect: (currentState, action) => {
            return {...currentState, token: action.payload}
        },
        disconnect: (currentState) => {
            return {...currentState, token: null}
        }
    }
})