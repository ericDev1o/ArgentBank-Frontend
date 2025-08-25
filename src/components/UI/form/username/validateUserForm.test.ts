import { validate } from './validateUserForm'

describe('When form fields are validated', () => {
  it('then it must display an error when user name field is empty.', () => {
    const result = validate({ userName: '' })

    expect(result.userName).toBe('User name is required')
  })

  it('then it should not display any error for valid user name input', () => {
    const result = validate({ userName: 'user example' })

    expect(result).toEqual({})
  })
})