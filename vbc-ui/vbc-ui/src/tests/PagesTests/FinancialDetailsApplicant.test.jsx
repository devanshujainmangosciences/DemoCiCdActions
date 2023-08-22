import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '../test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import {server} from '../../__mocks__/server';
import {rest} from 'msw';
import FinancialInformation from '../../pages/ApplicantFinancialInformation';

describe('Financial Detail Page Applicant', () => {
  beforeEach(() => {
    renderWithProviders(<FinancialInformation />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Financial information page when complete profile is not completed', async () => {
    const text = screen.getByText(
      /You are not able to see any financial information since you havent completed loan application./i
    );
    expect(text).toBeInTheDocument();
  });
  test('On Clicking on Complete Applicantion Button', async () => {
    const button = screen.getByRole('button', {
      name: /complete application/i,
    });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
