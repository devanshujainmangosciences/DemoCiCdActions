import {render, screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {ForgotPassword} from '@/pages/registration';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('Testing Forgot Password Page flow', () => {
  const user = userEvent.setup();
  test('Testing if forgot password pages renders correctly', () => {
    renderWithProviders(<ForgotPassword />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByText('forgot-password')).toBeInTheDocument();
  });
  test('Testing if user enters email', async () => {
    const handleSubmit = vi.fn();
    renderWithProviders(<ForgotPassword onSubmit={handleSubmit} />, {
      wrapper: BrowserRouter,
    });
    //user not enters data and click on submit

    const submitButton = screen.getByRole('button');

    const userInputEmail = screen.getByPlaceholderText('emailOrmobile');
    await user.type(userInputEmail, 'anandgautam9911@gmail.com');
    expect(userInputEmail.value).toBe('anandgautam9911@gmail.com');
    await user.click(submitButton);
    waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
