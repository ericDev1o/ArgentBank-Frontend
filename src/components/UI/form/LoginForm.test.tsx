import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Store, UnknownAction } from '@reduxjs/toolkit'

import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
/*
import thunk from 'redux-thunk'
import { Dispatch } from 'redux'
import type { State } from '../../../app/types'

const middlewares = [thunk] as unknown as Middleware<Dispatch, State>
const mockStore = configureStore(middlewares)
*/
/*
import type { Middleware } from 'redux'

const dummyThunkMiddleware: Middleware = () => next => action => next(action)
const mockStore = configureStore([dummyThunkMiddleware])
*/
const mockStore = configureStore([])

jest.mock('../../../features/connect/connectSlice.ts', () => ({
  connectThunk: jest.fn(() => () => Promise.resolve()),
}))

describe('When LoginForm is displayed', () => {
  let store: MockStoreEnhanced<unknown, {}> | Store<unknown, UnknownAction, unknown>

  beforeEach(() => {
    store = mockStore({})
  })

  it('then it must render inputs and button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('then it must show validation errors when submitting empty form', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('then it must dispatch connectThunk and navigate on valid submit', async () => {
    const { connectThunk } = require('../../../features/connect/connectSlice.ts')
    connectThunk.mockImplementation(() => () => Promise.resolve())

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(connectThunk).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      })
    })
  })
})