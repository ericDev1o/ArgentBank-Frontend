import { PersistPartial } from 'redux-persist/lib/persistReducer'
import { argentBankStore, rootReducer } from './store'

export type AppDispatch = typeof argentBankStore.dispatch

export type RootState = ReturnType<typeof rootReducer>
export type PersistedState = RootState & PersistPartial

export type AuthFormReqPayload = {
    email: string,
    password: string
}

export type UserFormPayload = {
    userName: string | null
}

export type UserPayload = {
    userName: string | null,
    token: string | null
}

export type ThunkApi = {
  rejectWithValue: (value: any) => any;
}