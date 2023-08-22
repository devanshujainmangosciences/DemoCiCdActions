import {render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import OtherTreatment from '../../pages/clinical-details/OtherTreatment';
import {
  reportsWhenNoDataIsAvaliable,
  reportsWhenDataIsAvaliable,
} from '../testAppSelector';
import {Provider} from 'react-redux';
import {setupStore} from '../../redux/store';

afterEach(() => {
  vi.clearAllMocks();
});
describe('OtherTreatment reports test cases', () => {
  test('Rendering OtherTreatment Reports page', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTreatment />
      </Provider>
    );

    const otherTest = screen.getByText('otherTreatment');
    expect(otherTest).toBeInTheDocument();
  });
  test('OtherTreatment data is not avaliable', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTreatment />
      </Provider>
    );
    const nodataNote = screen.getByText('noYearNote');
    expect(nodataNote).toBeInTheDocument();
  });

  test('OtherTreatment When Data is Avaliable', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTreatment />
      </Provider>
    );
    const totalReports = screen.getByText('Total Reports:1');
    expect(totalReports).toBeInTheDocument();
  });
  test('When Clicked on Year Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTreatment />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes.length).toBe(2);
    const yearComboBox = comboboxes[0];
    const monthCombobox = comboboxes[1];
    await userEvent.selectOptions(yearComboBox, '2017');
    await userEvent.selectOptions(monthCombobox, 'October');
    const filterButton = screen.getByRole('button', {
      name: /filter now/i,
    });
    await userEvent.click(filterButton);
    waitFor(() => {
      expect(handleSubmit).toBeCalled();
    });
  });
  test('When Changing the Month Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTreatment />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const monthItem = screen.getAllByRole('listitem');
    expect(monthItem.length).toBe(12);
    const decemberMonth = monthItem[0];
    await userEvent.click(decemberMonth);
    const reportsZero = screen.getByText('Total Reports:0');
    expect(reportsZero).toBeInTheDocument();
    waitFor(() => {
      expect(handleSubmit).toBeCalled();
    });
  });
});
