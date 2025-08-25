import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistPartial } from 'redux-persist/lib/persistReducer'

import { connectSlice } from '../features/connect/connectSlice'
import { profileSlice } from '../features/profile/profileSlice'
import persistConfig from './persistConfig'

const rootReducer = combineReducers({
    connect: connectSlice.reducer,
    profile: profileSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
type PersistedState = RootState & PersistPartial
type ConnectActions = ReturnType<typeof connectSlice.actions[keyof typeof connectSlice.actions]>
type AppActions = ConnectActions // | ProfileActions

const persistedReducer = persistReducer(persistConfig, rootReducer) as (
  state: PersistedState | undefined,
  action: AppActions
) => PersistedState;

export const argentBankStore = configureStore({ 
    reducer: persistedReducer
})

export const persistor = persistStore(argentBankStore)