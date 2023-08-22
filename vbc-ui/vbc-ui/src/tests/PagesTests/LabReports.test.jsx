import {render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LabReports from '@/pages/clinical-details/LabReports';
import {
  reportsWhenNoDataIsAvaliable,
  reportsWhenDataIsAvaliable,
} from '../testAppSelector';
import {Provider} from 'react-redux';
import {setupStore} from '../../redux/store';

afterEach(() => {
  vi.clearAllMocks();
});
describe('Lab reports test cases', () => {
  test('Rendering Lab Reports page', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <LabReports />
      </Provider>
    );

    const labReports = screen.getByText('labReports');
    expect(labReports).toBeInTheDocument();
  });
  test('Lab data is not avaliable', async () => {
    const store = setupStore(reportsWhenNoDataIsAvaliable);
    render(
      <Provider store={store}>
        <LabReports />
      </Provider>
    );
    const nodataNote = screen.getByText('noYearNote');
    expect(nodataNote).toBeInTheDocument();
  });

  test('Lab When Data is Avaliable', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <LabReports />
      </Provider>
    );
    const immunoassayNote = screen.getByText('Immunoassay');
    expect(immunoassayNote).toBeInTheDocument();
  });
  test('When Clicked on Year Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <LabReports />
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
      expect(handleSubmit).toBeCalled();
    });
  });
  test('When Changing the Month Tab', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <LabReports />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const monthItem = screen.getAllByRole('listitem');
    expect(monthItem.length).toBe(12);
    const januaryMonth = monthItem[11];
    await userEvent.click(januaryMonth);
    waitFor(() => {
      expect(handleSubmit).toBeCalled();
      const haematologyNote = screen.getByText('Haematology');
      expect(haematologyNote).toBeInTheDocument();
    });
  });
  test('On Procedure Change', async () => {
    const store = setupStore(reportsWhenDataIsAvaliable);
    render(
      <Provider store={store}>
        <LabReports />
      </Provider>
    );
    const handleSubmit = vi.fn();
    const monthItem = screen.getAllByRole('listitem');
    expect(monthItem.length).toBe(12);
    const januaryMonth = monthItem[11];
    await userEvent.click(januaryMonth);
    const biochemistryTab = screen.getByRole('tab', {name: 'biochemistry (2)'});
    expect(biochemistryTab).toBeInTheDocument();
    await userEvent.click(biochemistryTab);
    const biochemistryNote = screen.getByText('Biochemistry');
    expect(biochemistryNote).toBeInTheDocument();
  });
});
