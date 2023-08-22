import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders} from '../test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DrugSchedule from '@/pages/vbc-program/DrugSchedule';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {act} from 'react-dom/test-utils';

beforeEach(() => {
  renderWithProviders(<DrugSchedule />, {
    wrapper: BrowserRouter,
  });
});

describe('VBC Schedule Page', () => {
  test('Rendering Drug Schedule Page', () => {
    const pbpHeading = screen.getByRole('heading', {
      name: /drugSchedule/i,
    });
    expect(pbpHeading).toBeInTheDocument();
  });
  test('Rendering Drug Schedule Page when treatment is started', async () => {
    await waitFor(async () => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      const uploadButtons = screen.getAllByRole('button');
      expect(uploadButtons.length).toBe(12);
      const reuploadButtoDrugRecieptButton = uploadButtons[0];
      expect(reuploadButtoDrugRecieptButton).toBeInTheDocument();
    });
  });
});
