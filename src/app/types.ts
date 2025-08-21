import { argentBankStore } from "./store"

export type State = {
    token: string | null
}

export type AppDispatch = typeof argentBankStore.dispatch