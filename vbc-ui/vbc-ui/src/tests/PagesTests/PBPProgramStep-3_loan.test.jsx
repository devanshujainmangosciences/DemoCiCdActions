import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {LoanApplication} from '@/pages/vbc-program';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {server} from '@/__mocks__/server';
import {rest} from 'msw';
describe('PBP Program Step-3(LOAN) Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<LoanApplication />, {
      wrapper: BrowserRouter,
    });
  });

  test('Progression of Step-1 and Step-2', async () => {
    server.use(
      rest.post(
        `https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/enroll-for-vbc/step-two`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              status: true,
              message: '',
              data: {
                allowCancel: true,
                step: 2,
                currentFixedDepositBank: null,
                paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
                totalPayableAmount: '1820040.00',
                accountNumber: 'BANK',
                bankName: 'Bank',
                bankBranch: 'Branch',
                bankIfscCode: 'IFSC',
                panNumber: 'BTHUI2828K',
                educationLevel: 'High School',
                occupation: 'Private Service',
                employerName: 'Tata Consultancy Services Limited',
                industry: 'Aviation',
                designation: 'Des',
                selfAnnualIncome: '10',
                otherIncomeSource: '100',
                insurance: true,
                insuranceCompany: 'Care Health Insurance Ltd',
                maturityAmount: '1000',
                familyAnnualIncome: '10000',
                applicants: null,
                drugId: 1,
              },
            })
          );
        }
      )
    );
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
    await userEvent.click(roles[1]);
    expect(roles[1].value).toBe('LOAN_WITH_FINANCIAL_ASSISTANCE');
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
        const header = screen.queryByText(/totalMedicationCost/i);
        expect(header).not.toBeInTheDocument();
      });
    });
  });

  test('Rendering STEP-3(LOAN) Correctly', async () => {
    await waitFor(async () => {
      const header = screen.getByRole('heading', {
        name: /applicants:addApplicantsUpToFive:/i,
      });
      expect(header).toBeInTheDocument();
    });
  });
  test('Filling applicant form in step-3 when clearAll button is clicked', async () => {
    const getInputs = screen.getAllByRole('textbox');
    const spinButtons = screen.getAllByRole('spinbutton');
    const comboboxes = screen.getAllByRole('combobox');
    const clearButton = screen.getByRole('button', {name: 'clearAll'});
    expect(getInputs.length).toBe(4);
    expect(spinButtons.length).toBe(2);
    expect(comboboxes.length).toBe(2);
    await userEvent.type(getInputs[0], 'First Name');
    await userEvent.type(getInputs[2], 'Last Name');
    await userEvent.type(getInputs[2], 'email@gmail.com');
    await userEvent.type(spinButtons[0], '23');
    await userEvent.type(spinButtons[1], '9003223819');
    await userEvent.selectOptions(comboboxes[0], 'MALE');
    await userEvent.selectOptions(comboboxes[1], 'Self');
    expect(getInputs[0].value).toBe('First Name');
    await userEvent.click(clearButton);
    expect(getInputs[0].value).toBe('');
  });
  test('Filling applicant form in step-3 when save button is clicked', async () => {
    const getInputs = screen.getAllByRole('textbox');
    const spinButtons = screen.getAllByRole('spinbutton');
    const comboboxes = screen.getAllByRole('combobox');
    const saveButton = screen.getByRole('button', {name: 'save'});
    expect(getInputs.length).toBe(4);
    expect(spinButtons.length).toBe(2);
    expect(comboboxes.length).toBe(2);
    await userEvent.type(getInputs[0], 'First Name');
    await userEvent.type(getInputs[2], 'Last Name');
    await userEvent.type(getInputs[3], 'email@gmail.com');
    await userEvent.type(spinButtons[0], '23');
    await userEvent.type(spinButtons[1], '9003223819');
    await userEvent.selectOptions(comboboxes[0], 'MALE');
    await userEvent.selectOptions(comboboxes[1], 'Self');
    expect(getInputs[0].value).toBe('First Name');
    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
    await userEvent.click(saveButton);
    const tableData = screen.queryByRole('table');
    expect(tableData).toBeInTheDocument();
  });
});
