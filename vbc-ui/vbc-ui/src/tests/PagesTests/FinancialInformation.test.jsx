import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {FinancialInformation} from '@/pages/profile';
import userEvent from '@testing-library/user-event';

describe('Financial Information For Component', () => {
  const editButtonMock = vi.fn();
  beforeEach(() => {
    renderWithProviders(<FinancialInformation />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Financial Information Page test', async () => {
    expect(
      screen.getByRole('heading', {
        name: /loanApplication:bankAccountDetails/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /loanApplication:professionalandotherfinancialinformation/i,
      })
    ).toBeInTheDocument();
  });
  test('Rendring Financial in View Mode', async () => {
    const inputBox = screen.queryAllByRole('textbox');
    expect(inputBox.length).toBe(0);
  });
  test('Rendring Financial in Edit Mode', async () => {
    const editButton = screen.getByRole('button', {
      name: /loanApplication:Edit/i,
    });
    await userEvent.click(editButton);
    await waitFor(() => {
      //   expect(editButtonMock).toHaveBeenCalledTimes(1);
      const bank = screen.queryAllByRole('heading', {name: 'BANK'});
      expect(bank.length).toBe(0);
      const inputBox = screen.queryAllByRole('textbox');
      expect(inputBox.length).toBe(7);
    });
  });
  test('When Cancel button is clicked', async () => {
    const editButton = screen.getByRole('button', {
      name: /loanApplication:Edit/i,
    });
    await userEvent.click(editButton);
    const cancelButton = screen.getByRole('button', {name: /cancel/i});
    await userEvent.click(cancelButton);
    const inputBox = screen.queryAllByRole('textbox');
    expect(inputBox.length).toBe(0);
  });
});
