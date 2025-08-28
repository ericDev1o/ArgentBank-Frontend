import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { beforeAllTests, mockThunk } from '@test/helpers/form/beforeAll'

/**
 * See aliases paths in /tsconfig.json
 */
jest.mock('@/features/connect/connectSlice', () => {
  const actualModule = jest.requireActual('@/features/connect/connectSlice')
  return {
    ...actualModule,
    connectThunk: jest.fn(() => () => Promise.resolve())
  }
})

import { connectThunk } from '@/features/connect/connectSlice'

describe('When LoginForm is displayed', () => {
  const mockedConnectThunk = mockThunk(connectThunk)
  beforeAllTests('connect', mockedConnectThunk)

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