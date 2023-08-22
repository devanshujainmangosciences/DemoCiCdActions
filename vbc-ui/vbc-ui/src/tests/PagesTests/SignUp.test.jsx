import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {Signup} from '@/pages/registration';
import * as mockApiCall from '../../__mocks__/mockApis';
import {act} from 'react-dom/test-utils';

vi.mock('axios');
vi.mock('@/__mocks__/mockApis');
vi.mock('../../actions');

describe('Testing Registration flow', () => {
  const onSubmit = vi.fn();
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );
  beforeEach(() => {
    fetch.mockClear();
    onSubmit.mockClear();
  });

  test('Rendering Register Form', async () => {
    const route = '/registration/sign-up';
    renderWithProviders(
      <MemoryRouter initialEntries={[route]}>
        <Signup onSubmit={onSubmit} />
      </MemoryRouter>
    );
    const register = screen.getByText(/register/i);
    expect(register).toBeInTheDocument();
  });
  test('Testing invalid Email Test', async () => {
    const route = '/registration/sign-up';
    renderWithProviders(
      <MemoryRouter initialEntries={[route]}>
        <Signup onSubmit={onSubmit} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const name = screen.getByPlaceholderText('name');
    await user.type(name, 'Anand');
    expect(name.value).toBe('Anand');
    const email = screen.getByPlaceholderText('emailOrmobile');
    await user.type(email, 'anandgautam9911');
    const errormessage = screen.getByText('validEmailOrmobile');
    expect(errormessage).toBeInTheDocument();
    await user.type(email, 'anandgautam9911@gmail.com');
    const errormessage2 = screen.queryByText('validEmailOrmobile');
    expect(errormessage2).not.toBeInTheDocument();
  });
  test('onSubmit is called when all fields pass validation', async () => {
    const route = '/registration/sign-up';
    const nextroute = '/registration/otp';
    renderWithProviders(
      <MemoryRouter initialEntries={[route]}>
        <Signup onSubmit={onSubmit} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const name = screen.getByPlaceholderText('name');
    await user.type(name, 'Anand');
    expect(name.value).toBe('Anand');
    const email = screen.getByPlaceholderText('emailOrmobile');
    await user.type(email, 'anandgautam9911@gmail.com');
    expect(email.value).toBe('anandgautam9911@gmail.com');
    const submitButton = screen.getByText(/Next/i);
    await user.click(submitButton);
    waitFor(() => {
      const otpPage = screen.getByText('enterOtp');
      expect(otpPage).toBeInTheDocument();
    });
  });
});
