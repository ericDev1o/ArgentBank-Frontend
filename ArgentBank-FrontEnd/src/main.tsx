import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import MyRouting from './MyRouting';
import { argentBankStore } from './app/store';

const root = document.getElementById('root')
if(root)
  createRoot(root).render(
    <StrictMode>
      <Provider store={argentBankStore}>
        <MyRouting />
      </Provider>
    </StrictMode>,
  )