import {render, screen} from '@testing-library/react';
import {describe, expect, test, vi} from 'vitest';
import StartLoanApplication from '../../pages/StartLoanApplication/index';
import React from 'react';
import {applicantCompleteStep2State} from '../testAppSelector';
import {setupStore} from '../../redux/store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';

describe('Complete Application Applicant Step-1 Page testing', () => {
  beforeEach(() => {
    const store = setupStore(applicantCompleteStep2State);
    render(
      <Provider store={store}>
        <StartLoanApplication />
      </Provider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Rendering of Step-2 Applicant Complete Application', async () => {
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(3);
  });
  test('Clicking on Save and Proceed button without adding all the inputs', async () => {
    const mockFn = vi.fn();
    const saveAndProceedButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    await userEvent.click(saveAndProceedButton);
    expect(mockFn).not.toHaveBeenCalled();
  });
  test('Clicking on Save and Proceed button without adding all the inputs', async () => {
    const saveAndProceedButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    const mockFn = vi.fn();
    const textBoxes = screen.getAllByRole('textbox');
    const comboboxes = screen.getAllByRole('combobox');
    const spinButtons = screen.getAllByRole('spinbutton');
    expect(textBoxes.length).toBe(5);
    await userEvent.type(textBoxes[0], 'BANK ACCOUNT NUMBER');
    await userEvent.type(textBoxes[1], 'BANK NAME');
    await userEvent.type(textBoxes[2], 'BANK BRANCH');
    await userEvent.type(textBoxes[3], 'BANK IFSC CODE');
    await userEvent.type(textBoxes[4], '2');
    expect(comboboxes.length).toBe(5);
    await userEvent.selectOptions(comboboxes[1], 'Unemployed');
    await userEvent.selectOptions(comboboxes[2], '1 Month');
    await userEvent.selectOptions(comboboxes[3], 'State Bank of India');
    await userEvent.selectOptions(comboboxes[4], 'Rented');
    expect(spinButtons.length).toBe(1);
    await userEvent.type(spinButtons[0], '1000');
    await userEvent.click(saveAndProceedButton);
    mockFn();
    expect(mockFn).toHaveBeenCalled();
  });
});
