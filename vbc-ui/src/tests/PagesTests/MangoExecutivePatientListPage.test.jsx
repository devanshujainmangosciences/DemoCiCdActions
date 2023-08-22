import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {server} from '../../__mocks__/server';
import {rest} from 'msw';
import MangoExecutive from '@/pages/MangoExecutive';
import {act} from 'react-dom/test-utils';
import {store} from '@/redux/store';

// import {useAppDispatch, useAppSelector} from '../../redux/redux-hooks';

// vi.mock('../../redux/redux-hooks');
// vi.mock('../../services/web.storage');
// vi.mock('../../constants');

// beforeEach(() => {
//   useAppSelector.mockImplementation(mangoExecutivePatientListingData);
//   useAppDispatch.mockImplementation(() => vi.fn());
// });

// afterEach(() => {
//   vi.clearAllMocks();
// });
describe('Mango Executive Test Cases for Patient List Page', () => {
  test('Rendering Mango Executive Patient List page', async () => {
    renderWithProviders(<MangoExecutive />, {wrapper: BrowserRouter});
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('Removing patient Id from the table when hidecolumns button is clicked', async () => {
    renderWithProviders(<MangoExecutive />, {wrapper: BrowserRouter});
    const removePatientIdButton = screen.getByRole('button', {
      name: /remove patient id/i,
    });
    expect(removePatientIdButton).toBeInTheDocument();
    await userEvent.click(removePatientIdButton);
    const patientId = screen.queryByRole('columnheader', {
      name: /patient id/i,
    });
    expect(patientId).not.toBeInTheDocument();
  });
  test('When edit button is clicked, it shows the Patient detail page', async () => {
    renderWithProviders(<MangoExecutive />, {wrapper: BrowserRouter});
    const editButton = screen.getAllByRole('button', {
      name: /Edit/i,
    });
    expect(editButton.length).toBe(10);
    act(() => {
      editButton[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    // await waitFor(() => {
    //   const text = screen.getByText(/general information/i);
    //   expect(text).toBeInTheDocument();
    // });
  });
});
