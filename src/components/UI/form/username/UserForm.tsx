import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

/**
 * See aliases paths in /tsconfig.json
 */
import { AppDispatch, UserFormPayload, UserPayload } from '@/app/types';
import { putProfileThunk } from '@/features/profile/profileSlice';
import { validate } from '../username/validateUserForm';
import { InputField } from '../InputField';
import { 
  getFirstName, 
  getLastName, 
  getToken, 
  getUserName 
} from '@/app/selectors';
import thunkError_helper from '@/helpers/thunkErrorHelper';

import '@/css/components/UI/form/form.css'

export default function UserForm({hideEdit}: {hideEdit: () => void}){
  const dispatch = useDispatch<AppDispatch>();

  const token = getToken()
  const firstName = getFirstName()
  const lastName = getLastName()
  const currentUserName = getUserName()

  const [formData, setFormData] = useState<UserFormPayload>({ userName: currentUserName });
  const [errors, setErrors] = useState<Partial<UserFormPayload>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (key: keyof UserFormPayload, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
    setServerError(null);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault()

    hideEdit()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload: UserPayload = {
      userName: formData.userName,
      token: token
    }

    try {
      await dispatch(putProfileThunk(payload)).unwrap();
      hideEdit()
    } catch (error) {
        const msg = 'Update user name failed: '
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
        label='User name'
        type='text'
        value={formData.userName}
        onChange={(value: string) => handleChange('userName', value)}
        disabled={false}
        error={errors.userName}
      />
      <InputField
        id='firstName'
        name='firstName'
        label='First name'
        type='text'
        value={firstName}
        onChange={() => {}}
        disabled={true}
        error={''}
      />
       <InputField
        id='lastName'
        name='lastName'
        label='Last name'
        type='text'
        value={lastName}
        onChange={() => {}}
        disabled={true}
        error={''}
      />
      <button type='submit' className='sign-in-button'>
        Save
      </button>
      <button type='button' className='sign-in-button' onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}