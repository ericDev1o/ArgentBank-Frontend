import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/**
 * See aliases paths in /tsconfig.json
 */
import { AppDispatch, AuthFormReqPayload } from '@/app/types';
import { connectThunk } from '@/features/connect/connectSlice';
import { validate } from './validateLoginForm';
import { InputField } from '../InputField';
import thunkError_helper from '@/helpers/thunkErrorHelper';

import '@/css/components/UI/form/form.css'

/**
 * This component simplifies
 *     1. frontend validation: format checks (email, password filled) before server request.
 *     2. error prevention and intellisense typing: TypeScript types
 *     3. user errors handling: invalid typing or connection fails cases to enhance UX.
 * @returns a reusable form component
 */
export default function LoginForm(){
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AuthFormReqPayload>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<AuthFormReqPayload>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (key: keyof AuthFormReqPayload, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(connectThunk(formData)).unwrap();
      navigate('/user/1');
    } catch (error) {
        const msg = 'Login failed: '
        thunkError_helper(error, setServerError, msg)
      }
    }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className='server-error error-color'>
          {serverError}
        </div>
      )}
      <InputField
        id='username'
        name='userName'
        label='Username'
        type='email'
        value={formData.email}
        onChange={(value: string) => handleChange('email', value)}
        disabled={false}
        error={errors.email}
      />
      <InputField
        id='password'
        name='password'
        label='Password'
        type='password'
        value={formData.password}
        onChange={(value: string) => handleChange('password', value)}
        disabled={false}
        error={errors.password}
      />
      <button 
        type='submit' 
        className='
          button 
          cursor-pointer
          display-block 
          width-100percent 
          margin-top-1rem 
          padding-8px 
          font-weight-bold 
          font-size-1dot1rem'>
        Sign In
      </button>
    </form>
  );
}