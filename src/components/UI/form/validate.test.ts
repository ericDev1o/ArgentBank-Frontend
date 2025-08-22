import { validate } from './validate'

describe('When form fields are validated', () => {
  it('then it must return errors when fields are empty', () => {
    const result = validate({ email: '', password: '' })

    expect(result.email).toBe('Email is required')
    expect(result.password).toBe('Password is required')
  })

  it('then it must return an error for invalid an email format', () => {
    const result = validate({ email: 'invalid-email', password: '123456' })

    expect(result.email).toBe('Email is invalid')
    expect(result.password).toBeUndefined()
  })

  it('then it should not display any error for valid inputs', () => {
    const result = validate({ email: 'user@example.com', password: 'Passw0rd!' })

    expect(result).toEqual({})
  })
})