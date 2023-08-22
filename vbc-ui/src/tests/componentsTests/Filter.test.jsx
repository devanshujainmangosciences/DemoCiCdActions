import {render, screen} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {Filter} from '@/components';
import {mangoExecutivefilters} from '@/config';

test('Render Filter Component Correctly', () => {
  renderWithProviders(<Filter t={(mangoExecutive) => mangoExecutive} />, {
    wrapper: BrowserRouter,
  });
  const filterComponent = screen.getByTestId('filter');
  expect(filterComponent).toBeInTheDocument();
});
test('Rendering filter select if filters are present', () => {
  renderWithProviders(
    <Filter
      filters={mangoExecutivefilters}
      data={[]}
      filterBody={true}
      type="mango-executive"
      classes="ms-1-7 h-100"
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const filterSelect = screen.queryAllByRole('combobox');
  expect(filterSelect.length).toBe(1);
});
test('Not render filter select if filters are not present', () => {
  renderWithProviders(
    <Filter
      filters={[]}
      data={[]}
      filterBody={true}
      type="mango-executive"
      classes="ms-1-7 h-100"
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const filterSelect = screen.queryAllByRole('combobox');
  expect(filterSelect.length).toBe(0);
});
test('Rendering  otions for filter', () => {
  renderWithProviders(
    <Filter
      filters={mangoExecutivefilters}
      data={[]}
      filterBody={true}
      type="mango-executive"
      classes="ms-1-7 h-100"
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const filterOptions = screen.queryAllByRole('option');
  expect(filterOptions.length).toBe(10);
});
test('Rendering input/select Options for filter when one option is selected', async () => {
  const filtersApplied = vi.fn((x) => 42 + x);
  const getMangoPatientList = vi.fn((x) => 42 + x);
  renderWithProviders(
    <Filter
      filters={mangoExecutivefilters}
      data={[]}
      filterBody={true}
      callback={getMangoPatientList}
      filtersApplied={filtersApplied}
      type="mango-executive"
      classes="ms-1-7 h-100"
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const filterSelect = screen.getByRole('combobox');
  await userEvent.selectOptions(filterSelect, 'Name');
  expect(screen.getByRole('option', {name: 'Name'}).selected).toBe(true);
  const nameFilterInput = screen.queryByPlaceholderText('Enter Value');
  expect(nameFilterInput).toBeInTheDocument();
  //Checking User Input
  await userEvent.type(nameFilterInput, 'test');
  expect(nameFilterInput.value).toBe('test');
  /*
  Submit button check Action triggred( throwing redux thunk error)
  Test Remaning:-
    Need to test the submit button
    Need to test the Remove Filters
    Need to test if the tags are rendered or not
    Need to test tag remove button
  */
  //Checking Click on Submit Button
  // const submitButton = screen.getByRole('button');
});
