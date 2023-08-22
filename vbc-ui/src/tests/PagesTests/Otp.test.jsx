import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import {Otp} from '@/pages/registration';

describe('OTP Testing flow', () => {
  const onSubmit = vi.fn();
  beforeEach(() => {
    renderWithProviders(<Otp onSubmit={onSubmit} />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendeting of the OTP Screen', async () => {
    expect(screen.getByText(/enterOtp/i)).toBeInTheDocument();
  });
  test('Checking if input entered correctly', async () => {
    const inputText = screen.getByPlaceholderText(/placeholderEnterOtp/i);
    expect(inputText).toBeInTheDocument();
    await userEvent.type(inputText, '2344');
    expect(inputText.value).toBe('2344');
  });
  // test('Submit OTP Click without input', async () => {
  //   const inputText = screen.getByPlaceholderText(/placeholderEnterOtp/i);
  //   expect(inputText).toBeInTheDocument();
  //   const button = screen.getByRole('button');
  //   await userEvent.click(button);
  //   expect(onSubmit).toHaveBeenCalledTimes(0);
  //   await userEvent.type(inputText, '2344');
  //   expect(inputText.value).toBe('2344');
  //   await userEvent.click(button);
  // });
});
