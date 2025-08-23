import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AuthFormReqPayload } from '../../app/types'
import fetchThunkResp from '../../helpers/fetchHelper'

const URL = 'http://localhost:3001/api/v1/user/login'

export const connectThunk = createAsyncThunk<any, AuthFormReqPayload>(
    'login/connectThunk',
    async ({email, password}, thunkApi) => {
        const LOGIN_BODY = {
            "email": email,
            "password": password
        }
        const response = await fetch(
            URL, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LOGIN_BODY)
            }
        )
        return fetchThunkResp(response, 'connect', thunkApi)
    }
)

export const connectSlice = createSlice({
    name: 'login',
    initialState: {
        token: null
    },
    /**
     * To do: please ask the backend team 
     *     1. the token time-to-live before expiration. 
     *        It is currently stateless and only deleted from the user browser.
     *     2. if to secure the logout an API route could be planned for server-side
     *         i. token revocation or 
     *         ii. session deletion
     */
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