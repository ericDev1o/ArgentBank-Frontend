import { BrowserRouter } from 'react-router-dom'

import LoginForm from '../../../src/components/UI/form/login/LoginForm'

import { renderWithProviders } from 'test-utils'
import { AsyncThunk, configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../../src/app/store'
import { UserPayload } from '@/app/types'
import UserForm from '@/components/UI/form/username/UserForm'

export function mockThunk(
  thunk: AsyncThunk<any, UserPayload, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }> | any
) 
{
  const mockedThunk = thunk as jest.MockedFunction<typeof thunk>
  return mockedThunk
}

export function beforeAllTests(slice: string,
  mockedThunk: jest.MockedFunction<AsyncThunk<any, UserPayload, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>> | any
){
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

  beforeEach(() => {
    mockedThunk.mockClear()

    renderWithProviders(
      <BrowserRouter>
        { slice === 'connect' ? 
        <LoginForm />
        :
        <UserForm hideEdit={function (): void {} } />
        }
      </BrowserRouter>
    , { store: mockStore })
  })
}