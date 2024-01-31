'use client';
import React, { useState } from 'react';
import axios from 'axios';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const isFormValid = () => {
    if (!email || !password) {
      setValidationError('Please enter email and password.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Invalid email address.');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      const response = await axios.get('https://reqres.in/api/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <form className='m-8 rounded-md p-6' onSubmit={handleSubmit}>
      <div className='mb-2'>
        <label for='email'>Email:</label>
        <input
          className='border-2 rounded-md ml-2 px-2'
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-6'>
        <label for='password'>Password:</label>
        <input
          className='border-2 rounded-md ml-2 px-2'
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='mb-2 px-4 border-2 rounded-md' type='submit'>Login</button>
      {validationError && <div className='text-red-600'>{validationError}</div>}
    </form>
  );
};

export default LoginForm;