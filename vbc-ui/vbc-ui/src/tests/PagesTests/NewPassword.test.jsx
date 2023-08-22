import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import {CreatePassword} from '@/pages/registration';

describe('Create a New Password Page testing', () => {
  const onSubmit = vi.fn();
  beforeEach(() => {
    renderWithProviders(<CreatePassword onSubmit={onSubmit} />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Password page', async () => {
    expect(screen.getByPlaceholderText(/newPassword/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirmPassword/i)).toBeInTheDocument();
  });

  test('Checking if password entered in newPassword and confirm password is same', async () => {
    const newPassword = screen.getByPlaceholderText(/newPassword/i);
    const confirmPassword = screen.getByPlaceholderText(/confirmPassword/i);
    await userEvent.type(newPassword, 'Anand@123');
    await userEvent.type(confirmPassword, 'Anand@123');
    // expect(newPassword.value).toBe(confirmPassword.value);
    const passwordShouldMatchText = screen.queryByText(/passwordShouldMatch/i);
    expect(passwordShouldMatchText).not.toBeInTheDocument();
  });
  test('Checking if password entered in newPassword and confirm password is not same ', async () => {
    const newPassword = screen.getByPlaceholderText(/newPassword/i);
    const confirmPassword = screen.getByPlaceholderText(/confirmPassword/i);
    await userEvent.type(newPassword, 'Anand@123');
    await userEvent.type(confirmPassword, 'Anand@12');
    // expect(newPassword.value).toBe(confirmPassword.value);
    const passwordShouldMatchText = screen.queryByText(/passwordShouldMatch/i);
    expect(passwordShouldMatchText).toBeInTheDocument();
  });
  test('Testing if Strong password criteria is fulfiled ', async () => {
    const newPassword = screen.getByPlaceholderText(/newPassword/i);
    const confirmPassword = screen.getByPlaceholderText(/confirmPassword/i);
    await userEvent.type(newPassword, 'Anand@123');
    await userEvent.type(confirmPassword, 'Anand@123');
    // expect(newPassword.value).toBe(confirmPassword.value);
    const passwordShouldMatchText = screen.queryByText(/strongPassword/i);
    expect(passwordShouldMatchText).not.toBeInTheDocument();
  });
  test('Testing if Strong password criteria is failed ', async () => {
    const newPassword = screen.getByPlaceholderText(/newPassword/i);
    const confirmPassword = screen.getByPlaceholderText(/confirmPassword/i);
    await userEvent.type(newPassword, 'Anand123');
    await userEvent.type(confirmPassword, 'Anand123');
    // expect(newPassword.value).toBe(confirmPassword.value);
    const passwordShouldMatchText = screen.queryByText(/strongPassword/i);
    expect(passwordShouldMatchText).toBeInTheDocument();
  });
});
