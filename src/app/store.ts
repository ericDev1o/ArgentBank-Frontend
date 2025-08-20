import { configureStore } from '@reduxjs/toolkit'

import { connectSlice } from '../features/connect/connectSlice'

export const argentBankStore = configureStore({
    reducer: connectSlice.reducer
})