import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {LoanApplication} from '@/pages/vbc-program';
import {beforeEach, describe, expect, test, vi} from 'vitest';

describe('PBP Program Step-4 Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<LoanApplication />, {
      wrapper: BrowserRouter,
    });
  });

  test('Progression of Step-1,Step-2 and step-3', async () => {
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
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      const submitButton = screen.getByRole('button', {
        name: /saveAndProceed/i,
      });
      expect(submitButton).not.toBeDisabled();
      await userEvent.click(submitButton);
    });
  });
  test('Rendering STEP-4 Correctly', async () => {
    const reviewScreen = screen.getByRole('heading', {
      name: /reviewApplicationandConfirm/i,
    });
    expect(reviewScreen).toBeInTheDocument();
  });
  test('On Click View PBP schedule screen', async () => {
    const viewPbpButton = screen.getByRole('button', {
      name: /viewVBCschedule/i,
    });
    expect(viewPbpButton).toBeInTheDocument();
    await userEvent.click(viewPbpButton);
    const pbpScreen = screen.getByRole('heading', {
      name: /vbcSchedule/i,
    });
    expect(pbpScreen).toBeInTheDocument();
  });
  test('On Click back button from PBP schedule screen', async () => {
    const viewPbpButton = screen.getByRole('button', {
      name: /viewVBCschedule/i,
    });
    expect(viewPbpButton).toBeInTheDocument();
    await userEvent.click(viewPbpButton);
    const pbpScreen = screen.getByRole('heading', {
      name: /vbcSchedule/i,
    });
    expect(pbpScreen).toBeInTheDocument();
    const backButton = screen.getByRole('button', {
      name: /back/i,
    });
    expect(backButton).toBeInTheDocument();
    await userEvent.click(backButton);
    const reviewScreen = screen.getByRole('heading', {
      name: /reviewApplicationandConfirm/i,
    });
    expect(reviewScreen).toBeInTheDocument();
  });

  test('When clicked on edit payment Framework', async () => {
    const editButtons = screen.getAllByRole('button', {name: /edit/i});
    await userEvent.click(editButtons[0]);
    const readTerms = screen.getByText(/ReadTermsAndConditions/i);
    expect(readTerms).toBeInTheDocument();
  });
  test('When clicked on edit Account details', async () => {
    const editButtons = screen.getAllByRole('button', {name: /edit/i});
    await userEvent.click(editButtons[1]);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
    const saveButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    await userEvent.click(saveButton);
    await waitFor(async () => {
      const header = screen.getByText(/totalMedicationCost/i);
      expect(header).toBeInTheDocument();
    });
  });
  test('When Submit Button is clicked', async () => {
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const submitButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    expect(submitButton).not.toBeDisabled();
    await userEvent.click(submitButton);
    await waitFor(async () => {
      const reviewScreen = screen.getByRole('heading', {
        name: /reviewApplicationandConfirm/i,
      });
      expect(reviewScreen).toBeInTheDocument();
    });
    const submitButton2 = screen.getByRole('button', {
      name: /submitApplication/i,
    });
    await userEvent.click(submitButton2);
    await waitFor(async () => {
      const confirmSubmitScreen = screen.getByText(/startLoanApplication/i);
      expect(confirmSubmitScreen).toBeInTheDocument();
      const confirmBtn = screen.getByText('confirm');
      await userEvent.click(confirmBtn);
    });
  });
  test('After Submit button is clicked', async () => {
    const reviewScreen = screen.getByRole('heading', {
      name: /reviewApplication/i,
    });
    expect(reviewScreen).toBeInTheDocument();
  });
});
