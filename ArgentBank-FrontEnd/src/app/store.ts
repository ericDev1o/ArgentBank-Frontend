import { configureStore } from '@reduxjs/toolkit'

let state = {
    token: null
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'CONNECT':
            const tokenStored = [...currentState.token, action.payload]
            return {...currentState, token: tokenStored}
        default:
            return currentState
    }
}

export const argentBankStore = configureStore({
    preloadedState: state,
    reducer
})

export type AppStore = typeof argentBankStore
//export type RootState = ReturnType<AppStore['getState']>