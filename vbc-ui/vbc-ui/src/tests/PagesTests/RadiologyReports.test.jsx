import {render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RadiologyReports from '../../pages/clinical-details/RadiologyReports';
import {
  reportsWhenNoDataIsAvaliable,
  reportsWhenDataIsAvaliable,
} from '../testAppSelector';
import {Provider} from 'react-redux';
import {setupStore} from '../../redux/store';

afterEach(() => {
  vi.clearAllMocks();
});
describe('Radiology reports test cases', () => {
  test('Rendering Radiology Reports page', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <RadiologyReports />
      </Provider>
    );

    const labReports = screen.getByText('radiology');
    expect(labReports).toBeInTheDocument();
  });
  test('Radiology data is not avaliable', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <RadiologyReports />
      </Provider>
    );
    const nodataNote = screen.getByText('noYearNote');
    expect(nodataNote).toBeInTheDocument();
  });

  test('Radiology When Data is Avaliable', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <RadiologyReports />
      </Provider>
    );
    const totalReports = screen.getByText('Total Reports:1');
    expect(totalReports).toBeInTheDocument();
  });
  test('When Clicked on Year Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <RadiologyReports />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes.length).toBe(2);
    const yearComboBox = comboboxes[0];
    const monthCombobox = comboboxes[1];
    await userEvent.selectOptions(yearComboBox, '2020');
    await userEvent.selectOptions(monthCombobox, 'October');
    const filterButton = screen.getByRole('button', {
      name: /filter now/i,
    });
    await userEvent.click(filterButton);
    waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
  test('When Changing the Month Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <RadiologyReports />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const monthItem = screen.getAllByRole('listitem');
    expect(monthItem.length).toBe(12);
    const aprilMonth = monthItem[8];
    await userEvent.click(aprilMonth);
    waitFor(() => {
      const abdomen = screen.getByText('Whole Abdomen Ultrasound');
      expect(abdomen).toBeInTheDocument();
    });
  });
});
