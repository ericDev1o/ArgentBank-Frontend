import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MyRouting from './MyRouting';
import { argentBankStore } from './app/store';
import { persistor } from './app/store'

/**
 * In case 
 *     it is needed by users (it shouldn't) and
 *     there's time for it (there 'should' be as soon as possible according to usage);
 * there's incentive for a loader animation below and in 
 * /features/any/anySlice.ts createSlice() extraReducers for example
 * extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'complete'
      state.name = action.payload
    })
 * See https://redux.js.org/usage/writing-tests 
 * #Integration Testing Connected Components and Redux Logic
 */
const root = document.getElementById('root')
if(root)
  createRoot(root).render(
    <StrictMode>
      <Provider store={argentBankStore}>
        <PersistGate loading={null} persistor={persistor}>
          <MyRouting />
        </PersistGate>
      </Provider>
    </StrictMode>,
  )