import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import LoginForm from '../login/LoginForm'

jest.mock('@/features/connect/connectSlice', () => {
  const actualModule = jest.requireActual('@/features/connect/connectSlice')
  return {
    ...actualModule,
    connectThunk: jest.fn(() => () => Promise.resolve())
  }
})

import { connectThunk } from '@/features/connect/connectSlice'
import { renderWithProviders } from 'test-utils'
import { configureStore, UnknownAction } from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'
import userEvent from '@testing-library/user-event'

describe('When LoginForm is displayed', () => {
  type connectThunkType = typeof connectThunk
  const mockedConnectThunk = connectThunk as jest.MockedFunction<connectThunkType>
  const mockStore = configureStore({
    reducer: rootReducer,
    preloadedState: {
      profile: {
        userName: '',
        firstName: '',
        lastName: ''
      }
    }
  })

  let dispatchSpy: jest.SpyInstance<UnknownAction, [action: UnknownAction, ...extraArgs: any[]], any>;
  beforeEach(() => {
    mockedConnectThunk.mockClear()

    dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    renderWithProviders(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    , { store: mockStore })
  })

  it('then it must render inputs and button', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('then it must show validation errors when submitting empty form', async () => {
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(await screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('then it must dispatch connectThunk on valid submit', async () => {
    await userEvent.type(screen.getByLabelText(/username/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'passwordTest')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockedConnectThunk).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'passwordTest',
      })
    })
  })
})