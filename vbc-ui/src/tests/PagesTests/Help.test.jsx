import {screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {Help} from '@/pages/profile';

describe('Rendering Help Page test cases', () => {
  beforeEach(() => {
    renderWithProviders(<Help />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Help Page', () => {
    expect(screen.getByText(/help/i)).toBeInTheDocument();
  });
  test('Search Component rendered successfully', () => {
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
  test('Accordian rendered successfully', () => {
    const accordian = screen.queryByTestId('accordian');
    expect(accordian).toBeInTheDocument();
  });
  test('When Accordian button is clicked', async () => {
    const generalQueriesButton = screen.getByRole('button', {
      name: /general queries/i,
    });
    await userEvent.click(generalQueriesButton);
    const text = screen.getByText(
      /who decides whether i can participate in the pbp program\?/i
    );
    expect(text).toBeInTheDocument();
  });
  test('Rendering the Contact form in Help Component', async () => {
    const contactFormHeader = screen.getByRole('link', {
      name: /www\.mangocancercare\.com/i,
    });
    expect(contactFormHeader).toBeInTheDocument();
  });
});
