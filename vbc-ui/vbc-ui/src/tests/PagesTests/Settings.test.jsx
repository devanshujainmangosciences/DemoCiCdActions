import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {Settings} from '@/pages/profile';
import {beforeEach, describe, expect, test, vi} from 'vitest';

describe('Settings Page', () => {
  beforeEach(() => {
    renderWithProviders(<Settings />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Settings Page', async () => {
    expect(
      screen.getByRole('heading', {
        name: /settings:settings/i,
      })
    ).toBeInTheDocument();
  });
  test('Change Password Button Click', async () => {
    const onChangePasswordClick = vi.fn();
    const changePassButton = screen.getByRole('button', {
      name: /settings:changePassword/i,
    });
    userEvent.click(changePassButton);
  });
});
