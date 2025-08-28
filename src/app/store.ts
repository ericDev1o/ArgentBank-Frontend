import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { 
  persistReducer, 
  persistStore,
  REGISTER,
  FLUSH,
  PURGE,
  PERSIST,
  PAUSE,
  REHYDRATE
} from 'redux-persist'

import { connectSlice } from '../features/connect/connectSlice'
import { profileSlice } from '../features/profile/profileSlice'
import persistConfig from './persistConfig'
import { PersistedState } from './types'

export const rootReducer = combineReducers({
    connect: connectSlice.reducer,
    profile: profileSlice.reducer
})

type ConnectActions = ReturnType<typeof connectSlice.actions[keyof typeof connectSlice.actions]>
type AppActions = ConnectActions

const persistedReducer = persistReducer(persistConfig, rootReducer) as (
  state: PersistedState | undefined,
  action: AppActions
) => PersistedState;

export const argentBankStore = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [REGISTER, FLUSH, PURGE, PERSIST, PAUSE, REHYDRATE]
        }
      })
    }
})

export const persistor = persistStore(argentBankStore)