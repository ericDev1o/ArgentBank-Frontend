import { configureStore } from '@reduxjs/toolkit'
import { State } from './types'

const initialState: State = {
    token: null
}

type Action = 
| {type:'CONNECT', payload: string}
| {type:'DISCONNECT'}

const reducer = (currentState:State = initialState, action: Action): State => {
    switch (action.type) {
        case 'CONNECT':
            return {...currentState, token: action.payload}
        case 'DISCONNECT':
            return {...currentState, token: null}
        default:
            return currentState
    }
}

export const argentBankStore = configureStore({
    preloadedState: initialState,
    reducer
})