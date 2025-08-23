import { configureStore } from '@reduxjs/toolkit'

import { connectSlice } from '../features/connect/connectSlice'
import { getProfileSlice } from '../features/getProfile/getProfileSlice'

export const argentBankStore = configureStore({
    reducer: {
        connect: connectSlice.reducer,
        profile: getProfileSlice.reducer
    }
})