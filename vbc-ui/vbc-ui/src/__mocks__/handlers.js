import {rest, setupWorker} from 'msw';

export const handlers = [
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/csrf',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/check-data-synchronization',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          dataSynchronized: true,
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/user/forgot-password',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: '65284383-1565-4305-89ab-6e97bb43752d',
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/register',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: '65284383-1565-4305-89ab-6e97bb43752d',
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/register/verify',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/your-details',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Profile found.',
          data: {
            firstName: 'patient',
            middleName: 'test',
            lastName: 'lender',
            gender: 'MALE',
            age: 3,
            birthDate: '2019-01-29',
            permanentAddress: 'PERm',
            permanentCity: 'Machalpur',
            permanentState: 'Madhya Pradesh',
            permanentCountry: 'India',
            permanentPinCode: '333',
            presentAddress: 'PERm',
            presentCity: 'Machalpur',
            presentState: 'Madhya Pradesh',
            presentCountry: 'India',
            presentPinCode: '333',
            panNumber: 'BTSPG3732J',
            aadharNumber: '',
            language: 'English',
            id: 1204,
            username: 'patient-009@mailinator.com',
            email: 'patient-009@mailinator.com',
            emailVerified: true,
            mobile: '',
            mobileVerified: false,
            homeContactNumber: null,
            diagnosis: 'Breast Cancer',
            drug: {
              id: 1,
              drugGenericName: 'Osimertinib',
              brandName: 'Tagrisso',
              visible: true,
              drugName: 'Tagrisso-Osimertinib',
            },
            hospital: {
              id: 1,
              hospitalName: 'Aster CMI',
              hospitalGroupName: 'Aster DM Healthcare',
            },
            doctor: {
              id: 8,
              name: 'Ramesh  Murthy',
            },
            drugId: 1,
            hospitalId: 1,
            doctorId: 8,
            mrn: 'adad3we',
            uniqueId: 'M0179',
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/get-financial-information',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Patient finance information found.',
          data: {
            updatedBy: 'patient-009@mailinator.com',
            panNumber: 'BTSPG3732J',
            occupation: 'Unemployed',
            employerName: 'Reliance Industries Limited',
            industry: 'Aviation',
            designation: 'dadad',
            otherIncomeSource: '312313',
            insurance: false,
            insuranceCompany: null,
            maturityAmount: '12313',
            educationLevel: 'High School',
            selfAnnualIncome: '21313',
            familyAnnualIncome: '321313',
            accountNumber: 'BANK',
            bankBranch: 'adad',
            bankIfscCode: 'dadad',
            bankName: 'BANK',
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/update-financial-information',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/get-enrollment-data',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            allowCancel: false,
            step: 0,
            currentFixedDepositBank: null,
            paymentTypeOpted: 'SELF_PAY',
            totalPayableAmount: null,
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
            applicants: [],
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
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-document/document/list',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Documents List Found.',
          data: [
            {
              id: 1801,
              mangoAccountId: '0aa08102-6405-4ff9-98a0-d82adab4fff2',
              documentName: 'Screenshot 2022-08-02 at 5.26.52 PM.png',
              documentTypeId: 1,
              documentTypeName: 'PAN',
              documentContentMetadata:
                'https://vbcdev.blob.core.windows.net/0aa08102-6405-4ff9-98a0-d82adab4fff2/Screenshot%202022-08-02%20at%205.26.52%20PM.png',
              uploadDate: '2022-08-24T06:37:23.486183',
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-document/document/get-data',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Document Type List found.',
          data: {
            RECEIPT: ['Drug Receipt'],
            FINANCIAL: [
              'PAN',
              'Appointment letter from employer',
              '6 months bank account statement',
              'Salary Statement 1',
              'Salary Statement 2',
              'Salary Statement 3',
              'IT Return 1',
              'IT Return 2',
              'IT Return 3',
              'Financial Statement 1',
              'Financial Statement 2',
              'Financial Statement 3',
            ],
            MEDICAL: ['Prescription', 'Other'],
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-document/document/get/1801',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/enroll-for-vbc/step-one',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            allowCancel: true,
            step: 1,
            currentFixedDepositBank: null,
            paymentTypeOpted: 'SELF_PAY',
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
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/enroll-for-vbc/step-two',
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
            paymentTypeOpted: 'SELF_PAY',
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
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/enroll-for-vbc/step-three',
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
            paymentTypeOpted: 'SELF_PAY',
            totalPayableAmount: '1820040.00',
            accountNumber: 'adad',
            bankName: 'dadad',
            bankBranch: 'dadad',
            bankIfscCode: 'dadad',
            panNumber: 'BYRTH2727K',
            educationLevel: 'High School',
            occupation: 'Private Service',
            employerName: 'Tata Consultancy Services Limited',
            industry: 'Energy',
            designation: 'dsd',
            selfAnnualIncome: '223399',
            otherIncomeSource: '1292392',
            insurance: false,
            insuranceCompany: null,
            maturityAmount: '43434',
            familyAnnualIncome: '42432',
            applicants: null,
            drugId: 1,
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/enroll-for-vbc/step-four',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            allowCancel: true,
            step: 4,
            currentFixedDepositBank: null,
            paymentTypeOpted: 'SELF_PAY',
            totalPayableAmount: '1820040.00',
            accountNumber: 'adad',
            bankName: 'dadad',
            bankBranch: 'dadad',
            bankIfscCode: 'dadad',
            panNumber: 'BYRTH2727K',
            educationLevel: 'High School',
            occupation: 'Private Service',
            employerName: 'Tata Consultancy Services Limited',
            industry: 'Energy',
            designation: 'dsd',
            selfAnnualIncome: '223399',
            otherIncomeSource: '1292392',
            insurance: false,
            insuranceCompany: null,
            maturityAmount: '43434',
            familyAnnualIncome: '42432',
            applicants: null,
            drugId: 1,
          },
        })
      );
    }
  ),

  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/drug-schedule',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Drug schedule found.',
          data: {
            cumulativeAmount: '23456.00',
            payRebateToLender: false,
            payGrantToLender: false,
            content: [
              {
                id: 4104,
                drugId: 1,
                cycleNo: 1,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-04-13T00:00:00',
                drugReceiptId: 3167,
                drugReceiptUploadDate: '2023-04-13T07:00:50.532956',
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-04-13',
                receiptAmount: 23456.0,
                cumulativeAmount: 23456.0,
                costIncurredByPatient: 23456.0,
              },
              {
                id: 4105,
                drugId: 1,
                cycleNo: 2,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-05-09T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-05-11',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4106,
                drugId: 1,
                cycleNo: 3,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-06-06T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-06-08',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4107,
                drugId: 1,
                cycleNo: 4,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-07-04T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-07-06',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4108,
                drugId: 1,
                cycleNo: 5,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-08-01T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-08-03',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4109,
                drugId: 1,
                cycleNo: 6,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-08-29T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-08-31',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4110,
                drugId: 1,
                cycleNo: 7,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-09-26T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-09-28',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4111,
                drugId: 1,
                cycleNo: 8,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-10-24T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-10-26',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4112,
                drugId: 1,
                cycleNo: 9,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-11-21T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-11-23',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4113,
                drugId: 1,
                cycleNo: 10,
                mangoGrantAmount: null,
                mangoGrantDate: '2023-12-19T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2023-12-21',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4114,
                drugId: 1,
                cycleNo: 11,
                mangoGrantAmount: null,
                mangoGrantDate: '2024-01-16T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2024-01-18',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
              {
                id: 4115,
                drugId: 1,
                cycleNo: 12,
                mangoGrantAmount: null,
                mangoGrantDate: '2024-02-13T00:00:00',
                drugReceiptId: null,
                drugReceiptUploadDate: null,
                mangoGrantReceivedFlag: false,
                mangoGrantPaidFlag: false,
                treatmentDate: '2024-02-15',
                receiptAmount: null,
                cumulativeAmount: null,
                costIncurredByPatient: null,
              },
            ],
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/schedule/1',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Schedule Found.',
          data: [
            {
              id: 1,
              drugId: 1,
              cycleNo: 1,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 90.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 2,
              drugId: 1,
              cycleNo: 2,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 75.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 3,
              drugId: 1,
              cycleNo: 3,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 60.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 4,
              drugId: 1,
              cycleNo: 4,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 56.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 5,
              drugId: 1,
              cycleNo: 5,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 48.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 6,
              drugId: 1,
              cycleNo: 6,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 42.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 7,
              drugId: 1,
              cycleNo: 7,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 32.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 8,
              drugId: 1,
              cycleNo: 8,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 23.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 9,
              drugId: 1,
              cycleNo: 9,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 15.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 10,
              drugId: 1,
              cycleNo: 10,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 10.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 11,
              drugId: 1,
              cycleNo: 11,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 5.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
            {
              id: 12,
              drugId: 1,
              cycleNo: 12,
              marketPrice: 151670.0,
              payout: null,
              percentageOfRebate: 0.0,
              cumulativeAmount: null,
              mangoGrantAmount: 18200.0,
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/applicants',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          notEnrolled: false,
          paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
          content: [
            {
              id: 1137,
              firstName: 'Applicant ',
              middleName: 'Testing',
              lastName: 'Cases',
              fullName: 'Applicant  Testing Cases',
              mobile: '9039928810',
              age: 33,
              birthDate: null,
              email: 'applicant-test-cases@mailinator.com',
              gender: 'MALE',
              userId: 1813,
              mangoAccountId: '6a57d75e-c298-476d-a924-4656cf8fbfef',
              relationToPatient: 'Sibling',
              patientName: 'test patient adad',
              status: 'Registration pending',
              documentStatus: 'Documents pending',
            },
            {
              id: 1138,
              firstName: 'Fname',
              middleName: 'mname',
              lastName: 'lname',
              fullName: 'Fname mname lname',
              mobile: '3993992999',
              age: 22,
              birthDate: null,
              email: 'anddmm@gmail.com',
              gender: 'MALE',
              userId: 1814,
              mangoAccountId: '744b5946-dd75-4a8e-ad74-07f23ae5920f',
              relationToPatient: 'Self',
              patientName: 'test patient adad',
              status: 'Registration pending',
              documentStatus: 'Documents pending',
            },
          ],
          enrollmentStatus: 'Loan application yet to be submitted',
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/applicant/add',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Applicant created.',
          data: {
            updatedBy: 'patient-0101@mailinator.com',
            id: 1138,
            firstName: 'Fname',
            middleName: 'mname',
            lastName: 'lname',
            fullName: 'Fname mname lname',
            mobile: '3993992999',
            mobileVerified: false,
            mobileOtp: null,
            birthDate: null,
            age: 22,
            email: 'anddmm@gmail.com',
            emailVerified: false,
            emailOtp: null,
            gender: 'MALE',
            relationToPatient: 'Self',
            userId: 1814,
            mangoAccountId: '744b5946-dd75-4a8e-ad74-07f23ae5920f',
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
            username: '3993992999',
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/user/contact-support',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/lab',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2021: {
              total: 2,
              months: {
                January: {
                  total: 2,
                  categories: {
                    Immunoassay: 1,
                    'Molecular diagnostics': 1,
                  },
                },
              },
            },
            2020: {
              total: 55,
              months: {
                March: {
                  total: 1,
                  categories: {
                    Immunoassay: 1,
                  },
                },
                April: {
                  total: 7,
                  categories: {
                    Histopathology: 1,
                    Microbiology: 1,
                    Hematology: 2,
                    Biochemistry: 3,
                  },
                },
                May: {
                  total: 7,
                  categories: {
                    Hematology: 3,
                    Biochemistry: 4,
                  },
                },
                June: {
                  total: 3,
                  categories: {
                    Hematology: 1,
                    Biochemistry: 2,
                  },
                },
                July: {
                  total: 13,
                  categories: {
                    Immunoassay: 1,
                    Histopathology: 2,
                    Microbiology: 2,
                    Hematology: 4,
                    Biochemistry: 4,
                  },
                },
                August: {
                  total: 12,
                  categories: {
                    Immunohistochemistry: 1,
                    'Molecular diagnostics': 1,
                    Microbiology: 1,
                    Hematology: 3,
                    'Molecular Diagnostics': 1,
                    Biochemistry: 3,
                    'Clinical pathology': 2,
                  },
                },
                September: {
                  total: 4,
                  categories: {
                    Hematology: 2,
                    Biochemistry: 2,
                  },
                },
                October: {
                  total: 2,
                  categories: {
                    Hematology: 1,
                    Biochemistry: 1,
                  },
                },
                November: {
                  total: 3,
                  categories: {
                    Hematology: 2,
                    Biochemistry: 1,
                  },
                },
                December: {
                  total: 3,
                  categories: {
                    Immunoassay: 1,
                    Microbiology: 2,
                  },
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              testName: 'SERUM CEA.[CHEMI LUMI]-C/140',
              testStatus: 'Approved',
              testCollectionDate: '2021-01-16',
              testResultsDate: '2021-01-16T10:47:52.873+00:00',
              mangoTestCategory: 'Immunoassay',
              labOrderId: '6637991',
              testParameters: [
                {
                  index: 1,
                  testParameter: 'SERUM CEA.[CHEMI LUMI]',
                  numericResultYN: 'Y',
                  numericResult: '5',
                  numericResultUnits: 'ng/mL',
                  categoricalResultYN: 'NULL',
                  categoricalResult: 'NULL',
                  unstructuredResultYN: 'N',
                  unstructuredResult: 'NULL',
                },
              ],
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),

  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/api/master-data',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            banks: [
              {
                id: 1,
                name: 'State Bank of India',
              },
              {
                id: 2,
                name: 'Bank of Baroda',
              },
              {
                id: 3,
                name: 'Punjab National Bank',
              },
              {
                id: 4,
                name: 'HDFC Bank',
              },
              {
                id: 5,
                name: 'ICICI Bank',
              },
              {
                id: 6,
                name: 'Axis Bank',
              },
              {
                id: 7,
                name: 'Kotak Bank',
              },
              {
                id: 8,
                name: 'Citi Bank',
              },
              {
                id: 9,
                name: 'IndusInd Bank',
              },
              {
                id: 10,
                name: 'RBL Bank',
              },
            ],
            cancerTypes: [
              {
                id: 1,
                name: 'Non-small Cell Lung Cancer',
              },
              {
                id: 2,
                name: 'Breast Cancer',
              },
              {
                id: 3,
                name: 'Head & Neck Cancer',
              },
            ],
            companyTypes: [
              {
                id: 1,
                name: 'LLP',
              },
              {
                id: 2,
                name: 'Partnership',
              },
              {
                id: 3,
                name: 'Pvt Ltd',
              },
              {
                id: 4,
                name: 'Public Ltd',
              },
              {
                id: 5,
                name: 'Proprietorship',
              },
            ],
            countries: [
              {
                id: 1,
                name: 'India',
              },
            ],
            employers: [
              {
                id: 1001,
                name: 'Reliance Industries Limited',
              },
              {
                id: 1002,
                name: 'Tata Consultancy Services Limited',
              },
              {
                id: 1003,
                name: 'Hindustan Unilever Limited',
              },
              {
                id: 1004,
                name: 'HDFC Bank Limited',
              },
              {
                id: 1005,
                name: 'Housing Development Finance Corporation Limited',
              },
            ],
            experiences: null,
            grossAnnualIncomes: null,
            industryTypes: [
              {
                id: 1,
                name: 'Agriculture & Forestry',
              },
              {
                id: 2,
                name: 'Automotive',
              },
            ],
            insuranceCompanies: [
              {
                id: 1,
                name: 'Aditya Birla Health Insurance Co Ltd',
              },
              {
                id: 2,
                name: 'Care Health Insurance Ltd',
              },
            ],
            languages: null,
            natureOfBusinesses: [
              {
                id: 1,
                name: 'Manufacturing',
              },
              {
                id: 2,
                name: 'Trader',
              },
              {
                id: 3,
                name: 'Retailer',
              },
              {
                id: 4,
                name: 'Services',
              },
            ],
            occupations: [
              {
                id: 1,
                name: 'Salaried - Public',
              },
              {
                id: 2,
                name: 'Salaried - Private',
              },
              {
                id: 3,
                name: 'Self Employed',
              },
              {
                id: 4,
                name: 'Business Owner',
              },
            ],
            professions: [
              {
                id: 1,
                name: 'Unemployed',
              },
              {
                id: 2,
                name: 'Private Service',
              },
              {
                id: 3,
                name: 'Government Service',
              },
              {
                id: 4,
                name: 'Self-employed',
              },
              {
                id: 5,
                name: 'Retired',
              },
            ],
            residenceTypes: [
              {
                id: 1,
                name: 'Self-owned',
              },
              {
                id: 2,
                name: 'Rented',
              },
            ],
            states: [
              {
                id: 1,
                name: 'Andaman and Nicobar Islands',
              },
              {
                id: 2,
                name: 'Andhra Pradesh',
              },
              {
                id: 3,
                name: 'Arunachal Pradesh',
              },
              {
                id: 4,
                name: 'Assam',
              },
              {
                id: 5,
                name: 'Bihar',
              },
              {
                id: 6,
                name: 'Chandigarh',
              },
              {
                id: 7,
                name: 'Chhattisgarh',
              },
              {
                id: 8,
                name: 'Dadra and Nagar Haveli and Daman and Diu',
              },
              {
                id: 9,
                name: 'Delhi',
              },
              {
                id: 10,
                name: 'Goa',
              },
              {
                id: 11,
                name: 'Gujarat',
              },
              {
                id: 12,
                name: 'Haryana',
              },
              {
                id: 13,
                name: 'Himachal Pradesh',
              },
              {
                id: 14,
                name: 'Jammu and Kashmir',
              },
              {
                id: 15,
                name: 'Jharkhand',
              },
              {
                id: 16,
                name: 'Karnataka',
              },
              {
                id: 17,
                name: 'Kerala',
              },
              {
                id: 18,
                name: 'Ladakh',
              },
              {
                id: 19,
                name: 'Lakshadweep',
              },
              {
                id: 20,
                name: 'Madhya Pradesh',
              },
              {
                id: 21,
                name: 'Maharashtra',
              },
              {
                id: 22,
                name: 'Manipur',
              },
              {
                id: 23,
                name: 'Meghalaya',
              },
              {
                id: 24,
                name: 'Mizoram',
              },
              {
                id: 25,
                name: 'Nagaland',
              },
              {
                id: 26,
                name: 'Odisha',
              },
              {
                id: 27,
                name: 'Puducherry',
              },
              {
                id: 28,
                name: 'Punjab',
              },
              {
                id: 29,
                name: 'Rajasthan',
              },
              {
                id: 30,
                name: 'Sikkim',
              },
              {
                id: 31,
                name: 'Tamil Nadu',
              },
              {
                id: 32,
                name: 'Telangana',
              },
              {
                id: 33,
                name: 'Tripura',
              },
              {
                id: 34,
                name: 'Uttar Pradesh',
              },
              {
                id: 35,
                name: 'Uttarakhand',
              },
              {
                id: 36,
                name: 'West Bengal',
              },
            ],
            yearsInBusinesses: null,
            incomeRangeList: null,
            educationLevelList: [
              {
                id: 1,
                name: 'Primary/Secondary School',
              },
              {
                id: 2,
                name: 'High School',
              },
              {
                id: 3,
                name: 'Undergraduate',
              },
              {
                id: 4,
                name: 'Post-graduate',
              },
              {
                id: 5,
                name: 'Doctorate',
              },
              {
                id: 6,
                name: 'Diploma',
              },
            ],
            relationships: [
              {
                id: 1,
                name: 'Self',
              },
              {
                id: 2,
                name: 'Sibling',
              },
              {
                id: 3,
                name: 'Parent/Grand-parent',
              },
              {
                id: 4,
                name: 'Child/Grand-child',
              },
              {
                id: 5,
                name: 'Friend',
              },
            ],
            doctorChangeReasons: [
              {
                id: 1,
                name: 'Treating Doctor has Left the Institution',
              },
              {
                id: 2,
                name: 'Treating Doctor is Temporarily Unavailable',
              },
              {
                id: 3,
                name: 'Patient Request',
              },
            ],
            clinicalDropReasons: [
              {
                id: 1,
                name: 'Disease Progression',
              },
              {
                id: 2,
                name: 'Serious Adverse Event',
              },
              {
                id: 3,
                name: 'Intolerance to Therapy',
              },
              {
                id: 4,
                name: 'Patient Demise',
              },
              {
                id: 5,
                name: 'Different Drug Recommended',
              },
            ],
            nonClinicalDropReasons: [
              {
                id: 6,
                name: 'Financial Reason(s)',
              },
              {
                id: 7,
                name: 'Personal Reason(s)',
              },
              {
                id: 8,
                name: 'Patient Demise',
              },
              {
                id: 9,
                name: 'Patient Lost to Follow-up',
              },
            ],
            patientStatuses: [
              {
                id: 1,
                name: 'Identified',
              },
              {
                id: 2,
                name: 'Aware',
              },
              {
                id: 3,
                name: 'Engaged',
              },
              {
                id: 4,
                name: 'Applied',
              },
              {
                id: 5,
                name: 'Approved',
              },
              {
                id: 6,
                name: 'Rejected',
              },
              {
                id: 7,
                name: 'Enrolled',
              },
              {
                id: 8,
                name: 'Completed',
              },
              {
                id: 9,
                name: 'Clinical Drop Out',
              },
              {
                id: 10,
                name: 'Non-Clinical drop out',
              },
              {
                id: 11,
                name: 'Application Started',
              },
            ],
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/mango-executive/patients',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            content: [
              {
                id: 1441,
                fullName: 'Again After Delete',
                mrn: '23432v43243',
                hospitalGroupName: 'Apollo',
                hospitalUnitName: 'Apollo Chennai',
                doctorName: 'D67   Singhal',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Engaged',
                mobileNumber: null,
                email: 'pat.4500@mailinator.com',
                uniqueId: 'M0395',
              },
              {
                id: 1440,
                fullName: 'After Delete Patient',
                mrn: 'cwqewqe42343243',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Sunny mathew',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Engaged',
                mobileNumber: null,
                email: 'adp@mailinator.com',
                uniqueId: 'M0394',
              },
              {
                id: 1439,
                fullName: 'Solomon Saha',
                mrn: '2324',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Rakesh Nayak',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Enrolled',
                mobileNumber: null,
                email: 'solomon@mailinator.com',
                uniqueId: 'M0393',
              },
              {
                id: 1438,
                fullName: 'Number Added New',
                mrn: 'cewqewqewae',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Vijay Agarwal N/A',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Engaged',
                mobileNumber: null,
                email: 'nad@mailinator.com',
                uniqueId: 'M0392',
              },
              {
                id: 1437,
                fullName: 'Demo Patient One',
                mrn: 'erweret',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'New Doc ada',
                drugName: '1 day brand-1 day generic',
                patientStatus: 'Engaged',
                mobileNumber: null,
                email: 'dpo@mailinator.com',
                uniqueId: 'M0391',
              },
              {
                id: 1436,
                fullName: 'New Patient Testing',
                mrn: 'MRNyy2yy2y',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Sunny mathew',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Application Started',
                mobileNumber: null,
                email: 'newpatienttesting007@mailinator.com',
                uniqueId: 'M0390',
              },
              {
                id: 1435,
                fullName: 'Pause Upload Email',
                mrn: 'asdsrw543546',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Sunny mathew',
                drugName: '1 day brand-1 day generic',
                patientStatus: 'Enrolled',
                mobileNumber: null,
                email: 'pue1@mailinator.com',
                uniqueId: 'M0389',
              },
              {
                id: 1434,
                fullName: 'New Design Check',
                mrn: 'sdcewqe324324',
                hospitalGroupName: 'Vydehi Medical',
                hospitalUnitName: 'Vydehi A',
                doctorName: 'Check Doctor',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Engaged',
                mobileNumber: null,
                email: 'ndc@mailinator.com',
                uniqueId: 'M0388',
              },
              {
                id: 1433,
                fullName: 'Justeen Thoma',
                mrn: '45111',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Ramesh Murthy',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Completed',
                mobileNumber: null,
                email: 'justeen@mailinator.com',
                uniqueId: 'M0387',
              },
              {
                id: 1432,
                fullName: 'Test Shsn',
                mrn: '992o29',
                hospitalGroupName: 'Aster DM Healthcare',
                hospitalUnitName: 'Aster CMI',
                doctorName: 'Sunny mathew',
                drugName: 'Tagrisso-Osimertinib',
                patientStatus: 'Engaged',
                mobileNumber: '3377008855',
                email: 'testnnn@mailinator.com',
                uniqueId: 'M0386',
              },
            ],
            totalPages: 38,
            totalElements: 378,
            currentPage: 0,
            numberOfElements: 10,
            first: true,
            last: false,
            empty: false,
            pageSize: 10,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/mango-executive/patient-detail/1441',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Found.',
          data: {
            id: 1441,
            generalInformation: {
              uniqueId: 'M0395',
              fullName: 'Again After Delete',
              hospitalGroupName: 'Apollo',
              hospitalUnitName: 'Apollo Chennai',
              diagnosis: 'Non-small Cell Lung Cancer',
              drugName: 'Tagrisso-Osimertinib',
              doctorName: 'D67   Singhal',
              treatmentStartDate: null,
              aware: false,
              mrn: '23432v43243',
              dataConsentDate: null,
            },
            profileDTO: {
              firstName: 'Again',
              middleName: 'After',
              lastName: 'Delete',
              gender: 'MALE',
              birthDate: '1944-05-05',
              email: 'pat.4500@mailinator.com',
              mobile: '',
              permanentAddress: 'Asdsads',
              permanentCity: 'Anjar',
              permanentState: 'Gujarat',
              permanentCountry: 'India',
              permanentPinCode: '324354',
              presentAddress: 'Asdsads',
              presentCity: 'Anjar',
              presentState: 'Gujarat',
              presentCountry: 'India',
              presentPinCode: '324354',
            },
            bankDetailDTO: {
              accountNumber: null,
              bankBranch: null,
              bankIfscCode: null,
              bankName: null,
              cancelledChequeId: null,
              cancelledChequeName: null,
            },
            financeDetailDTO: {
              panNumber: null,
              educationLevel: null,
              occupation: null,
              employerName: null,
              industry: null,
              designation: null,
              selfAnnualIncome: null,
              otherIncomeSource: null,
              insurance: null,
              insuranceCompany: null,
              maturityAmount: null,
              familyAnnualIncome: null,
            },
            vbcProgram: {
              applicants: [],
              identifiedDate: null,
              awareDate: null,
              engagedDate: '2023-03-23',
              enrolledDate: null,
              completedDate: null,
              clinicalDropDate: null,
              nonClinicalDropDate: null,
              paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
              rebateInitiationDate: null,
              rebateAmount: null,
              rebateDate: null,
            },
            treatment: {
              completedCycles: 0,
              totalCycles: 0,
              nextAppointment: null,
              cumulativeAmount: '0.00',
              drugSchedule: [],
            },
            patientReportedOutcomes: [
              {
                treatment: 'Treatment Initiation',
                date: '2023-03-31',
                status: 'N/A',
              },
            ],
            patientUploadedDocuments: [],
            interactionText: null,
            presentHospitalId: 1002,
            presentDoctorId: 6016,
            currentLenderId: null,
            lenderHistory: [],
            treatmentStarted: false,
            treatmentPaused: false,
            treatmentTerminated: false,
            treatmentFinished: false,
            applicationSubmitted: false,
            applicationApproved: false,
            paySubventionTo: null,
            payRebateTo: null,
            treatmentBreakHistory: [],
            vbcSchedule: [
              {
                cycleNo: 1,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 90.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 2,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 75.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 3,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 60.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 4,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 56.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 5,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 48.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 6,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 42.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 7,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 32.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 8,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 23.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 9,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 15.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 10,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 10.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 11,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 5.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
              {
                cycleNo: 12,
                marketPrice: 151670.0,
                payout: null,
                percentageOfRebate: 0.0,
                cumulativeAmount: null,
                mangoGrantAmount: 2.0,
              },
            ],
            paymentFrequency: null,
            grantPaymentDay: null,
            grantPaymentWeek: null,
            grantPaymentDate: null,
            mangoAccountId: '00dc2431-6a54-4f1f-9f28-382d464e85e3',
            deviceTokenActive: false,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-doctor/doctor/all-doctors-by-hospital/1002',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: [
            {
              id: 5661,
              name: 'Duniya gol hai',
            },
            {
              id: 5663,
              name: 'rame adda dad',
            },
            {
              id: 5890,
              name: 'D4   Swamy',
            },
            {
              id: 5902,
              name: 'Kalathil',
            },
            {
              id: 5904,
              name: 'D11   Sugath',
            },
            {
              id: 5918,
              name: 'D18   Padmanabhan',
            },
            {
              id: 5932,
              name: 'D25   V',
            },
            {
              id: 5946,
              name: 'D32   Batra',
            },
            {
              id: 5960,
              name: 'D39   Gupta',
            },
            {
              id: 5974,
              name: 'D46   Patkar',
            },
            {
              id: 5988,
              name: 'D53   Joshi',
            },
            {
              id: 6002,
              name: 'D60   Shah',
            },
            {
              id: 6016,
              name: 'D67   Singhal',
            },
            {
              id: 6030,
              name: 'D74   Prasad',
            },
            {
              id: 6044,
              name: 'D81   Dwary',
            },
            {
              id: 6058,
              name: 'D88   Saipillai',
            },
            {
              id: 6072,
              name: 'D95   Ramanan V',
            },
            {
              id: 6086,
              name: "D102   D' Cruz",
            },
            {
              id: 6098,
              name: 'D108   Pawar',
            },
            {
              id: 6100,
              name: 'D109   Nyati',
            },
            {
              id: 6114,
              name: 'D116   R',
            },
            {
              id: 6128,
              name: 'D123   Karthikayan',
            },
            {
              id: 6142,
              name: 'D130   Srinivasaiah',
            },
            {
              id: 6156,
              name: 'D137   Verma',
            },
            {
              id: 6170,
              name: 'D144   Choksi',
            },
            {
              id: 6184,
              name: 'D151   Zaidi',
            },
            {
              id: 6198,
              name: 'D158   Gupta',
            },
            {
              id: 6212,
              name: 'D165   Hakeem',
            },
            {
              id: 6226,
              name: 'D172   Budharapu',
            },
            {
              id: 6240,
              name: 'D179   Banerjee',
            },
            {
              id: 6254,
              name: 'D186   K',
            },
            {
              id: 6268,
              name: 'D193   Duraisamy',
            },
            {
              id: 6282,
              name: 'D200   K',
            },
            {
              id: 6296,
              name: 'D207   Pai',
            },
            {
              id: 6310,
              name: 'D214   M',
            },
            {
              id: 6324,
              name: 'D221   Ragavan',
            },
            {
              id: 6338,
              name: 'D228   Visariya',
            },
            {
              id: 6352,
              name: 'D235   Burela',
            },
            {
              id: 6366,
              name: 'D242   L',
            },
            {
              id: 6380,
              name: 'D249   Das',
            },
            {
              id: 6394,
              name: 'D256   Jadhav',
            },
            {
              id: 6408,
              name: 'D263   Reddy',
            },
            {
              id: 6422,
              name: 'D270   Shah',
            },
            {
              id: 6436,
              name: 'D277   Saha',
            },
            {
              id: 6450,
              name: 'D284   De',
            },
            {
              id: 6464,
              name: 'D291',
            },
            {
              id: 6478,
              name: 'D298   M',
            },
            {
              id: 6492,
              name: 'D305   Mulani',
            },
            {
              id: 6506,
              name: 'Subash   Naik',
            },
            {
              id: 6564,
              name: 'DR1001   NaikS',
            },
            {
              id: 6566,
              name: 'DR0001   Naik',
            },
            {
              id: 6572,
              name: 'DR0004   Swamy',
            },
            {
              id: 6632,
              name: 'DR2001   Naik',
            },
            {
              id: 6638,
              name: 'DR2004   Swamy',
            },
            {
              id: 6652,
              name: 'rtet   Naik',
            },
            {
              id: 6658,
              name: 'ertyt   Swamy',
            },
            {
              id: 6751,
              name: 'rtet   Naik',
            },
            {
              id: 6757,
              name: 'DSFGFDG   Swamy',
            },
            {
              id: 6781,
              name: 'No email 1   Naik',
            },
            {
              id: 6787,
              name: 'No email 4   Swamy',
            },
            {
              id: 6866,
              name: 'Yes email 22   Naik',
            },
            {
              id: 6869,
              name: 'Yes email 25   Swamy',
            },
            {
              id: 6875,
              name: 'Yes email 31  Warrier',
            },
            {
              id: 6878,
              name: 'Yess email 22   Naik',
            },
            {
              id: 6881,
              name: 'Yess email 25   Swamy',
            },
            {
              id: 6883,
              name: 'Yess email 27',
            },
            {
              id: 6896,
              name: 'Nos email 22   Naik',
            },
            {
              id: 6901,
              name: 'Nos email 27',
            },
            {
              id: 7120,
              name: 'DR9901  Naik',
            },
            {
              id: 7123,
              name: 'DR9904  Swamy',
            },
            {
              id: 7136,
              name: 'DR9901  Naik',
            },
            {
              id: 7139,
              name: 'DR9904  Swamy',
            },
            {
              id: 7195,
              name: 'rsh001  Naik',
            },
            {
              id: 7204,
              name: 'rsh010  Kalathil',
            },
            {
              id: 7206,
              name: 'rsh011  Sugath',
            },
            {
              id: 7209,
              name: 'rsh014  Komaranchath',
            },
            {
              id: 7214,
              name: 'rsh018  Padmanabhan',
            },
            {
              id: 7217,
              name: 'rsh021  Das',
            },
            {
              id: 7224,
              name: 'rsh028  Jadhav',
            },
            {
              id: 7253,
              name: 'rsh00018  Padmanabhan',
            },
            {
              id: 7256,
              name: 'rsh00021  Das',
            },
            {
              id: 7263,
              name: 'rsh00028  Jadhav',
            },
            {
              id: 13693,
              name: 'Monday',
            },
          ],
        })
      );
    }
  ),

  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/drugs',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: [
            {
              id: 1,
              drugGenericName: 'Osimertinib',
              brandName: 'Tagrisso',
              visible: true,
              drugName: 'Tagrisso-Osimertinib',
            },
            {
              id: 1001,
              drugGenericName: 'dfdsfd',
              brandName: 'sdadasfdsf',
              visible: false,
              drugName: 'sdadasfdsf-dfdsfd',
            },
            {
              id: 1002,
              drugGenericName: 'sadsffdsgf',
              brandName: 'asdsafsf dsf',
              visible: false,
              drugName: 'asdsafsf dsf-sadsffdsgf',
            },
            {
              id: 1003,
              drugGenericName: 'Amsidine, m-AMSA',
              brandName: 'Amsacrine',
              visible: false,
              drugName: 'Amsacrine-Amsidine, m-AMSA',
            },
            {
              id: 1004,
              drugGenericName: 'MED',
              brandName: 'Test medication',
              visible: false,
              drugName: 'Test medication-MED',
            },
            {
              id: 1005,
              drugGenericName: 'BUG RESOLVED',
              brandName: 'BUG',
              visible: false,
              drugName: 'BUG-BUG RESOLVED',
            },
            {
              id: 1007,
              drugGenericName: 'Gen',
              brandName: 'Test',
              visible: true,
              drugName: 'Test-Gen',
            },
            {
              id: 1006,
              drugGenericName: 'dfgdgfdgfdghgf',
              brandName: 'New drug',
              visible: true,
              drugName: 'New drug-dfgdgfdgfdghgf',
            },
            {
              id: 1000,
              drugGenericName: '1 day generic',
              brandName: '1 day brand',
              visible: true,
              drugName: '1 day brand-1 day generic',
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/hospitals',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: [
            {
              id: 1,
              hospitalName: 'Aster CMI',
              hospitalGroupName: 'Aster DM Healthcare',
            },
            {
              id: 1008,
              hospitalName: 'Yashoda',
              hospitalGroupName: '45435',
            },
            {
              id: 1004,
              hospitalName: 'MAX',
              hospitalGroupName: 'MAX Healthcare',
            },
            {
              id: 1014,
              hospitalName: 'Vydehi A',
              hospitalGroupName: 'Vydehi Medical',
            },
            {
              id: 1003,
              hospitalName: 'Max delhi',
              hospitalGroupName: 'aad',
            },
            {
              id: 1017,
              hospitalName: 'Jeevab Lal Mohan',
              hospitalGroupName: 'Ookkss Ikksk',
            },
            {
              id: 1006,
              hospitalName: 'Apollo hyd',
              hospitalGroupName: 'Apollo',
            },
            {
              id: 1002,
              hospitalName: 'Apollo Chennai',
              hospitalGroupName: 'Apollo',
            },
            {
              id: 1007,
              hospitalName: 'Care-Banjara hills',
              hospitalGroupName: 'Care',
            },
            {
              id: 3,
              hospitalName: 'Aster Medcity',
              hospitalGroupName: 'Aster DM Healthcare',
            },
            {
              id: 1009,
              hospitalName: 'TTT',
              hospitalGroupName: 'DER',
            },
            {
              id: 1011,
              hospitalName: 'Manipal W',
              hospitalGroupName: 'Manipal',
            },
            {
              id: 1010,
              hospitalName: 'TPONE',
              hospitalGroupName: 'FFR',
            },
            {
              id: 1012,
              hospitalName: 'Fortis B',
              hospitalGroupName: 'Fortis Healthcare',
            },
            {
              id: 1013,
              hospitalName: 'Fortis C',
              hospitalGroupName: 'Fortis Healthcare',
            },
            {
              id: 1015,
              hospitalName: 'Vydehi W',
              hospitalGroupName: 'Vydehi Medical',
            },
            {
              id: 1018,
              hospitalName: 'Hname',
              hospitalGroupName: 'Ghname',
            },
            {
              id: 1016,
              hospitalName: 'Tnanme',
              hospitalGroupName: 'Adfsfgfhgf',
            },
            {
              id: 1001,
              hospitalName: 'Sdsfds',
              hospitalGroupName: 'Erteryt',
            },
            {
              id: 1000,
              hospitalName: 'Sdgfd',
              hospitalGroupName: 'Asas',
            },
            {
              id: 2,
              hospitalName: 'Aster Mims',
              hospitalGroupName: 'Aster Dm Healthcare',
            },
            {
              id: 1019,
              hospitalName: 'New Hospt Testing',
              hospitalGroupName: 'Sddd',
            },
            {
              id: 1020,
              hospitalName: 'Test',
              hospitalGroupName: 'Jjjk',
            },
            {
              id: 1021,
              hospitalName: 'New Hosp',
              hospitalGroupName: '323',
            },
            {
              id: 1022,
              hospitalName: 'Test 002',
              hospitalGroupName: '3233',
            },
            {
              id: 1023,
              hospitalName: 'Test 003',
              hospitalGroupName: '32323',
            },
            {
              id: 1027,
              hospitalName: 'Banyan Tree',
              hospitalGroupName: 'Wsdd',
            },
            {
              id: 1024,
              hospitalName: 'Rainbow Marthalli Blr',
              hospitalGroupName: 'Rainbo',
            },
            {
              id: 1025,
              hospitalName: 'Pbp Hospital',
              hospitalGroupName: 'Pbp Group',
            },
            {
              id: 1026,
              hospitalName: 'Tress 001',
              hospitalGroupName: 'Dsdsd',
            },
            {
              id: 1028,
              hospitalName: 'Lemon Tree',
              hospitalGroupName: 'Dsdsd',
            },
            {
              id: 1029,
              hospitalName: 'Kalpatru',
              hospitalGroupName: 'Asads',
            },
            {
              id: 1030,
              hospitalName: 'Sdsd',
              hospitalGroupName: '2323',
            },
            {
              id: 1031,
              hospitalName: 'Jeevan Sathi',
              hospitalGroupName: 'Jjj',
            },
            {
              id: 1032,
              hospitalName: 'Hospital',
              hospitalGroupName: 'Asdfs',
            },
            {
              id: 1033,
              hospitalName: 'Ddddd',
              hospitalGroupName: 'Dsffgfdg',
            },
            {
              id: 1034,
              hospitalName: 'Nnnnn',
              hospitalGroupName: 'Sadasd',
            },
            {
              id: 1035,
              hospitalName: 'New Hospital',
              hospitalGroupName: 'Wwwr',
            },
            {
              id: 1036,
              hospitalName: 'Ramban',
              hospitalGroupName: 'Uju',
            },
            {
              id: 1037,
              hospitalName: 'Krishna Murty Institute',
              hospitalGroupName: 'Kmi',
            },
            {
              id: 1038,
              hospitalName: 'Bug Hospital',
              hospitalGroupName: 'New Group',
            },
            {
              id: 1039,
              hospitalName: 'Check Hospital',
              hospitalGroupName: 'Sdfgdg',
            },
            {
              id: 1040,
              hospitalName: 'Admin Hospital',
              hospitalGroupName: 'Asdff',
            },
            {
              id: 1041,
              hospitalName: 'Gftytrutuy',
              hospitalGroupName: 'Ertretre',
            },
            {
              id: 1042,
              hospitalName: 'D',
              hospitalGroupName: 'Fgfdgfd',
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/hospital/get-groups',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: [
            'Fgfdgfd',
            '32323',
            'Jjj',
            'Ghname',
            'Asdff',
            'Wsdd',
            'FFR',
            'Erteryt',
            'Adfsfgfhgf',
            'Fortis Healthcare',
            'Apollo',
            'Ertretre',
            '323',
            'DER',
            'Vydehi Medical',
            'Dsffgfdg',
            'Jjjk',
            'Aster DM Healthcare',
            '45435',
            'Manipal',
            '2323',
            'MAX Healthcare',
            'Aster Dm Healthcare',
            'Ookkss Ikksk',
            'Pbp Group',
            'Asas',
            'Sdfgdg',
            '3233',
            'Care',
            'Wwwr',
            'Asdfs',
            'Rainbo',
            'Dsdsd',
            'Kmi',
            'Asads',
            'Sddd',
            'Sadasd',
            'aad',
            'New Group',
            'Uju',
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/applicant/loan-application/overview',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Found.',
          data: {
            coApplicants: [],
            applicationSubmitFlag: false,
            applicationSubmitDate: null,
            paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
            dateOfApplication: '2023-03-31T09:16:35.898744',
            loanApplicationStatus: 'Loan application yet to be submitted',
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/applicant/financial-data/details',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Applicant found.',
          data: {
            applicationSubmitFlag: false,
            applicationSubmitDate: null,
            bankName: null,
            bankBranch: null,
            bankAccountNumber: null,
            bankIfscCode: null,
            occupation: 'SELF_EMPLOYED',
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
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/lender/list',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            content: [
              {
                lenderId: 1018,
                lenderName: 'Fghgrtytryt',
                lenderCity: 'Ganderbal',
                lenderState: 'Jammu and Kashmir',
                lenderCountry: 'India',
                lenderAddress: 'Rtytytruy Tytryt',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 14,
                bankDetails: [
                  {
                    id: 24,
                    accountNumber: 'FGJHGYYUTR45657651',
                    bankBranch: 'Hjghkg3465465',
                    bankIfscCode: 'DFGDHG3464576',
                    bankName: 'Gfhghjhytuiu',
                    accountType: 'GRANT',
                  },
                  {
                    id: 23,
                    accountNumber: 'RETY4565761',
                    bankBranch: 'Retytdfgfh',
                    bankIfscCode: 'ERTYTU7876',
                    bankName: 'Hgjfggfdhggfhg',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1017,
                lenderName: 'Nlender',
                lenderCity: 'Bail-Hongal',
                lenderState: 'Karnataka',
                lenderCountry: 'India',
                lenderAddress: 'Naddrss',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 12,
                bankDetails: [
                  {
                    id: 21,
                    accountNumber: 'bnumber0012',
                    bankBranch: 'Bbranch',
                    bankIfscCode: 'BIFSC445764',
                    bankName: 'Bname',
                    accountType: 'GRANT',
                  },
                  {
                    id: 22,
                    accountNumber: 'btytrytryr',
                    bankBranch: 'Sdffd',
                    bankIfscCode: 'SDFGDF3546457',
                    bankName: 'Fghgfyrtytr',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1016,
                lenderName: 'Sjsi',
                lenderCity: 'Madhogarh',
                lenderState: 'Madhya Pradesh',
                lenderCountry: 'India',
                lenderAddress: 'Jje3ul Sdfdff',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: 'TUESDAY',
                grantPaymentWeek: 5,
                grantPaymentDate: null,
                bankDetails: [
                  {
                    id: 19,
                    accountNumber: '24434',
                    bankBranch: 'Dsdisisiooo',
                    bankIfscCode: 'SJSJSJ@@SSJSJ2344',
                    bankName: 'Uuu Jji Iisjsj 344',
                    accountType: 'REBATE',
                  },
                  {
                    id: 20,
                    accountNumber: '284848',
                    bankBranch: 'Sfdnsjdnjn Sfsf',
                    bankIfscCode: 'SJDJND WDSD',
                    bankName: 'Uujsdb Iiis Sdsd',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1015,
                lenderName: 'Ssj Wsjsk',
                lenderCity: 'Machalpur',
                lenderState: 'Madhya Pradesh',
                lenderCountry: 'India',
                lenderAddress: 'Sdsd3 Werer',
                paySubventionTo: 'PATIENT',
                payRebateTo: 'PATIENT',
                paymentFrequency: null,
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: null,
                bankDetails: [],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1014,
                lenderName: 'Sasad',
                lenderCity: 'Dhanbad',
                lenderState: 'Jharkhand',
                lenderCountry: 'India',
                lenderAddress: 'Sads',
                paySubventionTo: 'LENDER',
                payRebateTo: 'PATIENT',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 15,
                bankDetails: [
                  {
                    id: 18,
                    accountNumber: 'asdsfd',
                    bankBranch: 'Dffdsfds',
                    bankIfscCode: 'DSFDGFDG',
                    bankName: 'Fghfhfghfgh',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1013,
                lenderName: 'Test',
                lenderCity: 'Banavar',
                lenderState: 'Karnataka',
                lenderCountry: 'India',
                lenderAddress: 'wwqfd',
                paySubventionTo: 'PATIENT',
                payRebateTo: 'PATIENT',
                paymentFrequency: null,
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: null,
                bankDetails: [],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1012,
                lenderName: 'Twelve',
                lenderCity: 'Gandarbal',
                lenderState: 'Jammu and Kashmir',
                lenderCountry: 'India',
                lenderAddress: 'Sadsa',
                paySubventionTo: 'LENDER',
                payRebateTo: 'PATIENT',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 23,
                bankDetails: [
                  {
                    id: 17,
                    accountNumber: 'SADSRFR346546564',
                    bankBranch: 'Dfdg',
                    bankIfscCode: 'SDR3456',
                    bankName: '5467',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1010,
                lenderName: 'Date',
                lenderCity: 'Hamirpur',
                lenderState: 'Himachal Pradesh',
                lenderCountry: 'India',
                lenderAddress: 'dfgh',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'PER_CYCLE',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: null,
                bankDetails: [
                  {
                    id: 15,
                    accountNumber: 'datenumber',
                    bankBranch: 'datebrnach',
                    bankIfscCode: 'dateifcsc',
                    bankName: 'datebank',
                    accountType: 'GRANT',
                  },
                  {
                    id: 14,
                    accountNumber: 'wqeerwer',
                    bankBranch: 'tert',
                    bankIfscCode: 'rtretre',
                    bankName: 'eteer',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1009,
                lenderName: 'lender grant',
                lenderCity: 'Akasahebpet',
                lenderState: 'Andhra Pradesh',
                lenderCountry: 'India',
                lenderAddress: 'dre',
                paySubventionTo: 'LENDER',
                payRebateTo: 'PATIENT',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 13,
                bankDetails: [
                  {
                    id: 13,
                    accountNumber: 'sdgfhtyuytu',
                    bankBranch: 'ghfh',
                    bankIfscCode: 'gfjghj',
                    bankName: 'fvhgfhgfh',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1008,
                lenderName: 'Patient rebate',
                lenderCity: 'Ganderbal',
                lenderState: 'Jammu and Kashmir',
                lenderCountry: 'India',
                lenderAddress: 'sadsaf',
                paySubventionTo: 'PATIENT',
                payRebateTo: 'LENDER',
                paymentFrequency: null,
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: null,
                bankDetails: [
                  {
                    id: 12,
                    accountNumber: '345346546',
                    bankBranch: 'dfhjhgkjj',
                    bankIfscCode: 'rete',
                    bankName: 'sdfdfgfdhgh',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1007,
                lenderName: 'Patient',
                lenderCity: 'Bangalore Rural',
                lenderState: 'Karnataka',
                lenderCountry: 'India',
                lenderAddress: 'dsf',
                paySubventionTo: 'PATIENT',
                payRebateTo: 'PATIENT',
                paymentFrequency: null,
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: null,
                bankDetails: [],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1004,
                lenderName: 'Dsfsfg',
                lenderCity: 'Cherpulassery',
                lenderState: 'Kerala',
                lenderCountry: 'India',
                lenderAddress: 'Sdfd',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 18,
                bankDetails: [
                  {
                    id: 10,
                    accountNumber: 'dsfgdgh',
                    bankBranch: 'Dfgdsfds',
                    bankIfscCode: 'DSFSDGF',
                    bankName: 'Gfhfgh',
                    accountType: 'REBATE',
                  },
                  {
                    id: 9,
                    accountNumber: 'sdfdsf',
                    bankBranch: 'Fdgdh',
                    bankIfscCode: 'GHGFH',
                    bankName: 'Fdgf',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1003,
                lenderName: 'Rebatelender',
                lenderCity: 'Faridabad District',
                lenderState: 'Haryana',
                lenderCountry: 'India',
                lenderAddress: 'lender',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 18,
                bankDetails: [
                  {
                    id: 7,
                    accountNumber: 'rebate ac123',
                    bankBranch: 'rebate branch',
                    bankIfscCode: 'rebate ifsc code',
                    bankName: 'rebate bank',
                    accountType: 'REBATE',
                  },
                  {
                    id: 8,
                    accountNumber: '43565',
                    bankBranch: 'zxcvbcv',
                    bankIfscCode: 'xdsfddsdg',
                    bankName: 'dfsfgvfd',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1002,
                lenderName: 'asdsad',
                lenderCity: 'Gandarbal',
                lenderState: 'Jammu and Kashmir',
                lenderCountry: 'India',
                lenderAddress: 'dsadasd',
                paySubventionTo: 'LENDER',
                payRebateTo: 'PATIENT',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 13,
                bankDetails: [
                  {
                    id: 6,
                    accountNumber: 'dfdsfds',
                    bankBranch: 'dfdsfds',
                    bankIfscCode: 'dfdsfdsfsgfgf',
                    bankName: 'dsfdsfds',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1001,
                lenderName: 'Citi',
                lenderCity: 'Chalakara',
                lenderState: 'Kerala',
                lenderCountry: 'India',
                lenderAddress: 'dsfdgf',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 23,
                bankDetails: [
                  {
                    id: 5,
                    accountNumber: 'patcycle001',
                    bankBranch: 'patient cycle b',
                    bankIfscCode: 'pat cycle icode',
                    bankName: 'patient cycle',
                    accountType: 'GRANT',
                  },
                  {
                    id: 16,
                    accountNumber: 'CITI LENDER',
                    bankBranch: 'HYD',
                    bankIfscCode: 'CITIREBAT123',
                    bankName: 'CITI BANK',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1000,
                lenderName: 'HSBC',
                lenderCity: 'Dharuhera',
                lenderState: 'Haryana',
                lenderCountry: 'India',
                lenderAddress: 'CHECK',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: 23,
                bankDetails: [
                  {
                    id: 4,
                    accountNumber: 'HSBC20056',
                    bankBranch: 'HSBC BRANCH',
                    bankIfscCode: 'HSBCIFSC8009',
                    bankName: 'HSBC BANK',
                    accountType: 'GRANT',
                  },
                  {
                    id: 11,
                    accountNumber: 'Rebatehsbc',
                    bankBranch: 'rebabbank',
                    bankIfscCode: '32454rwet',
                    bankName: 'rebatehbank',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 2,
                lenderName: 'HDFC Bank',
                lenderCity: 'Bamboo Flat',
                lenderState: 'Andaman and Nicobar Islands',
                lenderCountry: 'India',
                lenderAddress: 'mg road',
                paySubventionTo: 'PATIENT',
                payRebateTo: 'PATIENT',
                paymentFrequency: null,
                grantPaymentDay: null,
                grantPaymentWeek: null,
                grantPaymentDate: null,
                bankDetails: [
                  {
                    id: 3,
                    accountNumber: 'rebatehdfc45',
                    bankBranch: 'ghjtyrtyt',
                    bankIfscCode: 'dsfewfrwtre',
                    bankName: 'rebggrnrhg',
                    accountType: 'REBATE',
                  },
                ],
                lenderDrugGrantSet: null,
              },
              {
                lenderId: 1,
                lenderName: 'Arogya Finance',
                lenderCity: 'Jogindarnagar',
                lenderState: 'Himachal Pradesh',
                lenderCountry: 'India',
                lenderAddress: 'ASDSFD',
                paySubventionTo: 'LENDER',
                payRebateTo: 'LENDER',
                paymentFrequency: 'MONTHLY',
                grantPaymentDay: 'TUESDAY',
                grantPaymentWeek: 5,
                grantPaymentDate: null,
                bankDetails: [
                  {
                    id: 2,
                    accountNumber: 'RAROGYABATE',
                    bankBranch: 'GFHJHG',
                    bankIfscCode: 'FGHFGJTR',
                    bankName: 'ASDFSGFG',
                    accountType: 'REBATE',
                  },
                  {
                    id: 1,
                    accountNumber: 'SAT90001',
                    bankBranch: 'SAT AROH',
                    bankIfscCode: 'ASDFSF445',
                    bankName: 'SATURDAY BANK',
                    accountType: 'GRANT',
                  },
                ],
                lenderDrugGrantSet: null,
              },
            ],
            totalPages: 1,
            totalElements: 18,
            currentPage: 0,
            numberOfElements: 18,
            first: true,
            last: true,
            empty: false,
            pageSize: 1000,
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-doctor/doctor/all-doctors-by-hospital/1002',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: [
            {
              id: 5661,
              name: 'Duniya gol hai',
            },
            {
              id: 5663,
              name: 'rame adda dad',
            },
            {
              id: 5890,
              name: 'D4   Swamy',
            },
            {
              id: 5902,
              name: 'Kalathil',
            },
            {
              id: 5904,
              name: 'D11   Sugath',
            },
            {
              id: 5918,
              name: 'D18   Padmanabhan',
            },
            {
              id: 5932,
              name: 'D25   V',
            },
            {
              id: 5946,
              name: 'D32   Batra',
            },
            {
              id: 5960,
              name: 'D39   Gupta',
            },
            {
              id: 5974,
              name: 'D46   Patkar',
            },
            {
              id: 5988,
              name: 'D53   Joshi',
            },
            {
              id: 6002,
              name: 'D60   Shah',
            },
            {
              id: 6016,
              name: 'D67   Singhal',
            },
            {
              id: 6030,
              name: 'D74   Prasad',
            },
            {
              id: 6044,
              name: 'D81   Dwary',
            },
            {
              id: 6058,
              name: 'D88   Saipillai',
            },
            {
              id: 6072,
              name: 'D95   Ramanan V',
            },
            {
              id: 6086,
              name: "D102   D' Cruz",
            },
            {
              id: 6098,
              name: 'D108   Pawar',
            },
            {
              id: 6100,
              name: 'D109   Nyati',
            },
            {
              id: 6114,
              name: 'D116   R',
            },
            {
              id: 6128,
              name: 'D123   Karthikayan',
            },
            {
              id: 6142,
              name: 'D130   Srinivasaiah',
            },
            {
              id: 6156,
              name: 'D137   Verma',
            },
            {
              id: 6170,
              name: 'D144   Choksi',
            },
            {
              id: 6184,
              name: 'D151   Zaidi',
            },
            {
              id: 6198,
              name: 'D158   Gupta',
            },
            {
              id: 6212,
              name: 'D165   Hakeem',
            },
            {
              id: 6226,
              name: 'D172   Budharapu',
            },
            {
              id: 6240,
              name: 'D179   Banerjee',
            },
            {
              id: 6254,
              name: 'D186   K',
            },
            {
              id: 6268,
              name: 'D193   Duraisamy',
            },
            {
              id: 6282,
              name: 'D200   K',
            },
            {
              id: 6296,
              name: 'D207   Pai',
            },
            {
              id: 6310,
              name: 'D214   M',
            },
            {
              id: 6324,
              name: 'D221   Ragavan',
            },
            {
              id: 6338,
              name: 'D228   Visariya',
            },
            {
              id: 6352,
              name: 'D235   Burela',
            },
            {
              id: 6366,
              name: 'D242   L',
            },
            {
              id: 6380,
              name: 'D249   Das',
            },
            {
              id: 6394,
              name: 'D256   Jadhav',
            },
            {
              id: 6408,
              name: 'D263   Reddy',
            },
            {
              id: 6422,
              name: 'D270   Shah',
            },
            {
              id: 6436,
              name: 'D277   Saha',
            },
            {
              id: 6450,
              name: 'D284   De',
            },
            {
              id: 6464,
              name: 'D291',
            },
            {
              id: 6478,
              name: 'D298   M',
            },
            {
              id: 6492,
              name: 'D305   Mulani',
            },
            {
              id: 6506,
              name: 'Subash   Naik',
            },
            {
              id: 6564,
              name: 'DR1001   NaikS',
            },
            {
              id: 6566,
              name: 'DR0001   Naik',
            },
            {
              id: 6572,
              name: 'DR0004   Swamy',
            },
            {
              id: 6632,
              name: 'DR2001   Naik',
            },
            {
              id: 6638,
              name: 'DR2004   Swamy',
            },
            {
              id: 6652,
              name: 'rtet   Naik',
            },
            {
              id: 6658,
              name: 'ertyt   Swamy',
            },
            {
              id: 6751,
              name: 'rtet   Naik',
            },
            {
              id: 6757,
              name: 'DSFGFDG   Swamy',
            },
            {
              id: 6781,
              name: 'No email 1   Naik',
            },
            {
              id: 6787,
              name: 'No email 4   Swamy',
            },
            {
              id: 6866,
              name: 'Yes email 22   Naik',
            },
            {
              id: 6869,
              name: 'Yes email 25   Swamy',
            },
            {
              id: 6875,
              name: 'Yes email 31  Warrier',
            },
            {
              id: 6878,
              name: 'Yess email 22   Naik',
            },
            {
              id: 6881,
              name: 'Yess email 25   Swamy',
            },
            {
              id: 6883,
              name: 'Yess email 27',
            },
            {
              id: 6896,
              name: 'Nos email 22   Naik',
            },
            {
              id: 6901,
              name: 'Nos email 27',
            },
            {
              id: 7120,
              name: 'DR9901  Naik',
            },
            {
              id: 7123,
              name: 'DR9904  Swamy',
            },
            {
              id: 7136,
              name: 'DR9901  Naik',
            },
            {
              id: 7139,
              name: 'DR9904  Swamy',
            },
            {
              id: 7195,
              name: 'rsh001  Naik',
            },
            {
              id: 7204,
              name: 'rsh010  Kalathil',
            },
            {
              id: 7206,
              name: 'rsh011  Sugath',
            },
            {
              id: 7209,
              name: 'rsh014  Komaranchath',
            },
            {
              id: 7214,
              name: 'rsh018  Padmanabhan',
            },
            {
              id: 7217,
              name: 'rsh021  Das',
            },
            {
              id: 7224,
              name: 'rsh028  Jadhav',
            },
            {
              id: 7253,
              name: 'rsh00018  Padmanabhan',
            },
            {
              id: 7256,
              name: 'rsh00021  Das',
            },
            {
              id: 7263,
              name: 'rsh00028  Jadhav',
            },
            {
              id: 13693,
              name: 'Monday',
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-admin/api/permissions',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: '',
          data: {
            user: {
              name: 'Mango Executive',
              gender: 'MALE',
              age: null,
              drugName: null,
              completedCycles: null,
              totalCycles: null,
            },
            flags: {
              profileUpdated: false,
              accepted: false,
              treatmentTerminated: null,
            },
            roles: {
              1042: {
                moduleName: 'admin',
                roleName: 'mango_executive',
                moduleId: 1004,
              },
            },
            roleDataMap: {
              1042: {
                defaultRoute: {
                  component: 'mango-patients',
                  url: '/admin/mango-executive/patients',
                },
                routes: {
                  'mango-executive-incomplete-patients': {
                    url: '/admin/mango-executive/incomplete-patients',
                  },
                  'privacy-policy': {
                    url: '/privacy-policy',
                  },
                  'secured-rebate-subvention': {
                    url: '/secured-forward',
                  },
                  'mango-executive-settings': {
                    url: '/admin/mango-executive/settings',
                  },
                  'patient-details': {
                    url: '/admin/patient-details',
                  },
                  'send-push-notification': {
                    url: '/admin/mango-executive/send-push-notification',
                  },
                  'admin-mango-executive': {
                    url: '/admin/mango-executive/profile',
                  },
                  'pending-approval-patients': {
                    url: '/admin/mango-executive/pending-approval-patients',
                  },
                  'terms-of-use': {
                    url: '/terms-of-use',
                  },
                  'mango-immunotherpy': {
                    url: '/admin/mango-executive/immonutherapy',
                  },
                  'mango-patients': {
                    url: '/admin/mango-executive/patients',
                  },
                },
                perms: {
                  'treatment-list': [
                    'can view details',
                    'can pause treatment',
                    'can resume treatment',
                    'can terminate treatment',
                    'can complete treatment',
                    'can view pauseRestartWarningNote',
                  ],
                  'patient-interaction-notes': [
                    'can view details',
                    'can view editDetails',
                  ],
                  'lender-assignment': [
                    'can view details',
                    'can assign lender',
                  ],
                  'treatment-initiation': [
                    'can change treatmentInitiation',
                    'can view details',
                  ],
                  'admin-pbp-schedule-list': ['can view details'],
                  'patient-general-information': [
                    'can view details',
                    'can view patientId',
                    'can view awareButton',
                    'can view patient mrn',
                    'can view patient mobile&email',
                    'can view addationalPatientInformation',
                  ],
                  'payout-details': ['can view details'],
                  'mango-exe-add-patient': ['can view details'],
                  'admin-medication-schedule-list': [
                    'can view details',
                    'can download drugReciept',
                    'can view editDetails',
                    'can add pricePaidByPatient',
                  ],
                  'send-push-notification': ['can view details'],
                  'patient-applicant-list': ['can view details'],
                  'patient-pbp-program': [
                    'can view details',
                    'can view rebate initiation date',
                  ],
                  'assign-doctor': ['can assign doctor'],
                },
              },
            },
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/applicant/loan-application/details',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Found.',
          data: {
            step: 0,
            totalAmountPayable: 1820016.0,
            currentFixedDepositBank: null,
            applicationSubmitFlag: false,
            applicationSubmitDate: null,
            paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
            financeDetails: {
              applicationSubmitFlag: false,
              applicationSubmitDate: null,
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
            },
            requiredDocuments: null,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/radiologies',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2020: {
              total: 2,
              months: {
                April: {
                  total: 1,
                  categories: {},
                },
                October: {
                  total: 1,
                  categories: {},
                },
                January: {
                  total: 0,
                  categories: {},
                },
                February: {
                  total: 0,
                  categories: {},
                },
                March: {
                  total: 0,
                  categories: {},
                },
                May: {
                  total: 0,
                  categories: {},
                },
                June: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
                December: {
                  total: 0,
                  categories: {},
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              radiologyProcedure: 'PET CT',
              orderDate: '2020-10-06',
              radiologyReportNote:
                'Impression: Metabolically active persistent left lung lesions, lung nodules with lymphnodal, bony, liver involvement \\T\\ other findings with interval change as described.     2. No other metabolically active disease elsewhere in the body.',
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/applicant/loan-application/step-one',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Found.',
          data: {
            step: 1,
            totalAmountPayable: 1820016.0,
            currentFixedDepositBank: null,
            applicationSubmitFlag: false,
            applicationSubmitDate: null,
            paymentTypeOpted: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
            financeDetails: {
              applicationSubmitFlag: false,
              applicationSubmitDate: null,
              bankName: null,
              bankBranch: null,
              bankAccountNumber: null,
              bankIfscCode: null,
              occupation: 'SELF_EMPLOYED',
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
            },
            requiredDocuments: {
              'IT Returns': {
                1: false,
                2: false,
                3: false,
              },
              PAN: {
                1: false,
              },
              '6 months bank account statement': {
                1: false,
              },
            },
          },
        })
      );
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/applicant/loan-application/step-two',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.post(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-document/document/upload-document-for-applicant',
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-document/document/required-documents/3',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: 'Required Documents List ',
          data: {
            'IT Returns': {
              1: false,
              2: false,
              3: false,
            },
            PAN: {
              1: false,
            },
            '6 months bank account statement': {
              1: false,
            },
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/cities/9',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          status: true,
          message: null,
          data: [
            {
              id: 5,
              name: 'Addanki',
            },
            {
              id: 6,
              name: 'Adoni',
            },
            {
              id: 7,
              name: 'Akasahebpet',
            },
            {
              id: 8,
              name: 'Akividu',
            },
            {
              id: 9,
              name: 'Akkarampalle',
            },
            {
              id: 10,
              name: 'Amalapuram',
            },
            {
              id: 11,
              name: 'Amudalavalasa',
            },
            {
              id: 12,
              name: 'Anakapalle',
            },
            {
              id: 13,
              name: 'Anantapur',
            },
            {
              id: 14,
              name: 'Atmakur',
            },
            {
              id: 15,
              name: 'Attili',
            },
            {
              id: 16,
              name: 'Avanigadda',
            },
            {
              id: 17,
              name: 'Badvel',
            },
            {
              id: 18,
              name: 'Banganapalle',
            },
            {
              id: 19,
              name: 'Bapatla',
            },
            {
              id: 20,
              name: 'Betamcherla',
            },
            {
              id: 21,
              name: 'Bhattiprolu',
            },
            {
              id: 22,
              name: 'Bhimavaram',
            },
            {
              id: 23,
              name: 'Bhimunipatnam',
            },
            {
              id: 24,
              name: 'Bobbili',
            },
            {
              id: 25,
              name: 'Challapalle',
            },
            {
              id: 26,
              name: 'Chemmumiahpet',
            },
            {
              id: 27,
              name: 'Chilakalurupet',
            },
            {
              id: 28,
              name: 'Chinnachowk',
            },
            {
              id: 29,
              name: 'Chipurupalle',
            },
            {
              id: 30,
              name: 'Chirala',
            },
            {
              id: 31,
              name: 'Chittoor',
            },
            {
              id: 32,
              name: 'Chodavaram',
            },
            {
              id: 33,
              name: 'Cuddapah',
            },
            {
              id: 34,
              name: 'Cumbum',
            },
            {
              id: 35,
              name: 'Darsi',
            },
            {
              id: 36,
              name: 'Dharmavaram',
            },
            {
              id: 37,
              name: 'Dhone',
            },
            {
              id: 38,
              name: 'Diguvametta',
            },
            {
              id: 39,
              name: 'East Godavari',
            },
            {
              id: 40,
              name: 'Elamanchili',
            },
            {
              id: 41,
              name: 'Ellore',
            },
            {
              id: 42,
              name: 'Emmiganur',
            },
            {
              id: 43,
              name: 'Erraguntla',
            },
            {
              id: 44,
              name: 'Etikoppaka',
            },
            {
              id: 45,
              name: 'Gajuwaka',
            },
            {
              id: 46,
              name: 'Ganguvada',
            },
            {
              id: 47,
              name: 'Gannavaram',
            },
            {
              id: 48,
              name: 'Giddalur',
            },
            {
              id: 49,
              name: 'Gokavaram',
            },
            {
              id: 50,
              name: 'Gorantla',
            },
            {
              id: 51,
              name: 'Govindapuram,Chilakaluripet,Guntur',
            },
            {
              id: 52,
              name: 'Gudivada',
            },
            {
              id: 53,
              name: 'Gudlavalleru',
            },
            {
              id: 54,
              name: 'Gudur',
            },
            {
              id: 55,
              name: 'Guntakal Junction',
            },
            {
              id: 56,
              name: 'Guntur',
            },
            {
              id: 57,
              name: 'Hindupur',
            },
            {
              id: 58,
              name: 'Ichchapuram',
            },
            {
              id: 59,
              name: 'Jaggayyapeta',
            },
            {
              id: 60,
              name: 'Jammalamadugu',
            },
            {
              id: 61,
              name: 'Kadiri',
            },
            {
              id: 62,
              name: 'Kaikalur',
            },
            {
              id: 63,
              name: 'Kakinada',
            },
            {
              id: 64,
              name: 'Kalyandurg',
            },
            {
              id: 65,
              name: 'Kamalapuram',
            },
            {
              id: 66,
              name: 'Kandukur',
            },
            {
              id: 67,
              name: 'Kanigiri',
            },
            {
              id: 68,
              name: 'Kankipadu',
            },
            {
              id: 69,
              name: 'Kanuru',
            },
            {
              id: 70,
              name: 'Kavali',
            },
            {
              id: 71,
              name: 'Kolanukonda',
            },
            {
              id: 72,
              name: 'Kondapalle',
            },
            {
              id: 73,
              name: 'Korukollu',
            },
            {
              id: 74,
              name: 'Kosigi',
            },
            {
              id: 75,
              name: 'Kovvur',
            },
            {
              id: 76,
              name: 'Krishna',
            },
            {
              id: 77,
              name: 'Kuppam',
            },
            {
              id: 78,
              name: 'Kurnool',
            },
            {
              id: 79,
              name: 'Macherla',
            },
            {
              id: 80,
              name: 'Machilipatnam',
            },
            {
              id: 81,
              name: 'Madanapalle',
            },
            {
              id: 82,
              name: 'Madugula',
            },
            {
              id: 83,
              name: 'Mandapeta',
            },
            {
              id: 84,
              name: 'Mandasa',
            },
            {
              id: 85,
              name: 'Mangalagiri',
            },
            {
              id: 86,
              name: 'Markapur',
            },
            {
              id: 87,
              name: 'Nagari',
            },
            {
              id: 88,
              name: 'Nagireddipalli',
            },
            {
              id: 89,
              name: 'Nandigama',
            },
            {
              id: 90,
              name: 'Nandikotkur',
            },
            {
              id: 91,
              name: 'Nandyal',
            },
            {
              id: 92,
              name: 'Narasannapeta',
            },
            {
              id: 93,
              name: 'Narasapur',
            },
            {
              id: 94,
              name: 'Narasaraopet',
            },
            {
              id: 95,
              name: 'Narasingapuram',
            },
            {
              id: 96,
              name: 'Narayanavanam',
            },
            {
              id: 97,
              name: 'Narsipatnam',
            },
            {
              id: 98,
              name: 'Nayudupet',
            },
            {
              id: 99,
              name: 'Nellore',
            },
            {
              id: 100,
              name: 'Nidadavole',
            },
            {
              id: 101,
              name: 'Nuzvid',
            },
            {
              id: 102,
              name: 'Ongole',
            },
            {
              id: 103,
              name: 'Pakala',
            },
            {
              id: 104,
              name: 'Palakollu',
            },
            {
              id: 105,
              name: 'Palasa',
            },
            {
              id: 106,
              name: 'Palkonda',
            },
            {
              id: 107,
              name: 'Pallevada',
            },
            {
              id: 108,
              name: 'Palmaner',
            },
            {
              id: 109,
              name: 'Parlakimidi',
            },
            {
              id: 110,
              name: 'Parvatipuram',
            },
            {
              id: 111,
              name: 'Pavuluru',
            },
            {
              id: 112,
              name: 'Pedana',
            },
            {
              id: 113,
              name: 'pedda nakkalapalem',
            },
            {
              id: 114,
              name: 'Peddapuram',
            },
            {
              id: 115,
              name: 'Penugonda',
            },
            {
              id: 116,
              name: 'Penukonda',
            },
            {
              id: 117,
              name: 'Phirangipuram',
            },
            {
              id: 118,
              name: 'Pippara',
            },
            {
              id: 119,
              name: 'Pithapuram',
            },
            {
              id: 120,
              name: 'Polavaram',
            },
            {
              id: 121,
              name: 'Ponnur',
            },
            {
              id: 122,
              name: 'Ponnuru',
            },
            {
              id: 123,
              name: 'Prakasam',
            },
            {
              id: 124,
              name: 'Proddatur',
            },
            {
              id: 125,
              name: 'Pulivendla',
            },
            {
              id: 126,
              name: 'Punganuru',
            },
            {
              id: 127,
              name: 'Puttaparthi',
            },
            {
              id: 128,
              name: 'Puttur',
            },
            {
              id: 129,
              name: 'Rajahmundry',
            },
            {
              id: 130,
              name: 'Ramachandrapuram',
            },
            {
              id: 131,
              name: 'Ramanayyapeta',
            },
            {
              id: 132,
              name: 'Ramapuram',
            },
            {
              id: 133,
              name: 'Rampachodavaram',
            },
            {
              id: 134,
              name: 'Rayachoti',
            },
            {
              id: 135,
              name: 'Rayadrug',
            },
            {
              id: 136,
              name: 'Razam',
            },
            {
              id: 137,
              name: 'Razampeta',
            },
            {
              id: 138,
              name: 'Razole',
            },
            {
              id: 139,
              name: 'Renigunta',
            },
            {
              id: 140,
              name: 'Repalle',
            },
            {
              id: 141,
              name: 'Salur',
            },
            {
              id: 142,
              name: 'Samalkot',
            },
            {
              id: 143,
              name: 'Sattenapalle',
            },
            {
              id: 144,
              name: 'Singarayakonda',
            },
            {
              id: 145,
              name: 'Sompeta',
            },
            {
              id: 146,
              name: 'Srikakulam',
            },
            {
              id: 147,
              name: 'Srisailain',
            },
            {
              id: 148,
              name: 'Suluru',
            },
            {
              id: 149,
              name: 'Tadepalle',
            },
            {
              id: 150,
              name: 'Tadepallegudem',
            },
            {
              id: 151,
              name: 'Tadpatri',
            },
            {
              id: 152,
              name: 'Tanuku',
            },
            {
              id: 153,
              name: 'Tekkali',
            },
            {
              id: 154,
              name: 'Tirumala',
            },
            {
              id: 155,
              name: 'Tirupati',
            },
            {
              id: 156,
              name: 'Tuni',
            },
            {
              id: 157,
              name: 'Uravakonda',
            },
            {
              id: 158,
              name: 'vadlamuru',
            },
            {
              id: 159,
              name: 'Vadlapudi',
            },
            {
              id: 160,
              name: 'Venkatagiri',
            },
            {
              id: 161,
              name: 'Vepagunta',
            },
            {
              id: 162,
              name: 'Vetapalem',
            },
            {
              id: 163,
              name: 'Vijayawada',
            },
            {
              id: 164,
              name: 'Vinukonda',
            },
            {
              id: 165,
              name: 'Visakhapatnam',
            },
            {
              id: 166,
              name: 'Vizianagaram',
            },
            {
              id: 167,
              name: 'Vizianagaram District',
            },
            {
              id: 168,
              name: 'Vuyyuru',
            },
            {
              id: 169,
              name: 'West Godavari',
            },
            {
              id: 170,
              name: 'Yanam',
            },
            {
              id: 171,
              name: 'Yanamalakuduru',
            },
            {
              id: 172,
              name: 'Yarada',
            },
          ],
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/other-tests',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2020: {
              total: 1,
              months: {
                April: {
                  total: 1,
                  categories: {},
                },
                January: {
                  total: 0,
                  categories: {},
                },
                February: {
                  total: 0,
                  categories: {},
                },
                March: {
                  total: 0,
                  categories: {},
                },
                May: {
                  total: 0,
                  categories: {},
                },
                June: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                October: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
                December: {
                  total: 0,
                  categories: {},
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              procedureDate: '2020-04-06',
              procedureNoteContent: null,
              vbcProcedureName: 'Pulmonary Function Test (PFT)',
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/surgery',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2019: {
              total: 1,
              months: {
                June: {
                  total: 1,
                  categories: {},
                },
                January: {
                  total: 0,
                  categories: {},
                },
                February: {
                  total: 0,
                  categories: {},
                },
                March: {
                  total: 0,
                  categories: {},
                },
                April: {
                  total: 0,
                  categories: {},
                },
                May: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                October: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
                December: {
                  total: 0,
                  categories: {},
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              procedureName:
                'Pulmonary Lobectomy + Mediastinal Lymph Node Dissection',
              surgeryDate: '2019-06-25',
              procedureNote: '',
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/medication',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2020: {
              total: 10,
              months: {
                January: {
                  total: 2,
                  categories: {
                    'Cancer medication': 1,
                    'Non Cancer medication': 1,
                  },
                },
                February: {
                  total: 2,
                  categories: {
                    'Cancer medication': 1,
                    'Non Cancer medication': 1,
                  },
                },
                March: {
                  total: 2,
                  categories: {
                    'Cancer medication': 1,
                    'Non Cancer medication': 1,
                  },
                },
                April: {
                  total: 2,
                  categories: {
                    'Cancer medication': 1,
                    'Non Cancer medication': 1,
                  },
                },
                May: {
                  total: 2,
                  categories: {
                    'Cancer medication': 1,
                    'Non Cancer medication': 1,
                  },
                },
                June: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                October: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
                December: {
                  total: 0,
                  categories: {},
                },
              },
            },
            2019: {
              total: 2,
              months: {
                December: {
                  total: 2,
                  categories: {
                    'Cancer medication': 1,
                    'Non Cancer medication': 1,
                  },
                },
                January: {
                  total: 0,
                  categories: {},
                },
                February: {
                  total: 0,
                  categories: {},
                },
                March: {
                  total: 0,
                  categories: {},
                },
                April: {
                  total: 0,
                  categories: {},
                },
                May: {
                  total: 0,
                  categories: {},
                },
                June: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                October: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              issueDate: '2020-05-19',
              genericName: 'Osimertinib',
              brandName: 'Tagrisso',
              strength: '80mg',
              cancerDrugYN: 'Y',
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/radiation-therapy',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2020: {
              total: 1,
              months: {
                January: {
                  total: 1,
                  categories: {},
                },
                February: {
                  total: 0,
                  categories: {},
                },
                March: {
                  total: 0,
                  categories: {},
                },
                April: {
                  total: 0,
                  categories: {},
                },
                May: {
                  total: 0,
                  categories: {},
                },
                June: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                October: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
                December: {
                  total: 0,
                  categories: {},
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              startDate: '2020-01-12',
              technique: 'IMRT',
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),
  rest.get(
    'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient-data/api/other-treatment',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          years: {
            2017: {
              total: 1,
              months: {
                June: {
                  total: 1,
                  categories: {},
                },
                January: {
                  total: 0,
                  categories: {},
                },
                February: {
                  total: 0,
                  categories: {},
                },
                March: {
                  total: 0,
                  categories: {},
                },
                April: {
                  total: 0,
                  categories: {},
                },
                May: {
                  total: 0,
                  categories: {},
                },
                July: {
                  total: 0,
                  categories: {},
                },
                August: {
                  total: 0,
                  categories: {},
                },
                September: {
                  total: 0,
                  categories: {},
                },
                October: {
                  total: 0,
                  categories: {},
                },
                November: {
                  total: 0,
                  categories: {},
                },
                December: {
                  total: 0,
                  categories: {},
                },
              },
            },
          },
          reports: [
            {
              index: 1,
              procedureDate: '2017-06-15',
              vbcProcedureName: 'ANGIOPLASTY AND STENTING',
              procedureNoteContent: null,
            },
          ],
          additionalData: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 0,
          },
        })
      );
    }
  ),
];
