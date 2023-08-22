import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';
import React from 'react';
import {applicantOverviewPage} from '../testAppSelector';
import ApplicantOverview from '../../pages/ApplicationOverview';
import {setupStore} from '../../redux/store';
import {Provider} from 'react-redux';

describe('Applicant Overview Page Testing', () => {
  test('Rendering Application Overview Page', async () => {
    const store = setupStore(applicantOverviewPage);
    render(
      <Provider store={store}>
        <ApplicantOverview />
      </Provider>
    );

    const applicationOverViewHeading = screen.getByRole('heading', {
      name: /applicationOverview/i,
    });
    expect(applicationOverViewHeading).toBeInTheDocument();
    const isFinancialAssistance = screen.getByText(
      'Loan With Financial Assistance'
    );
    expect(isFinancialAssistance).toBeInTheDocument();
  });
  test('Verifying Date of Application', async () => {
    const store = setupStore(applicantOverviewPage);
    render(
      <Provider store={store}>
        <ApplicantOverview />
      </Provider>
    );
    const dateOfApplication = screen.getByRole('heading', {
      name: /31\-03\-2023/i,
    });

    expect(dateOfApplication).toBeInTheDocument();
  });
});
