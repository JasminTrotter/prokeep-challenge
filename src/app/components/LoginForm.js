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
    <form onSubmit={handleSubmit}>
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {validationError && <div>{validationError}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;