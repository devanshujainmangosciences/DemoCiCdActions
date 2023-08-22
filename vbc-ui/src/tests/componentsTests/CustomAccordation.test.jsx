import {beforeEach, describe, expect, test} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import HelpDataApplicant from '../..//assets/json/helpDataApplicant.json';
import CustomAccordation from '@/components/CustomAccordation';

describe('Accordion', () => {
  beforeEach(() => {
    render(<CustomAccordation accordationData={HelpDataApplicant} />);
  });

  test('Accordian rendered successfully', () => {
    const accordian = screen.queryByTestId('accordian');
    expect(accordian).toBeInTheDocument();
  });
  test('When Accordian button is clicked', async () => {
    const generalQueriesButton = screen.getByRole('button', {
      name: /general queries/i,
    });
    await fireEvent.click(generalQueriesButton);
    const text = screen.getByText(
      /Who decides whether the patient can participate in the PBP Program?\?/i
    );
    expect(text).toBeInTheDocument();
  });
});
