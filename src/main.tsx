import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MyRouting from './MyRouting';
import { argentBankStore } from './app/store';
import { persistor } from './app/store'

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