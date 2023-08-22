import {render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SurgicalDetails from '../../pages/clinical-details/SurgicalDetails';
import {
  reportsWhenNoDataIsAvaliable,
  reportsWhenDataIsAvaliable,
} from '../testAppSelector';
import {Provider} from 'react-redux';
import {setupStore} from '../../redux/store';

afterEach(() => {
  vi.clearAllMocks();
});
describe('Surgery reports test cases', () => {
  test('Rendering Surgery Reports page', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <SurgicalDetails />
      </Provider>
    );

    const otherTest = screen.getByText('surgery');
    expect(otherTest).toBeInTheDocument();
  });
  test('Surgery data is not avaliable', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <SurgicalDetails />
      </Provider>
    );
    const nodataNote = screen.getByText('noYearNote');
    expect(nodataNote).toBeInTheDocument();
  });

  test('Surgery When Data is Avaliable', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <SurgicalDetails />
      </Provider>
    );
    const totalReports = screen.getByText('Total Reports:1');
    expect(totalReports).toBeInTheDocument();
  });
  test('When Clicked on Year Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <SurgicalDetails />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes.length).toBe(2);
    const yearComboBox = comboboxes[0];
    const monthCombobox = comboboxes[1];
    await userEvent.selectOptions(yearComboBox, '2019');
    await userEvent.selectOptions(monthCombobox, 'June');
    const filterButton = screen.getByRole('button', {
      name: /filter now/i,
    });
    await userEvent.click(filterButton);
    const surgeryData = screen.getByText(
      'Pulmonary Lobectomy + Mediastinal Lymph Node Dissection'
    );
    expect(surgeryData).toBeInTheDocument();
    // waitFor(() => {
    //   expect(handleSubmit).toHaveBeenCalledTimes(1);
    // });
  });
  test('When Changing the Month Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <SurgicalDetails />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const monthItem = screen.getAllByRole('listitem');
    expect(monthItem.length).toBe(12);
    const decemberMonth = monthItem[0];
    await userEvent.click(decemberMonth);
    const reportsZero = screen.getByText('Total Reports:0');
    expect(reportsZero).toBeInTheDocument();
    waitFor(() => {});
  });
});
