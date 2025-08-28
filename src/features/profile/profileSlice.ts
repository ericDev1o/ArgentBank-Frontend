import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import fetchThunkResponse_helper from '../../helpers/fetchHelper'
import { UserPayload } from '../../app/types'

import { PROFILE_URL } from '@/constants/api'

export const getProfileThunk = createAsyncThunk<any, string | null>(
    'profile/getProfileThunk',
    async (token, thunkApi) => {
        const response = await fetch(PROFILE_URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        return fetchThunkResponse_helper(response, 'profile', thunkApi)
    }
)

export const putProfileThunk = createAsyncThunk<any, UserPayload>(
    'profile/putProfileThunk',
    async ({userName, token}, thunkApi) => {
        const PUT_PROFILE_BODY = {
            'userName': userName
        }
        const response = await fetch(PROFILE_URL,
            {
                method: 'PUT',
                body: JSON.stringify(PUT_PROFILE_BODY),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        return fetchThunkResponse_helper(response, 'profile', thunkApi)
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        firstName: '',
        lastName: '',
        userName: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName,
            state.userName = action.payload.userName
        }),
        builder.addCase(getProfileThunk.rejected, (state) => {
            state.firstName = '',
            state.lastName = '',
            state.userName = ''
        })
        builder.addCase(putProfileThunk.fulfilled, (state, action) => {
            state.userName = action.payload.userName
        }),
        builder.addCase(putProfileThunk.rejected, (state) => {
            state.userName = ''
        })
    }
})