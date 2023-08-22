import {render, screen, waitFor} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import StartLoanApplication from '../../pages/StartLoanApplication/index';
import {applicantCompleteStep3State} from '../testAppSelector';
import React from 'react';
import {setupStore} from '../../redux/store';
import {Provider} from 'react-redux';

describe('Complete Application Applicant Step-3 Page testing', () => {
  beforeEach(() => {
    const store = setupStore(applicantCompleteStep3State);
    render(
      <Provider store={store}>
        <StartLoanApplication />
      </Provider>
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Rendering of Step-3 Applicant Complete Application', async () => {
    const header = screen.getByRole('heading', {
      name: 'documents:requiredDocuments',
    });
    expect(header).toBeInTheDocument();
  });
  test('Select Document Type', async () => {
    const combobox = screen.getAllByRole('combobox');
    const selectDocument = combobox[0];
    await userEvent.selectOptions(
      selectDocument,
      'Appointment letter from employer'
    );
    const value = screen.getByDisplayValue(/Appointment letter from employer/i);
    expect(value).toBeInTheDocument();
  });
  test('Select Document', async () => {
    const combobox = screen.getAllByRole('combobox');
    const selectDocument = combobox[0];
    await userEvent.selectOptions(
      selectDocument,
      'Appointment letter from employer'
    );
    const value = screen.getByDisplayValue(/Appointment letter from employer/i);
    expect(value).toBeInTheDocument();
    const browseButton = screen.getByLabelText(/browse/i);
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    await userEvent.upload(browseButton, file);
    await userEvent.upload(browseButton, file);
    expect(browseButton.files[0]).toBe(file);
    expect(browseButton.files.item(0)).toBe(file);
    expect(browseButton.files).toHaveLength(1);
  });
  test('On Cancel Button Click', async () => {
    const combobox = screen.getAllByRole('combobox');
    const selectDocument = combobox[0];
    await userEvent.selectOptions(
      selectDocument,
      'Appointment letter from employer'
    );
    const value = screen.getByDisplayValue(/Appointment letter from employer/i);
    expect(value).toBeInTheDocument();
    const browseButton = screen.getByLabelText(/browse/i);
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    await userEvent.upload(browseButton, file);
    expect(browseButton.files[0]).toBe(file);
    expect(browseButton.files.item(0)).toBe(file);
    expect(browseButton.files).toHaveLength(1);
    const cancelButton = screen.getByRole('button', {name: 'documents:cancel'});
    await userEvent.click(cancelButton);
    await waitFor(() => {
      const value = screen.queryByDisplayValue(
        /Appointment letter from employer/i
      );
      expect(value).not.toBeInTheDocument();
    });
  });
  test('On Upload Button Click', async () => {
    const mockFn = vi.fn();
    const combobox = screen.getAllByRole('combobox');
    const selectDocument = combobox[0];
    await userEvent.selectOptions(
      selectDocument,
      'Appointment letter from employer'
    );
    const value = screen.getByDisplayValue(/Appointment letter from employer/i);
    expect(value).toBeInTheDocument();
    const browseButton = screen.getByLabelText(/browse/i);
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    await userEvent.upload(browseButton, file);
    expect(browseButton.files[0]).toBe(file);
    expect(browseButton.files.item(0)).toBe(file);
    expect(browseButton.files).toHaveLength(1);
    const uploadButton = screen.getByRole('button', {name: 'documents:upload'});
    await userEvent.click(uploadButton);
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });
});
