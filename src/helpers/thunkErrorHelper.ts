/**
 * This function is a cross-form component thunk DRY helper.
 * @param error catched error message from thunk fetch
 * @param setServerError User or UserForm or LoginForm serverError state setter
 * @param msg Component thunk depending message, 
 * for example userForm is 'Update user name failed: '
 */
export default function thunkError_helper(
    error: unknown, 
    setServerError: React.Dispatch<React.SetStateAction<string | null>>,
    msg: string
) {
    switch (error) {
        case 'Error: User not found!':
        setServerError(error)
        break
        case 'Connection error':
        setServerError(msg + 'unknown connection error')
        break
        default:
        setServerError(msg + 'internal server error')
    }
}