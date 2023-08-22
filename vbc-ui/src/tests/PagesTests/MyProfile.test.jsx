import {screen} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import ProfilePersonalDetails from '@/pages/profile/ProfilePersonalDetails';

describe('Profile Component Testing', () => {
  test('Rendering Personal Detail Page in View Mode', async () => {
    const onPersonalDataValueChange = vi.fn;
    const personalDetailsFormValues = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      gender: '',
      birthDate: '',
      mobile: '',
    };
    const errors = {
      emailWarning: false,
      mobileWarning: false,
      aadharError: false,
      panError: false,
      dobWarning: false,
    };
    const myProfileData = {
      firstName: 'patient',
      middleName: '',
      lastName: '',
      email: '',
      gender: '',
      birthDate: '2019-01-29',
      mobile: '',
    };
    renderWithProviders(
      <ProfilePersonalDetails
        isView={true}
        myProfileData={myProfileData}
        personalDetailsFormValues={personalDetailsFormValues}
        onPersonalDetailsValueChange={onPersonalDataValueChange}
        errors={errors}
        isPatient={true}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    await expect(screen.getByText(/personalDetails:/i)).toBeInTheDocument();
    const name = screen.getByRole('heading', {name: /patient/i});
    await expect(name).toBeInTheDocument();
  });
  test('Rendering Personal Detail Page in Edit Mode', async () => {
    const onPersonalDataValueChange = vi.fn;
    const personalDetailsFormValues = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      gender: '',
      birthDate: '',
      mobile: '',
    };
    const errors = {
      emailWarning: false,
      mobileWarning: false,
      aadharError: false,
      panError: false,
      dobWarning: false,
    };
    const myProfileData = {
      firstName: 'patient',
      middleName: '',
      lastName: '',
      email: '',
      gender: '',
      birthDate: '2019-01-29',
      mobile: '',
    };
    renderWithProviders(
      <ProfilePersonalDetails
        isView={false}
        myProfileData={myProfileData}
        personalDetailsFormValues={personalDetailsFormValues}
        onPersonalDetailsValueChange={onPersonalDataValueChange}
        errors={errors}
        isPatient={true}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    await expect(screen.getByText(/personalDetails:/i)).toBeInTheDocument();
    const name = screen.queryByRole('heading', {name: /patient/i});
    await expect(name).not.toBeInTheDocument();
    const nameInput = screen.queryByRole('textbox', {name: / *firstName/i});
    expect(nameInput).toBeInTheDocument();
  });
});
