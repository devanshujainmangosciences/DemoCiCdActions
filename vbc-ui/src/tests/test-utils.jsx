import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../redux/store';

export function renderWithProviders(ui, {...renderOptions} = {}) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {store, ...render(<Wrapper>{ui}</Wrapper>, {...renderOptions})};
}
