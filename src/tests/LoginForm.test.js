import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginForm from '../app/components/LoginForm.js';

jest.mock('axios');

describe('LoginForm', () => {
  test('renders login form', () => {
    expect.assertions(3);

    const { getByLabelText, getByText } = render(<LoginForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    expect(emailInput).not.toBe(null);
    expect(passwordInput).not.toBe(null);
    expect(loginButton).not.toBe(null);
  });

  test('submits valid login form', async () => {
    expect.assertions(2);

    axios.get.mockResolvedValueOnce({ data: { token: 'fake-token' } });

    const { getByLabelText, getByText, queryByText } = render(<LoginForm />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      const validationError = queryByText(/Please enter email and password./i);
      expect(validationError).toBe(null);

      expect(axios.get).toHaveBeenCalledWith(
        'https://reqres.in/api/login',
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
        })
      );
    });
  });

  test('displays error for invalid login form', async () => {
    expect.assertions(1);

    const { getByText } = render(<LoginForm />);
    const loginButton = getByText(/login/i);

    fireEvent.click(loginButton);

    await waitFor(() => {
      const validationError = getByText(/Please enter email and password./i);
      expect(validationError).not.toBe(null);
    });
  });
});