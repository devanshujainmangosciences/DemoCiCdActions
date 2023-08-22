import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

import {Applicant} from '@/pages/vbc-program';

describe('PBP Program Step-1 Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<Applicant />, {
      wrapper: BrowserRouter,
    });
  });
  test('Testing Patient Applicant Page', async () => {
    expect(
      screen.getByRole('heading', {
        name: /applicants/i,
      })
    ).toBeInTheDocument();
  });
  test('Adding a new applicant', async () => {
    const textBoxes = screen.getAllByRole('textbox');
    expect(textBoxes.length).toBe(4);
    const firstName = textBoxes[0];
    const middleName = textBoxes[1];
    const lastName = textBoxes[2];
    const email = textBoxes[3];
    const spinButtons = screen.getAllByRole('spinbutton');
    expect(spinButtons.length).toBe(2);
    const age = spinButtons[0];
    const mobile = spinButtons[1];
    const comboBoxes = screen.getAllByRole('combobox');
    expect(comboBoxes.length).toBe(2);
    const gender = comboBoxes[0];
    const relationship = comboBoxes[1];
    await userEvent.type(firstName, 'App-1');
    await userEvent.type(middleName, 'middle');
    await userEvent.type(lastName, 'last');
    await userEvent.type(email, 'app-233@mailinator.com');
    await userEvent.type(age, '18');
    await userEvent.type(mobile, '9002223819');
    await userEvent.selectOptions(gender, 'MALE');
    await userEvent.selectOptions(relationship, 'Sibling');
    expect(firstName.value).toBe('App-1');
    expect(middleName.value).toBe('middle');
    expect(lastName.value).toBe('last');
    expect(email.value).toBe('app-233@mailinator.com');
    expect(age.value).toBe('18');
    expect(mobile.value).toBe('9002223819');
    expect(gender.value).toBe('MALE');
    expect(relationship.value).toBe('Sibling');
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });
    await userEvent.click(saveButton);
    await waitFor(async () => {
      const header = screen.getByRole('cell', {
        name: /fname mname lname/i,
      });
      const editButton = screen.getAllByRole('button', {
        name: /edit/i,
      });
      expect(header).toBeInTheDocument();
    });
  });
  test('Editing an existing Applicant', async () => {
    await waitFor(async () => {
      const editButton = screen.getAllByRole('button', {
        name: /edit/i,
      });
      await userEvent.click(editButton[0]);
      const textBoxes = screen.getAllByRole('textbox');
      const firstName = textBoxes[0];
      expect(firstName.value).toBe('Applicant ');
    });
  });
  test('When clicking on back button it should reset', async () => {
    await waitFor(async () => {
      const editButton = screen.getAllByRole('button', {
        name: /edit/i,
      });
      await userEvent.click(editButton[0]);
      const textBoxes = screen.getAllByRole('textbox');
      const firstName = textBoxes[0];
      expect(firstName.value).toBe('Applicant ');
      const backButton = screen.getByRole('button', {
        name: /back/i,
      });
      await userEvent.click(backButton);
      expect(firstName.value).toBe('');
    });
  });
});
