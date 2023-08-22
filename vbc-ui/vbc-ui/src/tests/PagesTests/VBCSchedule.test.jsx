import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import VbcSchedule from '@/pages/vbc-program/VbcSchedule';
import {beforeEach, describe, expect, test, vi} from 'vitest';

describe('VBC Schedule Page', () => {
  beforeEach(() => {
    renderWithProviders(<VbcSchedule />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering VBC Schedule Page', () => {
    const pbpHeading = screen.getByRole('heading', {
      name: /vbcSchedule/i,
    });
    expect(pbpHeading).toBeInTheDocument();
  });
  test('Checking if note is present or not', () => {
    const note = screen.getByText('note');
    expect(note).toBeInTheDocument();
  });
  test('Checking Schedule is present or not after API response', () => {
    setTimeout(() => {
      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBe(24);
    }, 5000);
  });
});
