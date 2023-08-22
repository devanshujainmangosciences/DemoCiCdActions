import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {LoanApplication} from '@/pages/vbc-program';
import {beforeEach, describe, expect, test, vi} from 'vitest';
describe('PBP Program Step-3(Self Pay) Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<LoanApplication />, {
      wrapper: BrowserRouter,
    });
  });
  test('Progression of Step-1 and Step-2', async () => {
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
    const saveButton1 = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    await userEvent.click(roles[0]);
    expect(roles[0].value).toBe('SELF_PAY');
    expect(saveButton1).not.toBeDisabled();
    await userEvent.click(saveButton1);
    await waitFor(async () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(2);
      const saveButton2 = screen.getByRole('button', {
        name: /saveAndProceed/i,
      });
      expect(saveButton2).not.toBeDisabled();
      await userEvent.click(saveButton2);
      await waitFor(() => {
        const header = screen.getByText(/totalMedicationCost/i);
        expect(header).toBeInTheDocument();
      });
    });
  });
  test('Rendering STEP-3 Correctly', async () => {
    const header = screen.getByText(/totalMedicationCost/i);
    expect(header).toBeInTheDocument();
  });
  test('Submit Button to be disabled before enroll confirmation', async () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    const submitButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
  });
  test('Submit Button enabled when enroll confirmation checkbox is checked', async () => {
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const submitButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
  });
  test('Submit Button Click to Review Page', async () => {
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const submitButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });

    await userEvent.click(submitButton);
    await waitFor(async () => {
      const reviewScreen = screen.getByRole('heading', {
        name: /reviewApplicationandConfirm/i,
      });
      expect(reviewScreen).toBeInTheDocument();
    });
  });
});
