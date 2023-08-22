import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import StartLoanApplication from '../../pages/StartLoanApplication/index';
import React from 'react';
import {setupStore} from '../../redux/store';
import {Provider} from 'react-redux';
import {applicantCompleteStep4State} from '../testAppSelector';

describe('Complete Application Applicant Step-4 Page testing', () => {
  beforeEach(() => {
    const store = setupStore(applicantCompleteStep4State);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StartLoanApplication />
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Rendering of Step-4 Applicant Complete Application', async () => {
    const header = screen.getByRole('heading', {
      name: 'reviewApplicationandConfirm',
    });
    expect(header).toBeInTheDocument();
  });
  test('When Clicking on Edit Button on Occupation Type', async () => {
    const editButtons = screen.getAllByRole('button', {
      name: 'edit',
    });
    expect(editButtons.length).toBe(3);
    const occupationTypeEditButton = editButtons[0];
    await userEvent.click(occupationTypeEditButton);
    await waitFor(() => {
      const step1Text = screen.getByText(/patientHastoSelectFollowingPayment/i);
      expect(step1Text).toBeInTheDocument();
    });
  });
  test('When Clicking on Edit Button on Financial Information Type', async () => {
    const editButtons = screen.getAllByRole('button', {
      name: 'edit',
    });
    expect(editButtons.length).toBe(3);
    const occupationTypeEditButton = editButtons[1];
    await userEvent.click(occupationTypeEditButton);
    await waitFor(() => {
      const step1Text = screen.getByText(/bankAccountDetails/i);
      expect(step1Text).toBeInTheDocument();
    });
  });
  test('When Clicking on Edit Button on Required Document', async () => {
    const editButtons = screen.getAllByRole('button', {
      name: 'edit',
    });
    expect(editButtons.length).toBe(3);
    const occupationTypeEditButton = editButtons[2];
    await userEvent.click(occupationTypeEditButton);
    await waitFor(() => {
      const step1Text = screen.getByText(/documents:requiredDocuments/i);
      expect(step1Text).toBeInTheDocument();
    });
  });
  test('When Clicking on Submit Button', async () => {
    const submitButton = screen.getByRole('button', {
      name: 'submit',
    });

    await userEvent.click(submitButton);
    await waitFor(() => {
      const submitButton = screen.queryByRole('button', {
        name: 'submit',
      });
      expect(submitButton).not.toBeInTheDocument();
    });
  });
});
