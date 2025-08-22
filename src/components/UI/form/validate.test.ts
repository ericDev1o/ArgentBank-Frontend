import { validate } from './validate'

describe('validate', () => {
  it('must return errors when fields are empty', () => {
    const result = validate({ email: '', password: '' })
    expect(result.email).toBe('Email is required')
    expect(result.password).toBe('Password is required')
  })

  it('must return error for invalid email format', () => {
    const result = validate({ email: 'invalid-email', password: '123456' })
    expect(result.email).toBe('Email is invalid')
    expect(result.password).toBeUndefined()
  })

  it('should not return errors for valid inputs', () => {
    const result = validate({ email: 'user@example.com', password: 'Passw0rd!' })
    expect(result).toEqual({})
  })
})