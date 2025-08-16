import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyRouting from './MyRouting';

const root = document.getElementById('root')
if(root)
  createRoot(root).render(
    <StrictMode>
      <MyRouting />
    </StrictMode>,
  )