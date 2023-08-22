import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '../../tests/test-utils';
import {describe, expect, test} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import StartLoanApplication from '../../pages/StartLoanApplication/index';
import React from 'react';

describe('Complete Application Applicant Step-1 Page testing', () => {
  test('Rendering of Step-1 Applicant Complete Application', async () => {
    renderWithProviders(<StartLoanApplication />, {wrapper: BrowserRouter});
    await waitFor(async () => {
      const isFinancialAssistance = screen.getByText(
        'Loan With Financial Assistance'
      );
      expect(isFinancialAssistance).toBeInTheDocument();
    });
  });
  test('Clicking on the Radio Button', async () => {
    renderWithProviders(<StartLoanApplication />, {wrapper: BrowserRouter});
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(4);
    const selfEmployedRadioButton = radioButtons[0];
    userEvent.click(selfEmployedRadioButton);
    // expect(useAppDispatch).toHaveBeenCalled();
  });
  test('Clicking on the Proceed Button', async () => {
    renderWithProviders(<StartLoanApplication />, {wrapper: BrowserRouter});
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(4);
    const selfEmployedRadioButton = radioButtons[0];
    await userEvent.click(selfEmployedRadioButton);
    // expect(useAppDispatch).toHaveBeenCalled();
    const proceedButton = screen.getByRole('button', {name: 'proceed'});
    await userEvent.click(proceedButton);
    // expect(useAppDispatch).toHaveBeenCalled();
  });
});
