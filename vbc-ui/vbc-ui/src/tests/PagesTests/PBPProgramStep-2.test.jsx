import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {PaymentFrameworkForm} from '@/pages/vbc-program/children';
import {LoanApplication} from '@/pages/vbc-program';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {server} from '@/__mocks__/server';
import {rest} from 'msw';

describe('PBP Program Step-2 Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<LoanApplication />, {
      wrapper: BrowserRouter,
    });
  });

  test('Step-2 Progression', async () => {
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

  test('Rendering STEP-2 Correctly', async () => {
    await waitFor(() => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(2);
    });
  });
  test('Filling all the data and input check with response', async () => {
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBe(2);
    const textInputs = screen.getAllByRole('textbox');
    const numberInputs = screen.getAllByRole('spinbutton');
    const comboboxes = screen.getAllByRole('combobox');
    expect(textInputs.length).toBe(7);
    expect(numberInputs.length).toBe(4);
    expect(comboboxes.length).toBe(6);
    const bankAcNumber = textInputs[0];
    const bankName = textInputs[1];
    const bankBranch = textInputs[2];
    const bankIfsc = textInputs[3];
    const pan = textInputs[4];
    const eduLevel = comboboxes[0];
    const profession = comboboxes[1];
    const employer = comboboxes[2];
    const industry = comboboxes[3];
    const insurance = comboboxes[4];
    const insuranceInput = comboboxes[5];
    const industryInput = textInputs[5];
    const designation = textInputs[6];
    const avgAnnualIncome = numberInputs[0];
    const anyOtherSource = numberInputs[1];
    const maturityAmount = numberInputs[2];
    const familyIncome = numberInputs[3];

    expect(bankAcNumber.value).toBe('BANK');
    expect(bankName.value).toBe('Bank');
    expect(bankBranch.value).toBe('Branch');
    expect(bankIfsc.value).toBe('IFSC');
    expect(pan.value).toBe('BTHUI2828K');
    expect(designation.value).toBe('Des');
    expect(industryInput.value).toBe('Aviation');
    expect(eduLevel.value).toBe('High School');
    expect(employer.value).toBe('Tata Consultancy Services Limited');
    expect(industry.value).toBe('Other');
    expect(profession.value).toBe('Private Service');
    expect(insurance.value).toBe('true');
    expect(insuranceInput.value).toBe('Care Health Insurance Ltd');
    expect(avgAnnualIncome.value).toBe('10');
    expect(anyOtherSource.value).toBe('100');
    expect(maturityAmount.value).toBe('1000');
    expect(familyIncome.value).toBe('10000');
  });

  test('When Clicking on Save button to go to step-3', async () => {
    const numberInputs = screen.getAllByRole('spinbutton');
    const comboboxes = screen.getAllByRole('combobox');
    const insuranceInput = comboboxes[5];
    const avgAnnualIncome = numberInputs[0];
    const familyIncome = numberInputs[3];
    await userEvent.selectOptions(
      insuranceInput,
      'Aditya Birla Health Insurance Co Ltd'
    );
    expect(insuranceInput.value).toBe('Aditya Birla Health Insurance Co Ltd');
    expect(avgAnnualIncome.value).toBe('10');
    expect(familyIncome.value).toBe('10000');

    const saveButton = screen.getByRole('button', {
      name: /saveAndProceed/i,
    });
    expect(saveButton).toBeInTheDocument();
    await userEvent.click(saveButton);
    await waitFor(() => {
      const header = screen.getByText(/totalMedicationCost/i);
      expect(header).toBeInTheDocument();
    });
  });
});
