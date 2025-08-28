/**
 * See aliases paths in /tsconfig.json
 */
import { AuthFormReqPayload } from '@/app/types'

export const validate = (data: AuthFormReqPayload): Partial<AuthFormReqPayload> => {
    const errors: Partial<AuthFormReqPayload> = {}
    if (!data.email) errors.email = 'Email is required'
    else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(data.email)) errors.email = 'Email is invalid'

    if (!data.password) errors.password = 'Password is required'

    return errors
}