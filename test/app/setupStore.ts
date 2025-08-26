import { combineReducers, configureStore } from '@reduxjs/toolkit'

const mockReducer = (state = { value: 0}, action: any) => state

const rootReducer = combineReducers({
    connect: mockReducer,
    profile: mockReducer
})

/**
 * To combine with Mock Service Worker or 
 * renderWithProvider store={store}
 * @param preloadedState 
 * @returns 
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