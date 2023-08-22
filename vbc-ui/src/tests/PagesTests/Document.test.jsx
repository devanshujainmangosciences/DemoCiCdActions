import {getAllByRole, screen} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import {Documents} from '@/pages/profile';
describe('Document Page testing', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    renderWithProviders(<Documents />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Document page correctly', async () => {
    await expect(screen.getByText(/documents:documents/i)).toBeInTheDocument();
  });
  test('No Document type present if Main document is not selected and upload button is disabled', async () => {
    const combobox = screen.getAllByRole('combobox');
    expect(combobox.length).toBe(2);
    expect(combobox[0].value).toBe('Select');
    expect(combobox[1].value).toBe('');
    //Selecting Document
    await userEvent.selectOptions(combobox[0], 'FINANCIAL');
    expect(combobox[0].value).toBe('FINANCIAL');
    const optionPan = screen.getByRole('option', {name: 'PAN'});
    expect(optionPan).toBeInTheDocument();
    //upload button is still disabled
    const uploadButton = screen.getByRole('button', {
      name: /upload/i,
    });
    expect(uploadButton).toBeDisabled();
  });
  test('Testing Upload File', async () => {
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    const browseFile = screen.getByLabelText(/browse/i);
    await userEvent.upload(browseFile, file);
    expect(browseFile.files[0]).toBe(file);
    expect(browseFile.files.item(0)).toBe(file);
    expect(browseFile.files).toHaveLength(1);
  });
  test('Upload Button Enables when all the input are present', async () => {
    const combobox = screen.getAllByRole('combobox');
    await userEvent.selectOptions(combobox[0], 'FINANCIAL');
    expect(combobox[0].value).toBe('FINANCIAL');
    await userEvent.selectOptions(combobox[1], 'IT Return 1');
    expect(combobox[1].value).toBe('IT Return 1');
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    const browseFile = screen.getByLabelText(/browse/i);
    await userEvent.upload(browseFile, file);
    const uploadButton = screen.getByRole('button', {
      name: /upload/i,
    });
    expect(uploadButton).not.toBeDisabled();
  });
  test('On Cancel Button gets disabled', async () => {
    const combobox = screen.getAllByRole('combobox');
    await userEvent.selectOptions(combobox[0], 'FINANCIAL');
    expect(combobox[0].value).toBe('FINANCIAL');
    await userEvent.selectOptions(combobox[1], 'IT Return 1');
    expect(combobox[1].value).toBe('IT Return 1');
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    const browseFile = screen.getByLabelText(/browse/i);
    await userEvent.upload(browseFile, file);
    const uploadButton = screen.getByRole('button', {
      name: /upload/i,
    });
    expect(uploadButton).not.toBeDisabled();
    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    });
    await userEvent.click(cancelButton);
    expect(uploadButton).toBeDisabled();
  });
  test('Renders uploaded documents', async () => {
    const documentsTable = screen.getByRole('table');
    expect(documentsTable).toBeInTheDocument();
  });
  test('When clicked on Delete Document', async () => {
    const deleteDoc = screen.getAllByRole('button', {
      name: 'documents:delete',
    });
    await userEvent.click(deleteDoc[0]);
    expect(screen.getByText(/confirmDelete/i)).toBeInTheDocument();
  });
  test('When Download Button is clicked', async () => {
    const mockFn = vi.fn();
    const downloadDoc = screen.getAllByRole('button', {
      name: 'documents:download',
    });
    // await userEvent.click(downloadDoc[0]);
    // expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
