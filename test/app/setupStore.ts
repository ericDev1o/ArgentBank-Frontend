import { combineReducers, configureStore } from '@reduxjs/toolkit'

const mockReducer = (state = { value: 0}, action: any) => state

const rootReducer = combineReducers({
    connect: mockReducer,
    profile: mockReducer
})

/**
 * @param preloadedState 
 * @returns a store with mocked reducer for speed.
 */
export const setupStore = (
    preloadedState?: Partial<ReturnType<typeof rootReducer>>
) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type AppStore = ReturnType<typeof setupStore>