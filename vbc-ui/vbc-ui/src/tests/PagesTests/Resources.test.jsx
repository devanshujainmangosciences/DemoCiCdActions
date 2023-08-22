import {screen} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {ResourcesNewDesign} from '@/pages/profile';
import {beforeEach, describe, expect, test, vi} from 'vitest';
describe('Resources Page testing', () => {
  beforeEach(() => {
    renderWithProviders(<ResourcesNewDesign />, {
      wrapper: BrowserRouter,
    });
  });
  test('Rendering Resources page correctly', async () => {
    await expect(screen.getByText(/Resources/i)).toBeInTheDocument();
  });
  test('Rendering all the headings', async () => {
    const aboutCancer = screen.getAllByText(/about cancer/i);
    const health = screen.getAllByText(/Health and wellness/i);
    const caregiver = screen.getAllByText(/caregiver support/i);
    const treatment = screen.getAllByText(/cancer treatment and diagnosis/i);
    await expect(aboutCancer.length).toBe(2);
    await expect(health.length).toBe(2);
    await expect(caregiver.length).toBe(2);
    await expect(treatment.length).toBe(2);
  });
});
