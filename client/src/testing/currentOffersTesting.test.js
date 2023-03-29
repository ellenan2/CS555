import React from 'react';
import { shallow } from 'enzyme';
import CurrentOffers from '../components/CurrentOffers.js';

describe('CurrentOffers component', () => {
  it('renders without crashing', () => {
    shallow(React.createElement(CurrentOffers));
  });
});