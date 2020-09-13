import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {renderWithRedux} from './test-helpers/test-utils'

it('renders without crashing', () => {
  renderWithRedux(<App />)
});
