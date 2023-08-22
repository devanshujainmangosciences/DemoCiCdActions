import {screen} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import '@testing-library/jest-dom';
import {TableComponent} from '../../components';
import {BrowserRouter} from 'react-router-dom';
import {faEdit, faEye} from '@fortawesome/free-solid-svg-icons';

const tableData = [
  {
    name: 'anand',
    skill: 10,
    id: 1,
  },
  {
    name: 'gautam',
    skill: 12,
    id: 2,
  },
];
const tableHeadersData = [
  {
    keyName: 'Name',
    keyValue: 'name',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Skills',
    keyValue: 'skill',
    className: '',
    showColumn: false,
    key: 2,
  },
  {
    keyName: 'Action',
    keyValue: 'action',
    className: '',
    showColumn: true,
    key: 3,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: '/admin/users/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/users/update/:id',
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
    ],
  },
];

test('Table rendered correctly', () => {
  renderWithProviders(<TableComponent />, {
    wrapper: BrowserRouter,
  });
  const tableComponent = screen.getByRole('table');
  expect(tableComponent).toBeInTheDocument();
});
test('Table rendered correctly with checkbox header', () => {
  renderWithProviders(
    <TableComponent
      component={'manufacturer-listing'}
      classes="align-items-center"
      tableData={tableData}
      tableHeadersData={tableHeadersData}
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const checkboxHeader = screen.queryAllByRole('checkbox');
  expect(checkboxHeader.length).toBeGreaterThan(0);
});
test('Table not rendering with checkbox', () => {
  renderWithProviders(
    <TableComponent
      component={'manufacturer-listing'}
      classes="align-items-center"
      tableData={tableData}
      noCheck={true}
      tableHeadersData={tableHeadersData}
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const checkboxHeader = screen.queryAllByRole('checkbox');
  expect(checkboxHeader.length).toBe(0);
});
test('Table rendering column data when showColumn is true', () => {
  renderWithProviders(
    <TableComponent
      component={'manufacturer-listing'}
      classes="align-items-center"
      tableData={tableData}
      noCheck={true}
      tableHeadersData={tableHeadersData}
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const columnData = screen.getByText('gautam');
  expect(columnData).toContainHTML('<td class="border-0 "> gautam</td>');
});
test('Table rendering column data as N/A when showColumn is false', () => {
  renderWithProviders(
    <TableComponent
      component={'manufacturer-listing'}
      classes="align-items-center"
      tableData={tableData}
      noCheck={true}
      tableHeadersData={tableHeadersData}
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  const columnData = screen.queryAllByText('N/A');
  expect(columnData.length).toBe(2);
});
