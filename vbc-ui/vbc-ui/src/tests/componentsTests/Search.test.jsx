import React from 'react';
import Search from '@/components/Search';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
test('renders correctly', () => {
  render(<Search />);
  const searchInput = screen.queryByPlaceholderText('Search');
  const searchButton = screen.queryByRole('button');
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

describe('Input value', () => {
  it('updates on change', () => {
    render(<Search placeholder="Search" value="test" />);
    const searchInput = screen.queryByPlaceholderText('Search');
    userEvent.type(searchInput, {target: {value: 'test'}});
    expect(searchInput.value).toBe('test');
  });
});

describe('Search button', () => {
  describe('With empty query', () => {
    it('doesnot trigger request search function', () => {
      const requestSearch = vi.fn();
      render(<Search />);
      const searchButton = screen.queryByRole('button');
      userEvent.click(searchButton);
      expect(requestSearch).not.toHaveBeenCalled();
    });
  });
});
