import {screen} from '@testing-library/react';
import {renderWithProviders} from '@/tests/test-utils';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import '@testing-library/jest-dom';
import {TitleContainer} from '../../components';
import {BrowserRouter} from 'react-router-dom';

test('Title Container render correctly with title', () => {
  renderWithProviders(<TitleContainer title="title" />, {
    wrapper: BrowserRouter,
  });
  expect(screen.getByText('title')).toBeInTheDocument();
});
