import { argentBankStore } from "./store"

export type State = {
    connect: {
        token: string | null
    },
    profile: {
        id: string | null,
        email: string | null,
        firstName: string | null,
        lastName: string | null,
        userName: string | null
    }
}

export type AppDispatch = typeof argentBankStore.dispatch

export type AuthFormReqPayload = {
    email: string,
    password: string
}