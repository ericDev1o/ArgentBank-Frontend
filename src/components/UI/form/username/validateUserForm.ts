/**
 * See aliases paths in /tsconfig.json
 */
import { UserFormPayload } from '@/app/types'

export const validate = (data: UserFormPayload): Partial<UserFormPayload> => {
    const errors: Partial<UserFormPayload> = {}
    if (!data.userName) errors.userName = 'User name is required'

    return errors
}