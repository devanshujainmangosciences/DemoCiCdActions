import {screen, fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import '@testing-library/jest-dom';
import {CustomToast} from '../../components';
import {BrowserRouter} from 'react-router-dom';

test('Toast component didn`t render correctly', () => {
  renderWithProviders(<CustomToast message="message" showToast={false} />, {
    wrapper: BrowserRouter,
  });
  expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
});
test('Toast component  render correctly', () => {
  renderWithProviders(<CustomToast message="message" showToast={true} />, {
    wrapper: BrowserRouter,
  });
  expect(screen.queryByTestId('toast')).toBeInTheDocument();
  expect(screen.getByText('message')).toBeInTheDocument();
  const button = screen.getByRole('button');
  userEvent.click(button).then(() => {
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });
});
