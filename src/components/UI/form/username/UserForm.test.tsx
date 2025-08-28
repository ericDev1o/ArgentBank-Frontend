import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { beforeAllTests, mockThunk } from '@test/helpers/form/beforeAll'

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

describe('When UserForm is displayed', () => {
  const mockedPutProfileThunk = mockThunk(putProfileThunk)
  beforeAllTests('profile', mockedPutProfileThunk)

  it('then it must render inputs and button', () => {
    expect(screen.getByLabelText(/User name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/User name/i)).toHaveValue('')
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument()
  })

  it('then it must show validation errors when submitting empty form', async () => {
    await userEvent.click(screen.getByRole('button', { name: /Save/i }))

    expect(await screen.findByText(/User name is required/i)).toBeInTheDocument()
  })

  it('then it must dispatch putProfileThunk and navigate on valid submit', async () => {
    await userEvent.type(screen.getByLabelText(/User name/i), 'Iron man')
    await waitFor(() => expect(screen.getByLabelText(/User name/i)).toHaveDisplayValue('Iron man'))
    await userEvent.click(screen.getByRole('button', { name: /Save/i }))

    await waitFor(() => {
      expect(mockedPutProfileThunk).toHaveBeenCalled()
    })
  })
})