import { argentBankStore } from "./store"

export type State = {
    token: string | null
}

export type AppDispatch = typeof argentBankStore.dispatch

export type AuthFormReqPayload = {
    email: string,
    password: string
}