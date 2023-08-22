import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {LoanApplication} from '@/pages/vbc-program';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {server} from '@/__mocks__/server';
import {rest} from 'msw';

describe('PBP Program Step-4 Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<LoanApplication />, {
      wrapper: BrowserRouter,
    });
  });

  test('Progression of Step-1,Step-2 and step-3', async () => {
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
    server.use(
      rest.post(
        `https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/enroll-for-vbc/step-three`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              status: true,
              message: '',
              data: {
                allowCancel: true,
                step: 3,
                currentFixedDepositBank: null,
                paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
                totalPayableAmount: '1820016.00',
                accountNumber: 'BANK',
                bankName: 'Bank',
                bankBranch: 'Bank',
                bankIfscCode: 'IFSC',
                panNumber: 'BTHUI2828K',
                educationLevel: 'High School',
                occupation: 'Private Service',
                employerName: 'Tata Consultancy Services Limited',
                industry: 'Aviation',
                designation: 'Des',
                selfAnnualIncome: '1000',
                otherIncomeSource: '1000',
                insurance: true,
                insuranceCompany: 'Care Health Insurance Ltd',
                maturityAmount: '100992',
                familyAnnualIncome: '19929',
                applicants: [
                  {
                    updatedBy: 'vite-patient-005@mailinator.com',
                    id: 1293,
                    firstName: 'Ewe',
                    middleName: 'Ewew',
                    lastName: 'Ewew',
                    fullName: 'Ewe Ewew Ewew',
                    mobile: '2399928888',
                    mobileVerified: false,
                    mobileOtp: null,
                    birthDate: null,
                    age: 23,
                    email: 'sdsdd@gmai.com',
                    emailVerified: false,
                    emailOtp: null,
                    gender: 'MALE',
                    relationToPatient: 'Friend',
                    userId: null,
                    mangoAccountId: null,
                    permanentAddress: null,
                    permanentCity: null,
                    permanentState: null,
                    permanentCountry: null,
                    permanentPinCode: null,
                    presentAddress: null,
                    presentCity: null,
                    presentState: null,
                    presentCountry: null,
                    presentPinCode: null,
                    aadhaarNumber: null,
                    panNumber: null,
                    bankName: null,
                    bankBranch: null,
                    bankAccountNumber: null,
                    bankIfscCode: null,
                    occupation: null,
                    residenceType: null,
                    professionName: null,
                    experience: null,
                    grossAnnualIncome: null,
                    primaryBank: null,
                    employerName: null,
                    netMonthlyIncome: null,
                    salaryBankAccount: null,
                    tenureAtCompany: null,
                    totalWorkExperience: null,
                    anyOtherAsset: null,
                    companyType: null,
                    companyName: null,
                    natureOfBusiness: null,
                    industryType: null,
                    yearsInBusiness: null,
                    sales: null,
                    annualProfit: null,
                    mainBankerOfCompany: null,
                    currentFixedDepositBank: null,
                    username: '2399928888',
                  },
                ],
                drugId: 1,
                cancelledChequeDocument: {
                  id: 2827,
                  mangoAccountId: '683a33de-e811-4e6c-ac71-89ae30385bbc',
                  documentName: 'Screenshot_6 (1).png',
                  documentTypeId: 16,
                  documentTypeName: 'Cancelled Cheque',
                  documentContentMetadata:
                    'https://vbcdev.blob.core.windows.net/683a33de-e811-4e6c-ac71-89ae30385bbc/1673519556279_Screenshot_6%281%29.png',
                  uploadDate: '2023-01-12T10:32:36.565105',
                },
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
      await waitFor(async () => {
        const header = screen.queryByText(/totalMedicationCost/i);
        expect(header).not.toBeInTheDocument();
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
        const saveAndProceed = screen.getByRole('button', {
          name: /saveAndProceed/i,
        });
        expect(saveAndProceed).toBeInTheDocument();
        await userEvent.click(saveAndProceed);
      });
    });
  });
  test('Rendering STEP-4 Correctly', async () => {
    const reviewScreen = screen.getByRole('heading', {
      name: /reviewApplicationandConfirm/i,
    });
    const paymentFramework = screen.getByText(/paymentFramework/i);
    expect(reviewScreen).toBeInTheDocument();
    expect(paymentFramework).toBeInTheDocument();
  });
  test('Check if table is present with Applicant Data', async () => {
    const applicantTable = screen.getByRole('table');
    expect(applicantTable).toBeInTheDocument();
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
