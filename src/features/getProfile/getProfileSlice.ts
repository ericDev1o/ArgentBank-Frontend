import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import fetchThunkResp from '../../helpers/fetchHelper'

const URL = 'http://localhost:3001/api/v1/user/profile'

export const getProfileThunk = createAsyncThunk<any, string | null>(
    'profile/getProfileThunk',
    async (token, thunkApi) => {
        const response = await fetch(URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
        return fetchThunkResp(response, 'profile', thunkApi)
    }
)



export const getProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        /*id: '',
        email: '',*/
        firstName: '',
        lastName: ''/*,
        userName: ''*/
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {
            /*state.id = action.payload.id,
            state.email = action.payload.email,*/
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName/*,
            state.userName = action.payload.userName*/
        }),
        builder.addCase(getProfileThunk.rejected, (state) => {
            /*state.id = '',
            state.email = '',*/
            state.firstName = '',
            state.lastName = ''/*,
            state.userName = ''*/
        })
    },
})