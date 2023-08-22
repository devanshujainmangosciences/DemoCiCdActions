import {render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import OtherTests from '../../pages/clinical-details/OtherTests';
import {
  reportsWhenNoDataIsAvaliable,
  reportsWhenDataIsAvaliable,
} from '../testAppSelector';
import {Provider} from 'react-redux';
import {setupStore} from '../../redux/store';

afterEach(() => {
  vi.clearAllMocks();
});
describe('OtherTest reports test cases', () => {
  test('Rendering OtherTest Reports page', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTests />
      </Provider>
    );

    const otherTest = screen.getByText('otherTests');
    expect(otherTest).toBeInTheDocument();
  });
  test('OtherTest data is not avaliable', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTests />
      </Provider>
    );
    const nodataNote = screen.getByText('noYearNote');
    expect(nodataNote).toBeInTheDocument();
  });

  test('OtherTest When Data is Avaliable', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTests />
      </Provider>
    );
    const totalReports = screen.getByText('Total Reports:1');
    expect(totalReports).toBeInTheDocument();
  });
  test('When Clicked on Year Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <OtherTests />
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
        <OtherTests />
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
