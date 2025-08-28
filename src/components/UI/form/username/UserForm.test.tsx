import { screen, fireEvent, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

import UserForm from '../username/UserForm'

/**
 * See aliases paths in /tsconfig.json
 */
jest.mock('@/features/profile/profileSlice', () => {
  const actualModule = jest.requireActual('@/features/profile/profileSlice')
  return {
    ...actualModule,
    putProfileThunk: jest.fn(() => () => Promise.resolve())
  }
})

import { putProfileThunk } from '@/features/profile/profileSlice'
import { renderWithProviders } from 'test-utils'
import { configureStore, UnknownAction } from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'

describe('When UserForm is displayed', () => {
  type putProfileThunkType = typeof putProfileThunk
  const mockedPutProfileThunk = putProfileThunk as jest.MockedFunction<putProfileThunkType>
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
    mockedPutProfileThunk.mockClear()

    dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    renderWithProviders(
      <BrowserRouter>
        <UserForm hideEdit={function (): void {} } />
      </BrowserRouter>
    , { store: mockStore })
  })

  it('then it must render inputs and button', () => {
    expect(screen.getByLabelText(/User name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/User name/i)).toHaveValue('')
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument()
  })

  it('then it must show validation errors when submitting empty form', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Save/i }))

    expect(await screen.findByText(/User name is required/i)).toBeInTheDocument()
  })

  it('then it must dispatch putProfileThunk and navigate on valid submit', async () => {
    await userEvent.type(screen.getByLabelText(/User name/i), 'Iron man')
    await waitFor(() => expect(screen.getByLabelText(/User name/i)).toHaveDisplayValue('Iron man'))
    await userEvent.click(screen.getByRole('button', { name: /Save/i }))
    await waitFor(() => expect(dispatchSpy).toHaveBeenCalled())

    await waitFor(() => {
      expect(mockedPutProfileThunk).toHaveBeenCalled()
    })
  })
})