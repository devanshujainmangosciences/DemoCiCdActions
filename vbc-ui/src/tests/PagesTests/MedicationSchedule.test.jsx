import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DrugSchedule from '@/pages/vbc-program/DrugSchedule';

describe('VBC Schedule Page', () => {
  beforeEach(() => {
    renderWithProviders(<DrugSchedule />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Drug Schedule Page', () => {
    const pbpHeading = screen.getByRole('heading', {
      name: /drugSchedule/i,
    });
    expect(pbpHeading).toBeInTheDocument();
  });
  test('Checking when treatment is not started', () => {
    const note = screen.getByText('noteForEmptyData');
    expect(note).toBeInTheDocument();
  });
  // test('Checking Schedule is present or not after API response', () => {
  //   const cells = screen.getAllByRole('cell');
  //   expect(cells.length).toBe(24);
  // });
});
