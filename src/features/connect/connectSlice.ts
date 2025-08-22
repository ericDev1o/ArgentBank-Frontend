import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthFormReqPayload } from '../../app/types'

const URL = 'http://localhost:3001/api/v1/user/login'

export const connectThunk = createAsyncThunk<any, AuthFormReqPayload>(
    'login/connectThunk',
    async ({email, password}, thunkApi) => {
        /**
         * Secrets are 
         *     1. test-only
         *     2. visible in the final bundle and therefore in the browser inspector
         *         a. in dev tools
         *             i. Sources tab connectSlice.ts file
         * To do: please ask backend team to keep them:
         *     1. safe for example encrypted in the database
         *     2. as a single source of truth 
         */
        const LOGIN_BODY = {
            "email": email, //import.meta.env.VITE_LOGIN_EMAIL_TONY,
            "password": password //import.meta.env.VITE_LOGIN_PASSWORD_TONY
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

        if(response.ok){
            const data = await response.json()
            return data?.body?.token
        }
        else return thunkApi.rejectWithValue('Connection error')
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