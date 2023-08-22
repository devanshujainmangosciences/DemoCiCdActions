/**
 * @jest-environment jsdom
 */
import {fireEvent, render, screen} from '@testing-library/react';
import PrivacyPolicy from '@/pages/terms-policy/PrivacyPolicy';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, test, vi} from 'vitest';

describe('Rendering Privacy Policy test cases', () => {
  test('Rendering Privacy Policy Page when removeIcon is not passed', () => {
    render(<PrivacyPolicy removeIcon={true} />);
    const privacyText = screen.getAllByText(/privacyPolicy/i);
    expect(privacyText.length).toBe(2);
    const header = screen.queryByRole('heading', {
      name: /privacyPolicy/i,
    });
    expect(header).not.toBeInTheDocument();
  });
  test('Rendering Privacy Policy Page when removeIcon is passed', () => {
    render(<PrivacyPolicy removeIcon={false} />);
    const privacyText = screen.getAllByText(/privacyPolicy/i);
    expect(privacyText.length).toBe(2);
    const header = screen.getByRole('heading', {
      name: /privacyPolicy/i,
    });
    expect(header).toBeInTheDocument();
  });
  test('Rendering Back to top Button when scrolled', () => {
    render(<PrivacyPolicy removeIcon={false} />);
    fireEvent.scroll(window, {target: {scrollY: 100}});
    const backToTop = screen.queryByText(/Back To Top/i);
    expect(backToTop).toBeInTheDocument();
  });
});
