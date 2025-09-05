import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AuthFormReqPayload } from '../../app/types'
import fetchThunkResponse_helper from '../../helpers/fetchHelper'

import { CONNECT_URL } from '@/constants/api'

export const connectThunk = createAsyncThunk<any, AuthFormReqPayload>(
    'login/connectThunk',
    async ({email, password}, thunkApi) => {
        const LOGIN_BODY = {
            'email': email,
            'password': password
        }
        const response = await fetch(
            CONNECT_URL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LOGIN_BODY)
            }
        )
        return fetchThunkResponse_helper(response, 'connect', thunkApi)
    }
)

export const connectSlice = createSlice({
    name: 'login',
    initialState: {
        token: null
    },
    reducers: {
        disconnect: (currentState) => {
            currentState.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(connectThunk.fulfilled, (state, action) => {
            state.token = action.payload
        }),
        builder.addCase(connectThunk.rejected, (state) => {
            state.token = null
        })
    },
})