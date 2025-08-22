import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
            }
        )

        if(response.ok){
            const data = await response.json()
            return data?.body
        }
        else if(response.status == 400) {
            const credError = await response.json()
            return thunkApi.rejectWithValue(credError?.message)
        }
        else if(response.status == 500) {
            const servError = await response.json()
            return thunkApi.rejectWithValue(servError?.message)
        }
        else return thunkApi.rejectWithValue('Connection error')
    }
)

export const getProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        createdAt: null,
        updatedAt: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {
            state.id = action.payload.id,
            state.email = action.payload.email,
            state.firstName = action.payload.firstName,
            state.lastName = action.payload.lastName,
            state.userName = action.payload.userName,
            state.createdAt = action.payload.createdAt,
            state.updatedAt = action.payload.updatedAt
        }),
        builder.addCase(getProfileThunk.rejected, (state) => {
            state.id = '',
            state.email = '',
            state.firstName = '',
            state.lastName = '',
            state.userName = '',
            state.createdAt = null,
            state.updatedAt = null
        })
    },
})