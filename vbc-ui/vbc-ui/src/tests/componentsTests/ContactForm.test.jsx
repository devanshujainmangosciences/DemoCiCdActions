import {getByPlaceholderText, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ContactUs from '@/pages/profile/children/ContactUs';
import {renderWithProviders} from '@/tests/test-utils';

describe('Rendering Help Page test cases', () => {
  beforeEach(() => {
    renderWithProviders(<ContactUs />, {
      wrapper: BrowserRouter,
    });
  });

  test('Rendering the Contact form ', async () => {
    const contactFormHeader = screen.getByText(/moreInfo/i);

    expect(contactFormHeader).toBeInTheDocument();
  });
  test('Entering info in contact form', async () => {
    const subject = screen.getByPlaceholderText('subject');
    const message = screen.getByPlaceholderText('message');
    await userEvent.type(subject, 'Testing');
    await userEvent.type(message, 'message');
    expect(subject.value).toBe('Testing');
    expect(message.value).toBe('message');
  });
  test('Send button not triggered when form input is empty', async () => {
    const subject = screen.getByPlaceholderText('subject');
    const message = screen.getByPlaceholderText('message');

    const sendFunction = vi.fn();
    expect(subject.value).toBe('');
    expect(message.value).toBe('');
    const sendButton = screen.getByRole('button', {
      name: /send/i,
    });
    await userEvent.click(sendButton);
    expect(sendFunction).not.toHaveBeenCalled();
  });
  test('Send button is triggered when form is filled', async () => {
    const subject = screen.getByPlaceholderText('subject');
    const message = screen.getByPlaceholderText('message');
    await userEvent.type(subject, 'Testing');
    await userEvent.type(message, 'message');
    expect(subject.value).toBe('Testing');
    expect(message.value).toBe('message');
    const sendButton = screen.getByRole('button', {
      name: /send/i,
    });
    await userEvent.click(sendButton);
    await waitFor(() => {
      expect(subject.value).toBe('');
      expect(message.value).toBe('');
    });
  });
});
