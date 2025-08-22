import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { AppDispatch, AuthFormReqPayload } from '../../../app/types';
import { connectThunk } from '../../../features/connect/connectSlice';
import { validate } from './validate';

import styles from './LoginForm.module.css'

const InputField = (
    { 
        label, 
        type, 
        value, 
        onChange, 
        error, 
        id 
    }
) => (
  <div className='input-wrapper'>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <span 
        id={`${id}-error`}
        className={`${styles.errorColor} ${styles.formInputError}`}
        >
        {error}
      </span>
    )}
  </div>
);

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
    }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className={`${styles.serverError} ${styles.errorColor}`}>
          {serverError}
        </div>
      )}
      <InputField
        id='username'
        label='Username'
        type='email'
        value={formData.email}
        onChange={(value: string) => handleChange('email', value)}
        error={errors.email}
      />
      <InputField
        id='password'
        label='Password'
        type='password'
        value={formData.password}
        onChange={(value: string) => handleChange('password', value)}
        error={errors.password}
      />
      <button type='submit' className='sign-in-button'>
        Sign In
      </button>
    </form>
  );
}