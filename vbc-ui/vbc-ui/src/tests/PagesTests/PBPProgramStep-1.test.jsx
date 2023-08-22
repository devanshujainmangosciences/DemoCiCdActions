import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {LoanApplication} from '@/pages/vbc-program';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {server} from '@/__mocks__/server';
import {rest} from 'msw';

describe('PBP Program Step-1 Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<LoanApplication />, {
      wrapper: BrowserRouter,
    });
  });

  test('Rendering PBP Program Step-1 page correctly', async () => {
    await expect(screen.getAllByText(/TermsAndConditions?/i).length).toBe(2);
  });

  test('When Confirm button is clicked, it is routed to payment mode selection', async () => {
    const checkBox = screen.getByRole('checkbox', {
      name: /TermsAndConditions/i,
    });
    const confirmButton = screen.getByRole('button', {
      name: /confirm/i,
    });
    await userEvent.click(checkBox);
    await userEvent.click(confirmButton);
    const paymentMode = screen.getByText(/paymentmode/i);
    expect(paymentMode).toBeInTheDocument();
  });
  test('Payment Mode is selected and Save button is clicked', async () => {
    const checkBox = screen.getByRole('checkbox', {
      name: /TermsAndConditions/i,
    });
    const confirmButton = screen.getByRole('button', {
      name: /confirm/i,
    });
    await userEvent.click(checkBox);
    await userEvent.click(confirmButton);
    const roles = screen.getAllByRole('radio');
    expect(roles.length).toBe(2);
    const saveButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    await userEvent.click(roles[0]);
    expect(roles[0].value).toBe('SELF_PAY');
    expect(saveButton).not.toBeDisabled();
    await userEvent.click(saveButton);
    await waitFor(() => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(2);
    });
  });
});
