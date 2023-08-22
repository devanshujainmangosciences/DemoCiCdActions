import {fireEvent, render, screen} from '@testing-library/react';
import TermsOfUse from '@/pages/terms-policy/TermsOfUse';
import {beforeEach, describe, expect, test, vi} from 'vitest';
describe('Terms of Use page tests', () => {
  test('Rendering Terms of Use Page when removeIcon is not passed', () => {
    render(<TermsOfUse removeIcon={true} />);
    const termsText = screen.getAllByText(/termsOfUse/i);
    expect(termsText.length).toBe(1);
    const header = screen.queryByRole('heading', {
      name: /termsOfUse/i,
    });
    expect(header).not.toBeInTheDocument();
  });
  test('Rendering Terms of Use Page when removeIcon is passed', () => {
    render(<TermsOfUse removeIcon={false} />);
    const termsText = screen.getAllByText(/termsOfUse/i);
    expect(termsText.length).toBe(1);
    const header = screen.getByRole('heading', {
      name: /termsOfUse/i,
    });
    expect(header).toBeInTheDocument();
  });
  test('Rendering Back to top Button when scrolled', () => {
    render(<TermsOfUse removeIcon={false} />);
    fireEvent.scroll(window, {target: {scrollY: 100}});
    const backToTop = screen.queryByText(/Back To Top/i);
    expect(backToTop).toBeInTheDocument();
  });
});
