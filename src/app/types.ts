import { argentBankStore } from './store'

export type AppDispatch = typeof argentBankStore.dispatch

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