import { configureStore, createReducer } from '@reduxjs/toolkit'

import { Action, State } from './types'
import { connect, CONNECT, disconnect, DISCONNECT } from './actions'

const initialState: State = {
    token: null
}

const reducer = createReducer(
    initialState, 
    function(builder){
        builder.addCase(connect, (currentState, action) => {
            return {...currentState, token: action.payload}
        }),
        builder.addCase(disconnect, (currentState) => {
            return {...currentState, token: null}
        })
    })

export const argentBankStore = configureStore({
    preloadedState: initialState,
    reducer
})