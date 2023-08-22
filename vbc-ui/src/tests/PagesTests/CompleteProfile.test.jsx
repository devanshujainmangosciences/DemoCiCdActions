import {render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {CompleteProfile} from '@/pages/profile';
import {setupStore} from '../../redux/store';
import {Provider} from 'react-redux';
import {
  completeProfileWhenPatientRegistrationIsPending,
  completeProfileWhenPatientRegistrationIsApproved,
} from '../../tests/testAppSelector';
describe('Complete Profile Page testing', () => {
  test('Rendering Complete Profile page when patient is not approved', async () => {
    const store = setupStore(completeProfileWhenPatientRegistrationIsPending);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CompleteProfile />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Testing-patient-001')).toBeInTheDocument();
      expect(screen.getByText('waitingForApprovalMsg')).toBeInTheDocument();
    });
  });
  test('Rendering Complete Profile page when patient is not approved', async () => {
    const store = setupStore(completeProfileWhenPatientRegistrationIsApproved);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CompleteProfile />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('fillAllFields')).toBeInTheDocument();
    });
  });
  test('All the components are loaded', () => {
    const store = setupStore(completeProfileWhenPatientRegistrationIsApproved);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CompleteProfile />
        </Provider>
      </BrowserRouter>
    );
    const personalDetails = screen.getByRole('group', {
      name: /personalDetails:/i,
    });
    const addressInfo = screen.getByRole('group', {
      name: /addressInformation :/i,
    });
    const financialInformation = screen.getByRole('group', {
      name: /financialInformation :/i,
    });
    expect(personalDetails).toBeInTheDocument();
    expect(addressInfo).toBeInTheDocument();
    expect(financialInformation).toBeInTheDocument();
  });
  test('Checkbox test to make present and permanent address same', async () => {
    const store = setupStore(completeProfileWhenPatientRegistrationIsApproved);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CompleteProfile />
        </Provider>
      </BrowserRouter>
    );
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    const checkbox1 = checkboxes[0];
    const permanentAddress = screen.getByPlaceholderText(/permanentAddress/i);
    const presentAddress = screen.getByPlaceholderText(/Present Address/i);
    await userEvent.type(permanentAddress, 'Mintra');
    await userEvent.type(presentAddress, 'Cobra');
    expect(permanentAddress.value).toBe('Mintra');
    expect(presentAddress.value).toBe('Cobra');
    await userEvent.click(checkbox1);
    expect(checkbox1.checked).toEqual(true);
    await userEvent.type(permanentAddress, 'Mintra');
    expect(permanentAddress.value).toBe(presentAddress.value);
  });
  test('Completing the Complete Profile', async () => {
    const store = setupStore(completeProfileWhenPatientRegistrationIsApproved);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CompleteProfile />
        </Provider>
      </BrowserRouter>
    );
    const checkboxes = screen.queryAllByRole('checkbox');
    const isPresentAndPermanentAddressSame = checkboxes[0];
    const inputBoxes = screen.getAllByRole('textbox');
    const comboBoxes = screen.getAllByRole('combobox');
    expect(inputBoxes.length).toBe(11);
    expect(comboBoxes.length).toBe(7);
    const lastname = screen.getByPlaceholderText('lastName');
    await userEvent.type(lastname, 'Last Name');
    const gender = comboBoxes[0];
    await userEvent.selectOptions(gender, 'MALE');
    const dob = inputBoxes[3];
    await userEvent.type(dob, '10/03/2003');
    const add1 = screen.getByPlaceholderText('permanentAddress');
    await userEvent.type(add1, 'Add-1');
    const country = comboBoxes[1];
    const state = comboBoxes[2];
    const city = comboBoxes[3];
    const pincode = screen.getAllByPlaceholderText('pinCode');
    await userEvent.selectOptions(country, 'India');
    await userEvent.selectOptions(state, 'Delhi');
    await userEvent.selectOptions(city, 'Addanki');
    await userEvent.type(pincode[0], 'pincode');
    await userEvent.click(isPresentAndPermanentAddressSame);
    expect(isPresentAndPermanentAddressSame.checked).toEqual(true);
  });
});
